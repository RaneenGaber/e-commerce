# Development Guide

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher) or **yarn**
- **Angular CLI** (v20 or higher)
- **Git**

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

## 🏗️ Project Structure

### Directory Organization

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/             # Route guards
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/      # HTTP interceptors
│   │   │   └── auth.interceptor.ts
│   │   ├── models/            # Core interfaces
│   │   │   └── interfaces/
│   │   └── services/          # Core services
│   │       ├── auth/          # Authentication
│   │       └── utils/         # Utility services
│   ├── feature/               # Feature modules
│   │   ├── auth/              # Authentication feature
│   │   │   ├── components/
│   │   │   └── auth.routes.ts
│   │   ├── cart/              # Shopping cart feature
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── cart.routes.ts
│   │   └── products/          # Product catalog feature
│   │       ├── components/
│   │       ├── models/
│   │       ├── pages/
│   │       ├── services/
│   │       └── product.routes.ts
│   ├── shared/                # Shared components
│   │   ├── components/        # Reusable components
│   │   │   ├── header/
│   │   │   ├── no-data-found/
│   │   │   └── table/
│   │   ├── directives/         # Custom directives
│   │   ├── models/            # Shared interfaces
│   │   └── pipes/             # Custom pipes
│   ├── store/                 # NgRx store
│   │   └── cart/              # Cart state management
│   │       ├── cart.actions.ts
│   │       ├── cart.effects.ts
│   │       ├── cart.reducer.ts
│   │       ├── cart.selectors.ts
│   │       └── cart.state.ts
│   ├── app.config.ts          # App configuration
│   ├── app.routes.ts          # Route definitions
│   └── app.ts                 # Root component
├── environments/              # Environment configurations
├── styles.css                 # Global styles
└── main.ts                    # Application entry point
```

### Feature Module Structure

Each feature module follows this structure:

```
feature/
├── components/                # Feature-specific components
│   ├── component-name/
│   │   ├── component-name.ts
│   │   ├── component-name.html
│   │   ├── component-name.css
│   │   └── component-name.spec.ts
├── models/                    # Feature-specific interfaces
│   └── interfaces/
├── pages/                     # Page components
├── services/                  # Feature-specific services
├── feature.routes.ts          # Feature routing
└── feature.module.ts          # Feature module (if needed)
```

## 🎯 Development Workflow

### 1. Setting Up Development Environment

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Verify installation
ng version
```

### 2. Code Organization

#### Component Development

```typescript
// Component structure
@Component({
  selector: 'app-component-name',
  imports: [/* required modules */],
  templateUrl: './component-name.html',
  styleUrl: './component-name.css'
})
export class ComponentName {
  // Component logic
}
```

#### Service Development

```typescript
// Service structure
@Injectable({
  providedIn: 'root'
})
export class ServiceName {
  // Service logic
}
```

#### State Management

```typescript
// Actions
export const actionName = createAction(
  '[Feature] Action Description',
  props<{ payload: Type }>()
);

// Reducer
export const featureReducer = createReducer(
  initialState,
  on(actionName, (state, { payload }) => ({
    ...state,
    // state updates
  }))
);

// Effects
@Injectable()
export class FeatureEffects {
  effectName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionName),
      // effect logic
    )
  );
}
```

### 3. Testing Strategy

#### Unit Testing

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentName]
    });
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### Service Testing

```typescript
describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## 🛠️ Development Tools

### Code Quality

#### ESLint Configuration

```json
{
  "extends": ["@angular-eslint/recommended"],
  "rules": {
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": "app",
        "style": "camelCase"
      }
    ]
  }
}
```

#### Prettier Configuration

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

### Build Configuration

#### Development Build

```bash
npm run build
```

#### Production Build

```bash
npm run build --configuration production
```

#### Watch Mode

```bash
npm run watch
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage

#### Utility Classes

```html
<!-- Layout -->
<div class="flex items-center justify-between p-4">
  <h1 class="text-2xl font-bold">Title</h1>
  <button class="bg-blue-500 text-white px-4 py-2 rounded">Button</button>
</div>

<!-- Responsive Design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>
```

#### Custom Components

```css
/* Custom component styles */
.product-card {
  @apply bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow;
}

.product-card:hover {
  @apply transform scale-105;
}
```

### Angular Material Integration

```typescript
// Material module imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  // ...
})
```

## 🔧 Configuration Files

### Angular Configuration

#### `angular.json`

```json
{
  "projects": {
    "E-Commerce": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json"
          }
        }
      }
    }
  }
}
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"],
    "module": "ES2022",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Environment Configuration

#### `environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'E-Commerce App'
};
```

## 🚀 Deployment

### Build Process

1. **Development Build**
   ```bash
   npm run build
   ```

2. **Production Build**
   ```bash
   npm run build --configuration production
   ```

3. **Build Analysis**
   ```bash
   npm run build --stats-json
   npx webpack-bundle-analyzer dist/E-Commerce/browser/stats.json
   ```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Build optimization enabled
- [ ] Error tracking configured
- [ ] Performance monitoring setup
- [ ] Security headers configured

## 🐛 Debugging

### Development Tools

#### Angular DevTools

Install the Angular DevTools browser extension for:

- Component tree inspection
- State management debugging
- Performance profiling

#### NgRx DevTools

```typescript
// Store configuration with DevTools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
```

### Common Issues

#### Build Errors

1. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

2. **Dependency Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

#### Runtime Errors

1. **Module Not Found**
   - Check import paths
   - Verify module exports
   - Check Angular version compatibility

2. **State Management Issues**
   - Verify action dispatching
   - Check reducer logic
   - Inspect effects execution

## 📝 Code Standards

### Naming Conventions

- **Components**: PascalCase (`ProductCard`)
- **Services**: PascalCase with "Service" suffix (`CartService`)
- **Interfaces**: PascalCase (`Product`, `Cart`)
- **Files**: kebab-case (`product-card.ts`)
- **Selectors**: kebab-case (`app-product-card`)

### Code Organization

```typescript
// Component structure
@Component({
  selector: 'app-component',
  imports: [/* imports */],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class Component implements OnInit, OnDestroy {
  // Properties
  public property: Type;
  private privateProperty: Type;

  // Constructor
  constructor(private service: Service) {}

  // Lifecycle hooks
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  // Public methods
  public method(): void {}

  // Private methods
  private privateMethod(): void {}
}
```

### Documentation Standards

```typescript
/**
 * Service for managing shopping cart operations
 * 
 * @example
 * ```typescript
 * const cartService = inject(CartService);
 * cartService.addToCart(product);
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Adds a product to the shopping cart
   * 
   * @param product - The product to add
   * @param quantity - Optional quantity (default: 1)
   */
  addToCart(product: Product, quantity: number = 1): void {
    // Implementation
  }
}
```

## 🔄 Version Control

### Git Workflow

1. **Feature Branches**
   ```bash
   git checkout -b feature/new-feature
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Commit Messages**
   ```
   feat: add new feature
   fix: resolve bug
   docs: update documentation
   style: format code
   refactor: improve code structure
   test: add tests
   chore: update dependencies
   ```

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/**: New features
- **hotfix/**: Critical fixes

## 📊 Performance Optimization

### Bundle Optimization

1. **Lazy Loading**
   ```typescript
   {
     path: 'products',
     loadChildren: () => import('./feature/products/product.routes')
   }
   ```

2. **Tree Shaking**
   ```typescript
   // Import only what you need
   import { map } from 'rxjs/operators';
   ```

3. **OnPush Change Detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

### Memory Management

1. **Subscription Management**
   ```typescript
   private destroy$ = new Subject<void>();

   ngOnInit(): void {
     this.service.getData()
       .pipe(takeUntil(this.destroy$))
       .subscribe(data => {
         // Handle data
       });
   }

   ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
   }
   ```

2. **Component Cleanup**
   ```typescript
   ngOnDestroy(): void {
     // Clean up subscriptions
     // Remove event listeners
     // Clear timers
   }
   ```

---

This development guide provides comprehensive information for contributing to the E-Commerce application. Follow these guidelines to ensure code quality, consistency, and maintainability.
