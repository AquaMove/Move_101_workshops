import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";
import { CreateBlogForm } from "./components/CreateBlogForm";
import { BlogList } from "./components/BlogList";
import { UserBlogs } from "./components/UserBlogs";
import { ContractInfo } from "./components/ContractInfo";


function App() {
  const account = useCurrentAccount();
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
                Sui Blog
              </h1>
            </div>
            <ConnectButton className="!bg-white !text-blue-600 !rounded-full !shadow-md hover:!bg-blue-100 transition duration-200" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {account ? (
          <div className="space-y-10">
            <ContractInfo />
            <CreateBlogForm />

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-2 px-4 border-b-4 font-semibold text-base transition-all duration-200 ${activeTab === "all"
                    ? "border-pink-500 text-pink-600 bg-pink-50 shadow-sm"
                    : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                    } rounded-t-lg`}
                >
                  All Blogs
                </button>
                <button
                  onClick={() => setActiveTab("my")}
                  className={`py-2 px-4 border-b-4 font-semibold text-base transition-all duration-200 ${activeTab === "my"
                    ? "border-purple-500 text-purple-600 bg-purple-50 shadow-sm"
                    : "border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                    } rounded-t-lg`}
                >
                  My Blogs
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300">
              {activeTab === "all" ? <BlogList /> : <UserBlogs />}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-3xl font-bold text-gray-700 mb-4 animate-fade-in">
              Welcome to Sui Blog
            </div>
            <div className="text-lg text-gray-500 mb-6">
              Please connect your wallet to start creating and managing blog posts.
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default App;
