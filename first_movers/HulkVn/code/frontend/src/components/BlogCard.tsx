import React, { useState } from 'react';
import type { Blog } from '../types/blog';
import { Heart, Edit, Trash2, User } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  currentUser: string;
  onLike: (blogId: string) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  currentUser,
  onLike,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(blog.content);
  const isAuthor = blog.author === currentUser;

  const handleEdit = () => {
    if (isEditing) {
      onEdit({ ...blog, content: editContent });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(blog.content);
    setIsEditing(false);
  };

  return (
    <div className="card mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {blog.author.slice(0, 6)}...{blog.author.slice(-4)}
          </span>
        </div>
        
        {isAuthor && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit blog"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(blog.objectId || blog.id)}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete blog"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="Write your blog content..."
          />
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="btn-primary text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-800 leading-relaxed mb-4">
            {blog.content}
          </p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => onLike(blog.objectId || blog.id)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${blog.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{blog.likes}</span>
            </button>
            
            <span className="text-xs text-gray-400">
              ID: {blog.id.slice(0, 8)}...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
