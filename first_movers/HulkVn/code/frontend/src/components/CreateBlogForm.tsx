import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CreateBlogFormProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <div className="card mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Create New Blog Post
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field min-h-[120px] resize-none"
          placeholder="Write your thoughts, ideas, or stories here..."
          disabled={isLoading}
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};
