# Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying the E-Commerce application to various platforms and environments.

## 📋 Prerequisites

### Required Tools

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Angular CLI** (v20 or higher)
- **Git**

### Platform-Specific Requirements

- **Vercel**: Vercel CLI
- **Netlify**: Netlify CLI
- **AWS**: AWS CLI
- **Docker**: Docker Desktop

## 🏗️ Build Configuration

### Production Build

```bash
# Create production build
npm run build --configuration production

# Build with specific environment
npm run build --configuration production --environment=prod
```

### Build Optimization

The production build includes:

- **Tree Shaking**: Removes unused code
- **Minification**: Compresses JavaScript and CSS
- **Bundle Splitting**: Optimizes loading performance
- **Source Maps**: Disabled for production
- **AOT Compilation**: Ahead-of-time compilation

### Build Output

```
dist/E-Commerce/
├── browser/
│   ├── index.html
│   ├── main-[hash].js
│   ├── styles-[hash].css
│   └── assets/
└── prerendered-routes.json
```

## 🌐 Deployment Platforms

### Vercel Deployment

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Configure Vercel

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/E-Commerce/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 3. Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### 4. Environment Variables

Set in Vercel dashboard:

```
NODE_ENV=production
API_URL=https://api.example.com
```

### Netlify Deployment

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Configure Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist/E-Commerce/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### 3. Deploy

```bash
# Login to Netlify
netlify login

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

### AWS S3 + CloudFront

#### 1. Build and Upload

```bash
# Build for production
npm run build --configuration production

# Upload to S3
aws s3 sync dist/E-Commerce/browser s3://your-bucket-name --delete
```

#### 2. CloudFront Configuration

```json
{
  "Origins": {
    "DomainName": "your-bucket-name.s3.amazonaws.com",
    "Id": "S3-your-bucket-name"
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-bucket-name",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true
  }
}
```

### Docker Deployment

#### 1. Create Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build --configuration production

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist/E-Commerce/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Create nginx.conf

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }

    location /api {
      proxy_pass http://backend:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

#### 3. Build and Run

```bash
# Build Docker image
docker build -t e-commerce-app .

# Run container
docker run -p 80:80 e-commerce-app
```

## 🔧 Environment Configuration

### Environment Files

#### `environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  appName: 'E-Commerce App',
  version: '1.0.0',
  analytics: {
    trackingId: 'GA_TRACKING_ID'
  }
};
```

#### `environments/environment.staging.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.yourdomain.com',
  appName: 'E-Commerce App (Staging)',
  version: '1.0.0-beta',
  debug: true
};
```

### Build Scripts

#### `package.json`

```json
{
  "scripts": {
    "build:prod": "ng build --configuration production",
    "build:staging": "ng build --configuration staging",
    "build:analyze": "ng build --configuration production --stats-json",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod"
  }
}
```

## 🔒 Security Configuration

### HTTPS Configuration

#### SSL/TLS Setup

```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;
  
  ssl_certificate /path/to/certificate.crt;
  ssl_certificate_key /path/to/private.key;
  
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
  ssl_prefer_server_ciphers off;
}
```

### Security Headers

#### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;">
```

#### Security Headers (nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Generate bundle analysis
npm run build:analyze

# Analyze with webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/E-Commerce/browser/stats.json
```

### Performance Monitoring

#### Core Web Vitals

```typescript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Caching Strategy

#### Service Worker

```typescript
// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]
      }
    }
  ]
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

#### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --watch=false --browsers=ChromeHeadless
    
    - name: Build application
      run: npm run build:prod
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

### GitLab CI

#### `.gitlab-ci.yml`

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run build:prod
  artifacts:
    paths:
      - dist/

test:
  stage: test
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm test -- --watch=false --browsers=ChromeHeadless

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache aws-cli
    - aws s3 sync dist/E-Commerce/browser s3://$S3_BUCKET --delete
  only:
    - main
```

## 📈 Monitoring & Analytics

### Application Monitoring

#### Error Tracking

```typescript
// Error tracking service
@Injectable()
export class ErrorTrackingService {
  trackError(error: Error, context?: any): void {
    // Send to error tracking service
    console.error('Application Error:', error, context);
  }
}
```

#### Performance Monitoring

```typescript
// Performance service
@Injectable()
export class PerformanceService {
  trackPageView(page: string): void {
    // Track page views
    console.log('Page View:', page);
  }
  
  trackUserAction(action: string, data?: any): void {
    // Track user actions
    console.log('User Action:', action, data);
  }
}
```

### Health Checks

#### Health Check Endpoint

```typescript
// Health check service
@Injectable()
export class HealthCheckService {
  checkHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>('/api/health');
  }
}
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### 1. Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build:prod
```

#### 2. Routing Issues

```typescript
// Ensure proper routing configuration
const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];
```

#### 3. Environment Variables

```bash
# Check environment variables
echo $NODE_ENV
echo $API_URL
```

### Debugging Production Issues

#### 1. Enable Debug Mode

```typescript
// Enable debug logging
if (!environment.production) {
  console.log('Debug mode enabled');
}
```

#### 2. Source Maps

```typescript
// Enable source maps for debugging
"sourceMap": true
```

#### 3. Error Boundaries

```typescript
// Global error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
    // Send to error tracking service
  }
}
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables configured
- [ ] Security headers configured
- [ ] SSL certificates valid
- [ ] Performance optimization applied

### Post-Deployment

- [ ] Application accessible
- [ ] All routes working
- [ ] API endpoints responding
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Analytics tracking working

### Rollback Plan

1. **Immediate Rollback**
   ```bash
   # Revert to previous version
   git revert HEAD
   npm run deploy:prod
   ```

2. **Database Rollback**
   ```bash
   # Restore database backup
   # Update API endpoints
   ```

3. **Configuration Rollback**
   ```bash
   # Revert environment variables
   # Update configuration files
   ```

---

This deployment guide provides comprehensive instructions for deploying the E-Commerce application across various platforms and environments. Follow these guidelines to ensure successful deployments and optimal performance.
