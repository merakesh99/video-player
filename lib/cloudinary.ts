// Define the type for the Cloudinary search response.
export interface CloudinarySearchResult {
    resources: any[]; // You can further refine this type based on Cloudinary's response structure.
    next_cursor?: string;
    total_count?: number;
  }
  
  /**
   * Searches for video resources in Cloudinary.
   * @param options An object of additional query parameters (e.g., folder filters).
   * @returns A promise that resolves to the Cloudinary search result.
   */
  export async function searchVideos(
    options: Record<string, any> = {}
  ): Promise<CloudinarySearchResult> {
    const defaultParams: Record<string, any> = {
      expression: 'resource_type:video',
      max_results: 12,
    };
    const params = { ...defaultParams, ...options };
    const paramString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
      {
        headers: {
          // Basic Authentication using Cloudinary API Key and Secret.
          Authorization: `Basic ${Buffer.from(
            process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
          ).toString('base64')}`,
        },
      }
    );
    const results = await response.json();
    console.log('Cloudinary search results:', results.resources[0]);
    
    return results;
  }
  
  // Define a simplified Video interface for our application.
  export interface Video {
    id: string;
    title: string;
    url: string;
    width: number;
    height: number;
    public_id: string;
    filename: string;
  }
  
  /**
   * Maps an array of Cloudinary resource objects to our simplified Video objects.
   * @param resources An array of raw Cloudinary resource objects.
   * @returns An array of Video objects.
   */
  export function mapVideoResources(resources: any[]): Video[] {
    return resources.map((resource) => ({
      id: resource.asset_id,
      title: resource.display_name,
      public_id:resource.public_id,
      filename:resource.filename,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));
  }
