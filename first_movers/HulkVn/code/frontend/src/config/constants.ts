// Smart Contract Configuration
export const CONTRACT_CONFIG = {
  PACKAGE_ID: '0x3c11d4819905061150ee607e605180ed2d8090009d85c45775d8a6ed49390f6f',
  MODULE_NAME: 'blog',
  MODULE_ADDRESS: '0x3c11d4819905061150ee607e605180ed2d8090009d85c45775d8a6ed49390f6f',
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  TESTNET: {
    id: 'testnet',
    label: 'Testnet',
    rpcUrl: 'https://fullnode.testnet.sui.io:443',
    explorerUrl: 'https://suiexplorer.com/txblock',
  },
  MAINNET: {
    id: 'mainnet',
    label: 'Mainnet',
    rpcUrl: 'https://fullnode.mainnet.sui.io:443',
    explorerUrl: 'https://suiexplorer.com/txblock',
  },
} as const;

// Default Network
export const DEFAULT_NETWORK = NETWORK_CONFIG.TESTNET;

// UI Configuration
export const UI_CONFIG = {
  MAX_CONTENT_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
  PAGINATION_LIMIT: 10,
  DEBOUNCE_DELAY: 300,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet. Please try again.',
  TRANSACTION_FAILED: 'Transaction failed. Please check your wallet and try again.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for gas fees.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  BLOG_CREATED: 'Blog post created successfully!',
  BLOG_UPDATED: 'Blog post updated successfully!',
  BLOG_DELETED: 'Blog post deleted successfully!',
  BLOG_LIKED: 'Blog post liked successfully!',
  WALLET_CONNECTED: 'Wallet connected successfully!',
} as const;
