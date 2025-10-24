# HTTP Interceptors Documentation

## Overview

This document describes the HTTP interceptors implemented in the E-Commerce application for handling authentication, loading states, and error management.

## 🔧 Interceptors

### 1. AuthInterceptor

**Location**: `src/app/core/interceptors/auth.interceptor.ts`

Automatically adds authentication tokens to HTTP requests.

#### Features

- **Token Injection**: Automatically adds `Authorization: Bearer <token>` header
- **Token Retrieval**: Gets token from AuthService
- **Request Cloning**: Creates new request with auth header

#### Usage

```typescript
// Automatically applied to all HTTP requests
// No manual configuration needed
```

### 2. ErrorInterceptor

**Location**: `src/app/core/interceptors/error.interceptor.ts`

Handles HTTP errors globally and provides user-friendly error messages.

#### Features

- **Global Error Handling**: Catches all HTTP errors
- **User-Friendly Messages**: Converts technical errors to readable messages
- **Automatic Redirects**: Redirects to login on 401 errors
- **Notification Integration**: Shows error notifications to users

#### Error Handling

| Status Code | Title | Message | Action |
|-------------|-------|---------|--------|
| 400 | Bad Request | Please check your input and try again | Show notification |
| 401 | Unauthorized | Please login again to continue | Redirect to login |
| 403 | Access Denied | You do not have permission to access this resource | Show notification |
| 404 | Not Found | The requested resource was not found | Show notification |
| 422 | Validation Error | Please check your input and try again | Show notification |
| 429 | Too Many Requests | Please try again later | Show notification |
| 500 | Server Error | Internal server error. Please try again later | Show notification |
| 502 | Bad Gateway | Server is temporarily unavailable | Show notification |
| 503 | Service Unavailable | Service is temporarily unavailable. Please try again later | Show notification |
| 504 | Timeout | Request timed out. Please try again | Show notification |

### 3. LoadingInterceptor

**Location**: `src/app/core/interceptors/loading.interceptor.ts`

Manages loading states for HTTP requests.

#### Features

- **Automatic Loading**: Shows loading indicator during requests
- **Request Counting**: Tracks multiple concurrent requests
- **Skip Patterns**: Excludes certain requests from loading (health checks, analytics)
- **Service Integration**: Uses LoadingService for state management

#### Skip Patterns

The following request patterns are excluded from loading:

- `/api/health` - Health check endpoints
- `/api/heartbeat` - Heartbeat endpoints
- `/api/analytics` - Analytics tracking
- `/api/logs` - Logging endpoints

## 🛠️ Services

### LoadingService

**Location**: `src/app/core/services/loading/loading.service.ts`

Manages application loading states.

#### Methods

```typescript
// Start loading
loadingService.startLoading();

// Stop loading
loadingService.stopLoading();

// Force stop all loading
loadingService.stopAllLoading();

// Check if loading
const isLoading = loadingService.isLoadingActive();

// Set loading manually
loadingService.setLoading(true);
```

#### Signals (Modern Approach)

```typescript
// Reactive loading state
const isLoading = loadingService.isLoading();

// Observable loading state
const loading$ = loadingService.loading$;
```

### NotificationService

**Location**: `src/app/core/services/notification/notification.service.ts`

Manages application notifications.

#### Methods

```typescript
// Success notification
notificationService.success('Success', 'Operation completed successfully');

// Error notification
notificationService.error('Error', 'Something went wrong');

// Warning notification
notificationService.warning('Warning', 'Please check your input');

// Info notification
notificationService.info('Info', 'Here is some information');

// Remove notification
notificationService.removeNotification(notificationId);

// Clear all notifications
notificationService.clearAll();
```

## 🎨 Components

### LoadingComponent

**Location**: `src/app/shared/components/loading/loading.component.ts`

Global loading overlay component.

#### Features

- **Full Screen Overlay**: Covers entire application
- **Animated Spinner**: CSS animations for loading indicator
- **Accessibility**: ARIA labels and roles
- **Auto-Hide**: Automatically shows/hides based on loading state

#### Usage

```html
<!-- Automatically included in app.html -->
<app-loading></app-loading>
```

### LoadingSpinnerComponent

**Location**: `src/app/shared/components/loading-spinner/loading-spinner.component.ts`

Reusable loading spinner component.

#### Features

- **Multiple Sizes**: sm, md, lg, xl
- **Custom Colors**: Configurable spinner color
- **Optional Text**: Display loading text
- **Flexible Styling**: Custom CSS classes

#### Usage

```html
<!-- Basic usage -->
<app-loading-spinner [show]="true"></app-loading-spinner>

<!-- With text and size -->
<app-loading-spinner 
  [show]="isLoading" 
  text="Loading products..." 
  size="lg">
</app-loading-spinner>

<!-- Custom styling -->
<app-loading-spinner 
  [show]="isLoading"
  color="#FF6B6B"
  containerClass="my-4"
  textClass="text-blue-600">
</app-loading-spinner>
```

### NotificationComponent

**Location**: `src/app/shared/components/notification/notification.component.ts`

Global notification display component.

#### Features

- **Multiple Types**: Success, error, warning, info
- **Auto-Dismiss**: Configurable auto-dismiss timing
- **Manual Dismiss**: Click to close notifications
- **Accessibility**: ARIA live regions and labels
- **Animations**: Smooth enter/exit animations

#### Usage

```html
<!-- Automatically included in app.html -->
<app-notification></app-notification>
```

## 🔧 Configuration

### App Configuration

**Location**: `src/app/app.config.ts`

Interceptors are configured in the application configuration:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient(withInterceptors([
      AuthInterceptor,      // 1. Add auth headers
      ErrorInterceptor,     // 2. Handle errors
      LoadingInterceptor    // 3. Manage loading states
    ])),
    // ... other providers
  ]
};
```

### Interceptor Order

The interceptors are applied in the following order:

1. **AuthInterceptor**: Adds authentication headers
2. **ErrorInterceptor**: Handles errors and shows notifications
3. **LoadingInterceptor**: Manages loading states

## 📱 Usage Examples

### Basic HTTP Request

```typescript
// Service method
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // AuthInterceptor automatically adds auth header
    // LoadingInterceptor shows loading indicator
    // ErrorInterceptor handles any errors
    return this.http.get<Product[]>('/api/products');
  }
}
```

### Manual Loading Control

```typescript
@Component({...})
export class ProductComponent {
  private loadingService = inject(LoadingService);
  private notificationService = inject(NotificationService);

  loadProducts() {
    // Manual loading control
    this.loadingService.startLoading();
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loadingService.stopLoading();
        this.notificationService.success('Success', 'Products loaded successfully');
      },
      error: (error) => {
        this.loadingService.stopLoading();
        // ErrorInterceptor already handled the error notification
      }
    });
  }
}
```

### Custom Error Handling

```typescript
@Component({...})
export class ProductComponent {
  private notificationService = inject(NotificationService);

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.notificationService.success('Success', 'Product deleted successfully');
      },
      error: (error) => {
        // Custom error handling for specific cases
        if (error.status === 409) {
          this.notificationService.warning('Warning', 'Cannot delete product with active orders');
        }
        // Other errors are handled by ErrorInterceptor
      }
    });
  }
}
```

## 🧪 Testing

### Testing with Interceptors

```typescript
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        // Interceptors are automatically included
      ]
    });
    
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should handle errors with interceptor', () => {
    service.getProducts().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        // ErrorInterceptor should have shown notification
      }
    });

    const req = httpMock.expectOne('/api/products');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
```

## 🚀 Best Practices

### 1. Error Handling

- **Don't duplicate error handling**: Let ErrorInterceptor handle common errors
- **Use specific error handling**: Only handle specific business logic errors
- **Provide context**: Use meaningful error messages

### 2. Loading States

- **Use automatic loading**: Let LoadingInterceptor handle most cases
- **Manual control when needed**: Use LoadingService for complex scenarios
- **Avoid loading conflicts**: Don't mix automatic and manual loading

### 3. Notifications

- **Use appropriate types**: Success, error, warning, info
- **Keep messages concise**: Short, clear messages
- **Provide context**: Include relevant details

### 4. Performance

- **Skip unnecessary loading**: Configure skip patterns for background requests
- **Limit notifications**: Don't overwhelm users with too many notifications
- **Clean up subscriptions**: Properly unsubscribe from observables

## 🔍 Debugging

### Interceptor Debugging

```typescript
// Add logging to interceptors for debugging
export function LoadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('Loading interceptor:', req.url);
  const loadingService = inject(LoadingService);
  
  loadingService.startLoading();
  
  return next(req).pipe(
    finalize(() => {
      console.log('Request completed:', req.url);
      loadingService.stopLoading();
    })
  );
}
```

### Loading State Debugging

```typescript
// Monitor loading state
@Component({...})
export class DebugComponent {
  constructor(private loadingService: LoadingService) {
    // Log loading state changes
    this.loadingService.loading$.subscribe(loading => {
      console.log('Loading state changed:', loading);
    });
  }
}
```

---

This documentation provides comprehensive information about the HTTP interceptors in the E-Commerce application. The interceptors work together to provide a seamless user experience with proper error handling, loading states, and authentication.
