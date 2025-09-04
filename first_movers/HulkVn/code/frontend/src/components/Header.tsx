import React from 'react';
import { BookOpen } from 'lucide-react';
import { WalletInfo } from './WalletInfo';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'my-blogs', label: 'My Blogs' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: logo + title */}
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">Sui Blog</h1>
          </div>

          {/* Center: tabs */}
          <nav className="hidden md:flex items-center justify-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right: wallet */}
          <div className="flex items-center justify-end space-x-4">
            {/* <ConnectButton/> */}
            <WalletInfo />
          </div>
        </div>

        {/* Mobile tabs */}
        <nav className="md:hidden flex items-center space-x-2 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
