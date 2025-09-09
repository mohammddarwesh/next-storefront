# Next Storefront - E-Commerce Platform

A modern, high-performance e-commerce platform built with Next.js 15, featuring multilingual support, SEO optimization, and a premium shopping experience.

## 🚀 Features

### Core Functionality
- **Product Catalog** - Browse and search products from Fake Store API
- **Advanced Filtering** - Filter by category, price range, and search terms
- **Product Details** - Comprehensive product pages with images and descriptions
- **Shopping Cart** - Full cart management with persistent state
- **Multilingual Support** - Complete Turkish and English localization

### Technical Excellence
- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety and better development experience
- **TailwindCSS** for modern, responsive design
- **SEO Optimized** with dynamic meta tags and structured data
- **Performance Focused** with ISR, image optimization, and caching

### UI/UX
- **Responsive Design** - Mobile-first approach with excellent desktop experience
- **Dark/Light Theme** - System preference detection with manual toggle
- **Modern Components** - Built with shadcn/ui component library
- **Smooth Animations** - Micro-interactions and loading states
- **Accessibility** - WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.2 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.1.12
- **UI Components:** shadcn/ui with Radix UI primitives
- **State Management:** Redux Toolkit with Redux Persist
- **Internationalization:** next-intl 4.3.6
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd next-storefront
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌍 Internationalization

The application supports English and Turkish languages:
- **English:** `/en/` routes
- **Turkish:** `/tr/` routes

Language detection is automatic based on browser preferences, with manual switching available.

## 🎯 Performance Features

- **ISR (Incremental Static Regeneration)** - 1-hour cache for optimal performance
- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Route-based automatic code splitting
- **Caching Strategy** - Multi-layer caching for API responses
- **Bundle Optimization** - Tree shaking and minification

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced layouts for medium screens
- **Desktop Experience** - Full-featured desktop interface
- **Touch Friendly** - Optimized touch targets and gestures

## 🔍 SEO Features

- **Dynamic Meta Tags** - Product-specific titles and descriptions
- **Structured Data** - JSON-LD schema for rich snippets
- **OpenGraph Tags** - Social media sharing optimization
- **Canonical URLs** - Proper URL canonicalization
- **Sitemap Generation** - Automatic sitemap creation

## 🛒 E-Commerce Features

### Product Management
- Product listing with pagination
- Category-based filtering
- Price range filtering
- Search functionality
- Product detail pages

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart state
- Cart drawer interface
- Order summary

### User Experience
- Loading states and skeletons
- Error handling and boundaries
- Toast notifications
- Responsive navigation
- Theme switching

## 📂 Project Structure

```
next-storefront/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── cart/             # Cart-related components
│   ├── products/         # Product components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization config
├── lib/                  # Utilities and configurations
│   ├── api/              # API functions
│   ├── features/         # Redux slices
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── messages/             # Translation files
│   ├── en.json           # English translations
│   └── tr.json           # Turkish translations
└── providers/            # Context providers
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
The application can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance Metrics

Expected Lighthouse scores:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- ESLint configuration for Next.js
- TypeScript strict mode
- Prettier formatting (recommended)
- Git hooks for pre-commit checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Fake Store API](https://fakestoreapi.com) - Product data source
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
