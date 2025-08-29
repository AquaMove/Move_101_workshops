import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import type { Blog } from "../types/blog";
import {
  useLikeBlog,
  useEditBlog,
  useTransferBlog,
  useShareBlog,
  useDeleteBlog,
} from "../hooks/useBlog";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const account = useCurrentAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(blog.content);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [recipient, setRecipient] = useState("");

  const likeBlog = useLikeBlog();
  const editBlog = useEditBlog();
  const transferBlog = useTransferBlog();
  const shareBlog = useShareBlog();
  const deleteBlog = useDeleteBlog();

  const isAuthor = account?.address === blog.author;

  const handleLike = () => {
    likeBlog.mutate({ blogId: blog.id });
  };

  const handleEdit = () => {
    if (editContent.trim()) {
      editBlog.mutate(
        { blogId: blog.id, newContent: editContent },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        }
      );
    }
  };

  const handleTransfer = () => {
    if (recipient.trim()) {
      transferBlog.mutate(
        { blogId: blog.id, recipient: recipient.trim() },
        {
          onSuccess: () => {
            setShowTransferModal(false);
            setRecipient("");
          },
        }
      );
    }
  };

  const handleShare = () => {
    shareBlog.mutate(blog.id);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog.mutate(blog.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Blog Post
          </h3>
          <p className="text-sm text-gray-600">Author: {blog.author}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{blog.likes} likes</span>
          <button
            onClick={handleLike}
            disabled={likeBlog.isPending}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {likeBlog.isPending ? "Liking..." : "Like"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        {isEditing ? (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded resize-none"
              rows={4}
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleEdit}
                disabled={editBlog.isPending}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {editBlog.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(blog.content);
                }}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
        )}
      </div>

      {isAuthor && (
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => setShowTransferModal(true)}
            disabled={transferBlog.isPending}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {transferBlog.isPending ? "Transferring..." : "Transfer"}
          </button>
          <button
            onClick={handleShare}
            disabled={shareBlog.isPending}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {shareBlog.isPending ? "Sharing..." : "Share"}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteBlog.isPending}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {deleteBlog.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Transfer Blog</h3>
            <input
              type="text"
              placeholder="Recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleTransfer}
                disabled={transferBlog.isPending}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {transferBlog.isPending ? "Transferring..." : "Transfer"}
              </button>
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setRecipient("");
                }}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
