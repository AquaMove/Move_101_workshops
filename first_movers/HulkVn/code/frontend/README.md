# Sui Blog DApp

A decentralized blog application built on the Sui blockchain using React, TypeScript, Tailwind CSS, and Vite.

## Features

- 🚀 **Create Blog Posts**: Write and publish blog posts on the Sui blockchain
- ❤️ **Like Posts**: Like your favorite blog posts
- ✏️ **Edit Posts**: Edit your own blog posts
- 🗑️ **Delete Posts**: Remove your blog posts
- 👛 **Wallet Integration**: Connect with Sui wallets (Sui Wallet, Suiet, etc.)
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS

## Smart Contract

This dapp interacts with a Sui Move smart contract with the following package ID:
```
0x2fb27880ca0efd54fe127fb1d9503bc3f7710568ed3f360a6648edd26ff576fc
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Blockchain**: Sui
- **Wallet**: @mysten/dapp-kit
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Sui wallet (Sui Wallet, Suiet, etc.)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sui-blog-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Connecting Wallet

1. Click the "Connect Wallet" button in the header
2. Choose your preferred Sui wallet
3. Approve the connection

### Creating Blog Posts

1. Navigate to the "Home" or "My Blogs" tab
2. Use the "Create New Blog Post" form
3. Write your content and click "Publish Blog"
4. Approve the transaction in your wallet

### Managing Your Blogs

- **View**: All your blogs are displayed in the "My Blogs" tab
- **Edit**: Click the edit icon on any of your blog posts
- **Delete**: Click the delete icon to remove a blog post
- **Like**: Click the heart icon to like any blog post

### Navigation

- **Home**: View your blogs and create new ones
- **My Blogs**: Manage your own blog posts
- **Public Blogs**: View all public blog posts (coming soon)
- **Settings**: Application settings (coming soon)

## Project Structure

```
src/
├── components/          # React components
│   ├── BlogCard.tsx    # Individual blog post display
│   ├── BlogList.tsx    # List of blog posts
│   ├── CreateBlogForm.tsx # Form for creating blogs
│   ├── Header.tsx      # Application header
│   └── Sidebar.tsx     # Navigation sidebar
├── services/           # Business logic
│   └── blogService.ts  # Blog contract interactions
├── types/              # TypeScript type definitions
│   └── blog.ts         # Blog-related types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── provider.tsx        # Provider configuration
└── index.css           # Global styles
```

## Smart Contract Functions

The dapp interacts with the following Move functions:

- `create_blog(content: String)` - Create a new blog post
- `like_blog(blog: &mut Blog)` - Like a blog post
- `edit_content(blog: &mut Blog, new_content: String)` - Edit blog content
- `delete_blog(blog: Blog)` - Delete a blog post

## Configuration

### Network Configuration

The dapp is configured to use Sui testnet by default. To change networks, modify the `networks` object in `src/provider.tsx`.

### Contract Address

To use a different smart contract, update the `PACKAGE_ID` constant in `src/services/blogService.ts`.

## Building for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## Development

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain consistent component structure

### Adding New Features

1. Create new components in `src/components/`
2. Add new types in `src/types/`
3. Extend services in `src/services/`
4. Update the main App component as needed

## Troubleshooting

### Common Issues

1. **Wallet Connection Failed**: Ensure you have a Sui wallet installed and are on the correct network
2. **Transaction Failed**: Check that you have sufficient SUI for gas fees
3. **Blogs Not Loading**: Verify the smart contract address and network configuration

### Debug Mode

Enable debug logging by setting the environment variable:
```bash
DEBUG=true pnpm dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the Sui documentation
- Join the Sui Discord community

## Roadmap

- [ ] Public blog discovery
- [ ] Blog categories and tags
- [ ] User profiles
- [ ] Social features (comments, sharing)
- [ ] Blog analytics
- [ ] Multi-language support
- [ ] Advanced search and filtering
