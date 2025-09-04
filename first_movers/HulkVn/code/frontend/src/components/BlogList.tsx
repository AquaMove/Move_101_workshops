import React from 'react';
import type { Blog } from '../types/blog';
import { BlogCard } from './BlogCard';
import { Loader2 } from 'lucide-react';

interface BlogListProps {
  blogs: Blog[];
  currentUser: string;
  isLoading?: boolean;
  onLike: (blogId: string) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  blogs,
  currentUser,
  isLoading = false,
  onLike,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">Loading blogs...</span>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No blogs yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          currentUser={currentUser}
          onLike={onLike}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
