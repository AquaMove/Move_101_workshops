import { useState } from "react";
import { useCreateBlog } from "../hooks/useBlog";

export function CreateBlogForm() {
  const [content, setContent] = useState("");
  const createBlog = useCreateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createBlog.mutate(
        { content: content.trim() },
        {
          onSuccess: () => {
            setContent("");
          },
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Create New Blog Post
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none mb-4"
          rows={6}
          required
        />
        <button
          type="submit"
          disabled={createBlog.isPending || !content.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createBlog.isPending ? "Creating..." : "Create Blog Post"}
        </button>
      </form>
    </div>
  );
}
