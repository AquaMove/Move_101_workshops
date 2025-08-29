import { useUserBlogs } from "../hooks/useUserBlogs";
import { BlogCard } from "./BlogCard";
import { LoadingSpinner } from "./LoadingSpinner";

export function UserBlogs() {
  const { data: blogs, isLoading, error, refetch } = useUserBlogs();

  if (isLoading) {
    return <LoadingSpinner message="Loading your blogs from blockchain..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="text-red-800 font-medium mb-2">
          Error loading your blogs
        </div>
        <div className="text-red-600 text-sm mb-4">{error.message}</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="text-gray-600 text-lg mb-2">No blogs found</div>
        <div className="text-gray-500 text-sm mb-4">
          You haven't created any blog posts yet.
        </div>
        <div className="text-gray-400 text-xs">
          Blog posts you create will appear here once confirmed on the
          blockchain.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Blog Posts</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
