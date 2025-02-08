export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { IncomingMessage } from 'http';

// Configure Cloudinary with your credentials (set these in .env.local)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Use Multer with memory storage so the file is available as a Buffer.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: Convert the Next.js Request (a Web API Request) to a Node.js IncomingMessage.
// (For App Router, see previous example on how to do this conversion.)
async function parseForm(req: Request): Promise<IncomingMessage> {
  const reader = req.body?.getReader();
  const chunks: Uint8Array[] = [];
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
  }
  const buffer = Buffer.concat(chunks);
  const fakeReq = new IncomingMessage(null as any);
  fakeReq.headers = Object.fromEntries(req.headers);
  fakeReq.push(buffer);
  fakeReq.push(null);
  return fakeReq;
}

export async function POST(request: Request) {
  try {
    // Convert the Web API Request to a fake Node.js request that Multer can handle.
    const fakeReq = await parseForm(request);

    // Run Multer middleware to populate fakeReq.file and fakeReq.body.
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(fakeReq as any, {} as any, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Retrieve the file and title from the fake request.
    const file = (fakeReq as any).file;
    const title = (fakeReq as any).body?.title || 'Untitled Video';
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload the file buffer to Cloudinary and include the title in the context.
    const streamUpload = (buffer: Buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'video-player',
            display_name: title,  // This stores the title metadata
            context: `title=${title}`  // This stores the title metadata
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(file.buffer);
    return NextResponse.json({ url: (result as any).secure_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

// Disable Next.js default body parsing so that Multer can handle the multipart form data.
export const config = {
  api: {
    bodyParser: false,
  },
};
