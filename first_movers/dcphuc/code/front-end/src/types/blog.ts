export interface Blog {
    id: string;
    author: string;
    content: string;
    likes: number;
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

export interface CreateBlogParams {
    content: string;
}

export interface EditBlogParams {
    blogId: string;
    newContent: string;
}

export interface LikeBlogParams {
    blogId: string;
}

export interface TransferBlogParams {
    blogId: string;
    recipient: string;
}
