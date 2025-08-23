# Sui Blog dApp

A decentralized blog application built on the Sui blockchain that allows users to create, edit, like, share, and manage blog posts.

## Features

- **Create Blog Posts**: Write and publish new blog posts on the Sui blockchain
- **Edit Content**: Authors can edit their blog posts
- **Like Posts**: Users can like blog posts to show appreciation
- **Transfer Ownership**: Authors can transfer blog ownership to other users
- **Share Publicly**: Make blogs publicly readable while maintaining edit permissions
- **Delete Posts**: Authors can delete their blog posts
- **View All Blogs**: Browse all published blog posts (fetched from blockchain events)
- **My Blogs**: View and manage your own blog posts (fetched from owned objects)
- **Real-time Data**: All data is fetched directly from the Sui blockchain
- **Automatic Refresh**: Data updates automatically when transactions are confirmed

## Smart Contract

The dApp interacts with a Sui Move smart contract deployed at:
- **Package ID**: `0x95075dfcffccd0e65994bb9d7aeecf5f55ca447d176a17811d255c4b3217ccfa`
- **Module**: `blog`
- **Network**: Testnet

### Contract Functions

- `create_blog(content: String)` - Create a new blog post
- `like_blog(blog: &mut Blog)` - Like a blog post
- `edit_content(blog: &mut Blog, new_content: String)` - Edit blog content (author only)
- `transfer_blog(blog: Blog, recipient: address)` - Transfer blog ownership (author only)
- `share_blog(blog: Blog)` - Make blog publicly readable (author only)
- `delete_blog(blog: Blog)` - Delete a blog post (author only)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Sui wallet (Sui Wallet, Suiet, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sui-blog-front-end
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Usage

1. **Connect Wallet**: Click the "Connect" button to connect your Sui wallet
2. **Create Blog**: Use the form to write and publish a new blog post
3. **View Blogs**: Switch between "All Blogs" and "My Blogs" tabs
4. **Interact**: Like, edit, share, transfer, or delete blog posts as needed

### How Data is Fetched

#### All Blogs Tab
- Queries `BlogPublished` events from the smart contract
- For each event, fetches the current state of the blog object
- Shows blogs from all users in chronological order

#### My Blogs Tab
- Queries objects owned by the connected wallet
- Filters for objects of type `Blog` from our contract
- Shows only blogs owned by the current user

#### Real-time Updates
- Data automatically refreshes after each transaction
- Uses React Query for efficient caching and background updates
- Loading states show progress while fetching from blockchain

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Blockchain**: Sui
- **UI Framework**: Tailwind CSS
- **State Management**: TanStack Query
- **Wallet Integration**: @mysten/dapp-kit

## Project Structure

```
src/
├── components/          # React components
│   ├── BlogCard.tsx    # Individual blog post display
│   ├── BlogList.tsx    # List of all blogs
│   ├── UserBlogs.tsx   # User's own blogs
│   ├── CreateBlogForm.tsx # Blog creation form
│   └── ContractInfo.tsx # Contract information display
├── hooks/              # Custom React hooks
│   ├── useBlog.ts      # Blog interaction hooks
│   └── useUserBlogs.ts # User-specific blog hooks
├── types/              # TypeScript type definitions
│   └── blog.ts         # Blog-related interfaces
├── constants/          # Application constants
│   └── contract.ts     # Contract configuration
└── App.tsx             # Main application component
```

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Environment Variables

No environment variables are required for this project as it uses the public Sui testnet.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
