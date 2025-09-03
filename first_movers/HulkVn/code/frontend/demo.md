# Sui Blog DApp Demo

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Start Development Server:**
   ```bash
   pnpm dev
   ```

3. **Open Browser:**
   Navigate to `http://localhost:3000`

## 🧪 Testing the DApp

### Prerequisites
- Sui Wallet extension installed (Sui Wallet, Suiet, etc.)
- Some testnet SUI for gas fees

### Test Steps

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Choose your Sui wallet
   - Approve connection

2. **Create Blog Post**
   - Navigate to "Home" tab
   - Use the "Create New Blog Post" form
   - Write some content (e.g., "Hello Sui Blockchain!")
   - Click "Publish Blog"
   - Approve transaction in wallet

3. **View Your Blogs**
   - Go to "My Blogs" tab
   - See your published blog post
   - Test edit functionality
   - Test delete functionality

4. **Like Posts**
   - Click heart icon on any blog post
   - Approve transaction in wallet
   - See like count increase

## 🔧 Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure all dependencies are installed: `pnpm install`
   - Check package versions in package.json

2. **Wallet Connection Issues**
   - Make sure Sui wallet is installed
   - Check if wallet is on testnet
   - Refresh page and try again

3. **Transaction Failures**
   - Ensure sufficient SUI for gas fees
   - Check network connection
   - Verify smart contract address

### Debug Mode

Enable debug logging:
```bash
DEBUG=true pnpm dev
```

## 📱 Features to Test

- ✅ Wallet Connection
- ✅ Blog Creation
- ✅ Blog Editing
- ✅ Blog Deletion
- ✅ Blog Liking
- ✅ Responsive Design
- ✅ Navigation Tabs
- ✅ Error Handling

## 🌐 Network Configuration

Currently configured for Sui Testnet:
- RPC URL: `https://fullnode.testnet.sui.io:443`
- Smart Contract: `0x2fb27880ca0efd54fe127fb1d9503bc3f7710568ed3f360a6648edd26ff576fc`

## 📊 Expected Behavior

1. **After Wallet Connection:**
   - Header shows connected wallet address
   - Sidebar becomes accessible
   - Create blog form appears

2. **After Blog Creation:**
   - Blog appears in list
   - Transaction hash visible in wallet
   - Blog content displays correctly

3. **After Blog Actions:**
   - Edit: Content updates in real-time
   - Delete: Blog disappears from list
   - Like: Heart icon fills and count increases

## 🎯 Next Steps

- Test with different wallet types
- Verify smart contract interactions
- Test error scenarios
- Performance testing
- Mobile responsiveness testing
