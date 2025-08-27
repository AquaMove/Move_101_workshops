# Move 101 Workshops Blog

This repository contains the documentation and blog for the Move 101 Workshops, built with [Nextra](https://nextra.site).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

### Build

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

## 📁 Project Structure

```
pages/
├── index.mdx              # Homepage
├── _meta.json             # Navigation configuration
├── modules/               # Module documentation
│   ├── _meta.json
│   ├── module-1.mdx
│   ├── module-2.mdx
│   ├── module-3.mdx
│   ├── module-4.mdx
│   └── module-5.mdx
├── guides/                # Additional guides
│   ├── _meta.json
│   ├── getting-started.mdx
│   ├── sui-setup.mdx
│   ├── move-basics.mdx
│   ├── testing.mdx
│   └── deployment.mdx
└── examples/              # Code examples
    └── _meta.json
```

## 🎨 Customization

### Theme Configuration

Edit `theme.config.jsx` to customize the appearance and behavior of the documentation site.

### Navigation

Update `_meta.json` files to modify the navigation structure.

### Styling

The site uses Tailwind CSS. You can customize styles by modifying the theme configuration.

## 📝 Content Guidelines

### Writing Documentation

1. **Use MDX**: All content should be written in MDX format
2. **Frontmatter**: Include title and description in frontmatter
3. **Code Blocks**: Use syntax highlighting for code examples
4. **Links**: Link to source code repositories and external resources
5. **Images**: Optimize images and use descriptive alt text

### Module Structure

Each module should include:

- Learning objectives
- Key concepts explanation
- Step-by-step implementation
- Code examples
- Exercises
- Additional resources
- Next steps

## 🔗 Links

- **Source Code**: [Move 101 Workshops Source](https://github.com/your-username/move-101-workshops-source)
- **Live Site**: [Move 101 Blog](https://move101-blog.vercel.app)
- **Sui Documentation**: [docs.sui.io](https://docs.sui.io)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
