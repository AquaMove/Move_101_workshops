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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Sui Blog dApp
              </h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {account ? (
          <div className="space-y-8">
            <ContractInfo />
            <CreateBlogForm />

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All Blogs
                </button>
                <button
                  onClick={() => setActiveTab("my")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "my"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  My Blogs
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "all" ? <BlogList /> : <UserBlogs />}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg mb-4">
              Welcome to Sui Blog dApp
            </div>
            <div className="text-gray-500 text-sm">
              Please connect your wallet to start creating and managing blog
              posts.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
