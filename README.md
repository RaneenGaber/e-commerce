# E-Commerce Application

A modern, full-featured e-commerce application built with Angular 20, featuring product catalog, shopping cart, authentication, and state management with NgRx.

## 🚀 Features

- **Product Catalog**: Browse and search products with filtering capabilities
- **Shopping Cart**: Add/remove items with persistent storage across sessions
- **Authentication**: Secure login system with route guards
- **State Management**: NgRx store for cart and application state
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Angular Material components with custom styling

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20
- **State Management**: NgRx Store & Effects
- **Styling**: Tailwind CSS + Angular Material
- **Routing**: Angular Router with lazy loading
- **HTTP Client**: Angular HttpClient with interceptors
- **Testing**: Jasmine & Karma
- **Build Tool**: Angular CLI

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/             # Route guards
│   │   ├── interceptors/      # HTTP interceptors
│   │   ├── models/            # Core interfaces
│   │   └── services/          # Core services
│   ├── feature/               # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── cart/              # Shopping cart
│   │   └── products/          # Product catalog
│   ├── shared/                # Shared components
│   │   ├── components/        # Reusable components
│   │   ├── directives/         # Custom directives
│   │   ├── models/            # Shared interfaces
│   │   └── pipes/             # Custom pipes
│   ├── store/                 # NgRx store
│   │   └── cart/              # Cart state management
│   ├── app.config.ts          # App configuration
│   ├── app.routes.ts          # Route definitions
│   └── app.ts                 # Root component
├── environments/              # Environment configurations
├── styles.css                 # Global styles
└── main.ts                    # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

## 🏗️ Architecture Overview

### Core Architecture

The application follows Angular's recommended architecture with:

- **Feature-based modules**: Organized by business functionality
- **Lazy loading**: Routes are loaded on-demand for better performance
- **State management**: Centralized state with NgRx
- **Service layer**: Business logic separated from components

### State Management

The application uses NgRx for state management:

- **Store**: Centralized state container
- **Actions**: Events that describe state changes
- **Reducers**: Pure functions that handle state transitions
- **Effects**: Side effects and async operations
- **Selectors**: Memoized functions for state queries

### Cart State Management

The shopping cart is managed through NgRx with:

- **Persistence**: Automatic localStorage synchronization
- **Cross-tab sync**: Real-time updates across browser tabs
- **Optimistic updates**: Immediate UI feedback
- **Error handling**: Graceful fallbacks for storage issues

## 📱 Features Documentation

### Authentication System

- **Route Guards**: Protect authenticated routes
- **HTTP Interceptors**: Automatic token management
- **Login/Logout**: Secure authentication flow

### Product Catalog

- **Product Listing**: Paginated product display
- **Product Details**: Detailed product information
- **Search & Filter**: Advanced product filtering
- **Responsive Cards**: Mobile-optimized product cards

### Shopping Cart

- **Add/Remove Items**: Intuitive cart management
- **Quantity Updates**: Increment/decrement functionality
- **Persistent Storage**: Cart survives page refreshes
- **Real-time Updates**: Instant UI feedback
- **Cross-tab Sync**: Synchronized across browser tabs

## 🔧 Configuration

### Environment Setup

The application supports multiple environments:

- **Development**: Debug mode with source maps
- **Production**: Optimized build with minification

### Routing Configuration

Routes are configured with:

- **Lazy Loading**: Feature modules loaded on-demand
- **Route Guards**: Authentication protection
- **Title Management**: Dynamic page titles

### State Configuration

NgRx is configured with:

- **Store**: Cart state management
- **Effects**: Side effects for persistence
- **DevTools**: Development debugging support

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm test

# E2E tests (if configured)
npm run e2e
```

### Test Structure

- **Unit Tests**: Component and service testing
- **Integration Tests**: Feature module testing
- **E2E Tests**: End-to-end user flows

## 📦 Build & Deployment

### Development Build

```bash
npm run build
```

### Production Build

```bash
npm run build --configuration production
```

### Build Output

The build process generates:

- **Optimized bundles**: Minified JavaScript and CSS
- **Asset optimization**: Compressed images and fonts
- **Tree shaking**: Unused code elimination
- **Source maps**: Debug information for development

## 🎨 Styling & UI

### Design System

- **Tailwind CSS**: Utility-first CSS framework
- **Angular Material**: Material Design components
- **Custom Theme**: Brand-specific styling
- **Responsive Design**: Mobile-first approach

### Component Library

- **Header**: Navigation with cart indicator
- **Product Cards**: Consistent product display
- **Cart Items**: Shopping cart management
- **Tables**: Data display components

## 🔒 Security

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Route Protection**: Guarded routes for authenticated users
- **Token Refresh**: Automatic token renewal

### Data Protection

- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery prevention

## 🚀 Performance

### Optimization Features

- **Lazy Loading**: On-demand module loading
- **Tree Shaking**: Unused code elimination
- **Bundle Splitting**: Optimized chunk loading
- **Caching**: HTTP and browser caching strategies

### Monitoring

- **Performance Metrics**: Core Web Vitals tracking
- **Error Tracking**: Application error monitoring
- **User Analytics**: Usage pattern analysis

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow Angular style guide
2. **Testing**: Write tests for new features
3. **Documentation**: Update docs for changes
4. **Commits**: Use conventional commit messages

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added cart persistence and cross-tab sync
- **v1.2.0**: Enhanced UI with Material Design
- **v1.3.0**: Performance optimizations and testing

---

**Built with ❤️ using Angular 20**