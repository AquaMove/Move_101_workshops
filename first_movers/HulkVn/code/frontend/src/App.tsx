import { useState, useEffect, useCallback } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui/client';
import { Header } from './components/Header';
import { CreateBlogForm } from './components/CreateBlogForm';
import { BlogList } from './components/BlogList';
import { BlogService } from './services/blogService';
import type { Blog } from './types/blog';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SettingsProfile } from './components/SettingsProfile';

function App() {
  const currentAccount = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransactionBlock } = useSignAndExecuteTransaction();
  const [activeTab, setActiveTab] = useState('home');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogService, setBlogService] = useState<BlogService | null>(null);

  // Initialize blog service when wallet is connected
  useEffect(() => {
    if (currentAccount) {
      const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });
      setBlogService(new BlogService(client));
    }
  }, [currentAccount]);

  // Load blogs when tab changes or wallet connects
  useEffect(() => {
    if (blogService && currentAccount) {
      loadBlogs();
    }
  }, [blogService, currentAccount, activeTab]);

  const loadBlogs = useCallback(async () => {
    if (!blogService || !currentAccount) return;

    setIsLoading(true);
    setError(null);

    try {
      let fetchedBlogs: Blog[] = [];
      
      switch (activeTab) {
        case 'my-blogs':
          fetchedBlogs = await blogService.getBlogs(currentAccount.address);
          break;
        default: // home
          fetchedBlogs = await blogService.getBlogs(currentAccount.address);
          break;
      }
      
      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [blogService, currentAccount, activeTab]);

  const handleCreateBlog = async (content: string) => {
    if (!currentAccount) {
      toast.info('Please connect your wallet to publish blog posts');
      return;
    }
    
    if (!blogService || !signAndExecuteTransactionBlock) return;

    setIsCreating(true);
    setError(null);

    try {
      await blogService.createBlog({ content }, signAndExecuteTransactionBlock);
      toast.success('Blog post created successfully!');
      await loadBlogs(); // Reload blogs after creation
    } catch (err: any) {
      console.error('Error creating blog:', err);
      toast.error(err?.message ?? 'Failed to create blog post');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLikeBlog = async (blogId: string) => {
    if (!blogService || !signAndExecuteTransactionBlock) return;

    try {
      await blogService.likeBlog(blogId, signAndExecuteTransactionBlock);
      toast.success('Liked!');
      await loadBlogs(); // Reload blogs after like
    } catch (err) {
      console.error('Error liking blog:', err);
      setError('Failed to like blog post. Please try again.');
    }
  };

  const handleEditBlog = async (blog: Blog) => {
    if (!blogService || !signAndExecuteTransactionBlock) return;

    try {
      await blogService.editBlog(
        { objectId: blog.objectId || blog.id, newContent: blog.content },
        signAndExecuteTransactionBlock
      );
      toast.success('Updated!');
      await loadBlogs(); // Reload blogs after edit
    } catch (err) {
      console.error('Error editing blog:', err);
      setError('Failed to edit blog post. Please try again.');
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!blogService || !signAndExecuteTransactionBlock) return;

    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await blogService.deleteBlog(blogId, signAndExecuteTransactionBlock);
      toast.success('Deleted!');
      await loadBlogs(); // Reload blogs after deletion
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog post. Please try again.');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {activeTab === 'settings' ? (
              <SettingsProfile
                address={currentAccount?.address}
                network="Testnet"
              />
            ) : (
              <>
                {(activeTab === 'home' || activeTab === 'my-blogs') && (
                  <CreateBlogForm
                    onSubmit={handleCreateBlog}
                    isLoading={isCreating}
                  />
                )}
                
                {/* Blog list */}
                <BlogList
                  blogs={blogs}
                  currentUser={currentAccount?.address || ''}
                  isLoading={isLoading}
                  onLike={handleLikeBlog}
                  onEdit={handleEditBlog}
                  onDelete={handleDeleteBlog}
                />
              </>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;
