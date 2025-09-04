import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import type { Blog, CreateBlogData, EditBlogData } from '../types/blog';
import { CONTRACT_CONFIG } from '../config/constants';

const PACKAGE_ID = CONTRACT_CONFIG.PACKAGE_ID;
const MODULE_NAME = CONTRACT_CONFIG.MODULE_NAME;

export class BlogService {
  private client: SuiClient;

  constructor(client: SuiClient) {
    this.client = client;
  }

  async createBlog(data: CreateBlogData, signAndExecuteTransactionBlock: any): Promise<string> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_blog`,
      arguments: [
        tx.pure.string(data.content),
      ],
    });

    console.log('[BlogService] createBlog → sending tx', {
      target: `${PACKAGE_ID}::${MODULE_NAME}::create_blog`,
      content: data.content,
    });

    const result = await signAndExecuteTransactionBlock({
      transaction: tx,
      options: { showEffects: true },
    });

    console.log('[BlogService] createBlog → result', result);

    // Extract the created blog object ID from the result
    const createdObjects = result.effects?.created || [];
    for (const created of createdObjects) {
      if (created.reference?.objectId) {
        return created.reference.objectId;
      }
    }

    // Fallback: return digest if effects are missing
    if ((result as any)?.digest) {
      return (result as any).digest;
    }

    throw new Error('Failed to create blog post');
  }

  async likeBlog(blogObjectId: string, signAndExecuteTransactionBlock: any): Promise<void> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::like_blog`,
      arguments: [
        tx.object(blogObjectId),
      ],
    });

    console.log('[BlogService] likeBlog → sending tx', {
      target: `${PACKAGE_ID}::${MODULE_NAME}::like_blog`,
      blogObjectId,
    });

    const res = await signAndExecuteTransactionBlock({
      transaction: tx,
    });
    console.log('[BlogService] likeBlog → result', res);
  }

  async editBlog(data: EditBlogData, signAndExecuteTransactionBlock: any): Promise<void> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::edit_content`,
      arguments: [
        tx.object(data.objectId),
        tx.pure.string(data.newContent),
      ],
    });

    console.log('[BlogService] editBlog → sending tx', {
      target: `${PACKAGE_ID}::${MODULE_NAME}::edit_content`,
      objectId: data.objectId,
      newContent: data.newContent,
    });

    const res = await signAndExecuteTransactionBlock({
      transaction: tx,
    });
    console.log('[BlogService] editBlog → result', res);
  }

  async deleteBlog(blogObjectId: string, signAndExecuteTransactionBlock: any): Promise<void> {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::delete_blog`,
      arguments: [
        tx.object(blogObjectId),
      ],
    });

    console.log('[BlogService] deleteBlog → sending tx', {
      target: `${PACKAGE_ID}::${MODULE_NAME}::delete_blog`,
      blogObjectId,
    });

    const res = await signAndExecuteTransactionBlock({
      transaction: tx,
    });
    console.log('[BlogService] deleteBlog → result', res);
  }

  async getBlogs(ownerAddress?: string): Promise<Blog[]> {
    try {
      if (!ownerAddress) {
        return [];
      }
      
      console.log('[BlogService] getBlogs → fetching', { ownerAddress });

      const objects = await this.client.getOwnedObjects({
        owner: ownerAddress,
        filter: {
          StructType: `${PACKAGE_ID}::${MODULE_NAME}::Blog`,
        },
        options: {
          showContent: true,
        },
      });

      console.log('[BlogService] getBlogs → objects', { count: objects.data.length });

      return objects.data.map(obj => {
        const fields = (obj.data?.content as any)?.fields;
        return {
          id: obj.data?.objectId ?? '',
          objectId: obj.data?.objectId ?? '',
          author: fields?.author ?? '',
          content: fields?.content ?? '',
          likes: fields?.likes ?? 0,
        };
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  }

  async getPublicBlogs(): Promise<Blog[]> {
    try {
      // This would need to be implemented based on how you want to fetch public blogs
      // For now, we'll return an empty array
      return [];
    } catch (error) {
      console.error('Error fetching public blogs:', error);
      return [];
    }
  }
}
