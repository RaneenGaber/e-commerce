# API Documentation

## Overview

This document provides comprehensive API documentation for the E-Commerce application's services, components, and state management.

## 🏪 Services

### AuthService

**Location**: `src/app/core/services/auth/auth.ts`

Authentication service for managing user login and session management.

#### Methods

##### `login(credentials: LoginCredentials): Observable<LoginResponse>`

Authenticates a user with email and password.

**Parameters:**
- `credentials: LoginCredentials` - User login credentials

**Returns:**
- `Observable<LoginResponse>` - Authentication response with token

**Example:**
```typescript
const credentials = { email: 'user@example.com', password: 'password' };
this.authService.login(credentials).subscribe(response => {
  console.log('Login successful:', response);
});
```

##### `logout(): void`

Logs out the current user and clears session data.

**Example:**
```typescript
this.authService.logout();
```

##### `isAuthenticated(): boolean`

Checks if the user is currently authenticated.

**Returns:**
- `boolean` - Authentication status

##### `getToken(): string | null`

Retrieves the current authentication token.

**Returns:**
- `string | null` - JWT token or null if not authenticated

### CartService

**Location**: `src/app/feature/cart/services/cart.ts`

Shopping cart service with NgRx integration and localStorage persistence.

#### Methods

##### `addToCart(product: Product): void`

Adds a product to the shopping cart.

**Parameters:**
- `product: Product` - Product to add to cart

**Example:**
```typescript
const product = { id: '1', productName: 'Laptop', price: 999, ... };
this.cartService.addToCart(product);
```

##### `removeFromCart(product: Product): void`

Removes a product from the shopping cart.

**Parameters:**
- `product: Product` - Product to remove from cart

##### `getCart(): Product[]`

Gets the current cart items synchronously.

**Returns:**
- `Product[]` - Array of cart items

##### `getTotalItems(): number`

Calculates the total number of items in the cart.

**Returns:**
- `number` - Total item count

##### `getTotalPrice(): number`

Calculates the total price of all items in the cart.

**Returns:**
- `number` - Total price

##### `getCartSummary(): Cart`

Gets a complete cart summary with items, totals, and pricing.

**Returns:**
- `Cart` - Cart summary object

##### `saveCartToStorage(cart: Product[]): void`

Saves cart items to localStorage for persistence.

**Parameters:**
- `cart: Product[]` - Cart items to save

##### `loadCartFromStorage(): Product[]`

Loads cart items from localStorage.

**Returns:**
- `Product[]` - Loaded cart items

### ProductService

**Location**: `src/app/feature/products/services/product.ts`

Product management service for fetching and filtering products.

#### Methods

##### `getProducts(): Observable<ProductsResponse>`

Fetches all available products.

**Returns:**
- `Observable<ProductsResponse>` - Products response with data

##### `getProductById(id: string): Observable<Product>`

Fetches a specific product by ID.

**Parameters:**
- `id: string` - Product identifier

**Returns:**
- `Observable<Product>` - Product details

##### `searchProducts(query: string): Observable<ProductsResponse>`

Searches products by query string.

**Parameters:**
- `query: string` - Search query

**Returns:**
- `Observable<ProductsResponse>` - Search results

## 🧩 Components

### Header Component

**Location**: `src/app/shared/components/header/header.ts`

Navigation header with cart indicator and breadcrumb navigation.

#### Inputs

- `pageTitle: string` (required) - Current page title
- `breadcrumb: string[]` - Navigation breadcrumb items

#### Methods

##### `goToPage(crumb: string, last: boolean): void`

Navigates to a breadcrumb page.

**Parameters:**
- `crumb: string` - Breadcrumb item
- `last: boolean` - Whether this is the last breadcrumb

##### `navigateToCart(): void`

Navigates to the shopping cart page.

#### Template Usage

```html
<app-header 
  [pageTitle]="'Products'" 
  [breadcrumb]="['Home', 'Products']">
</app-header>
```

### ProductCard Component

**Location**: `src/app/feature/products/components/product-card/product-card.ts`

Product display card with add to cart functionality.

#### Inputs

- `product: Product` - Product data to display

#### Methods

##### `addToCart(): void`

Adds the product to the shopping cart.

##### `navigateToDetails(): void`

Navigates to the product details page.

#### Template Usage

```html
<app-product-card [product]="product"></app-product-card>
```

### CartItems Component

**Location**: `src/app/feature/cart/components/cart-items/cart-items.ts`

Table component for displaying cart items.

#### Inputs

- `items: Product[]` - Cart items to display

#### Template Usage

```html
<app-cart-items [items]="cartItems"></app-cart-items>
```

## 🏪 State Management (NgRx)

### Cart Store

**Location**: `src/app/store/cart/`

Complete cart state management with actions, reducers, effects, and selectors.

#### Actions

##### `loadCart`

Loads cart from localStorage on app initialization.

```typescript
this.store.dispatch(CartActions.loadCart());
```

##### `addToCart({ product, quantity? })`

Adds a product to the cart.

**Parameters:**
- `product: Product` - Product to add
- `quantity?: number` - Optional quantity (default: 1)

##### `removeFromCart({ id })`

Removes a product from the cart.

**Parameters:**
- `id: string` - Product ID to remove

##### `syncCart({ items })`

Synchronizes cart across browser tabs.

**Parameters:**
- `items: Product[]` - Cart items to sync

#### Selectors

##### `selectCartItems`

Gets all cart items.

```typescript
this.cartItems$ = this.store.select(selectCartItems);
```

##### `selectCartItemsCount`

Gets the total number of items in the cart.

```typescript
this.cartCount$ = this.store.select(selectCartItemsCount);
```

##### `selectCartTotal`

Gets the total price of all cart items.

```typescript
this.cartTotal$ = this.store.select(selectCartTotal);
```

##### `selectIsCartEmpty`

Checks if the cart is empty.

```typescript
this.isEmpty$ = this.store.select(selectIsCartEmpty);
```

##### `selectCartSummary`

Gets a complete cart summary.

```typescript
this.cartSummary$ = this.store.select(selectCartSummary);
```

#### Effects

##### `loadCart$`

Loads cart from localStorage and dispatches success action.

##### `persistCart$`

Automatically saves cart changes to localStorage.

##### `syncCart$`

Handles cross-tab cart synchronization.

## 🔧 Interfaces & Models

### Product Interface

```typescript
interface Product {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  imageUrl: string;
  price: number;
  brandName: string;
}
```

### Cart Interface

```typescript
interface Cart {
  items: Product[];
  totalItems: number;
  totalPrice: number;
}
```

### LoginCredentials Interface

```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

### LoginResponse Interface

```typescript
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
```

## 🛡️ Guards & Interceptors

### AuthGuard

**Location**: `src/app/core/guards/auth.guard.ts`

Route guard that protects authenticated routes.

#### Usage

```typescript
{
  path: 'products',
  canActivate: [AuthGuard],
  loadChildren: () => import('./feature/products/product.routes')
}
```

### AuthInterceptor

**Location**: `src/app/core/interceptors/auth.interceptor.ts`

HTTP interceptor that adds authentication tokens to requests.

#### Features

- Automatic token injection
- Token refresh handling
- Error response management

## 🎨 Styling & Theming

### Tailwind CSS Classes

The application uses Tailwind CSS for styling:

- **Layout**: `flex`, `grid`, `container`
- **Spacing**: `p-4`, `m-2`, `gap-4`
- **Colors**: `bg-blue-500`, `text-white`, `border-gray-300`
- **Responsive**: `sm:`, `md:`, `lg:` prefixes

### Angular Material Components

- **MatButton**: Action buttons
- **MatCard**: Product cards
- **MatIcon**: Icons and symbols
- **MatTable**: Data tables

## 🧪 Testing

### Unit Testing

Components and services include comprehensive unit tests:

```typescript
describe('CartService', () => {
  it('should add product to cart', () => {
    const product = mockProduct;
    cartService.addToCart(product);
    expect(cartService.getCart()).toContain(product);
  });
});
```

### Integration Testing

Feature modules are tested with integration tests covering:

- Component interactions
- Service integration
- State management flows

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Mobile-First Approach

All components are designed mobile-first with progressive enhancement for larger screens.

## 🔒 Security Considerations

### Authentication

- JWT token-based authentication
- Automatic token refresh
- Secure token storage

### Data Protection

- Input validation and sanitization
- XSS protection
- CSRF protection

### Route Security

- Protected routes with guards
- Role-based access control
- Session management

---

This API documentation provides a comprehensive guide to the E-Commerce application's architecture, services, and components. For more specific implementation details, refer to the source code and inline documentation.
