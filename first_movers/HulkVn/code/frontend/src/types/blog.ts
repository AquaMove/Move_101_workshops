export interface Blog {
  id: string;
  author: string;
  content: string;
  likes: number;
  objectId?: string;
}

export interface BlogPublished {
  blog_id: string;
  author: string;
  content: string;
}

export interface BlogLiked {
  blog_id: string;
  liked_by: string;
  total_likes: number;
}

export interface CreateBlogData {
  content: string;
}

export interface EditBlogData {
  objectId: string;
  newContent: string;
}
