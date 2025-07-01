# Deployment Guide

This document provides comprehensive instructions for deploying the University Admission Calculator to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:

* Completed local development and testing
* Built the application successfully using `npm run build`
* Verified all university calculators function correctly
* Tested responsive design across different devices
* Confirmed SEO optimizations are working properly

## Build Process

### Production Build

Create an optimized production build:

```bash
npm run build
```

This generates a `dist` directory containing:
* Minified and compressed JavaScript bundles
* Optimized CSS files
* Static assets and images
* HTML files with proper meta tags
* Sitemap and robots.txt files

### Build Verification

After building, verify the output:

```bash
npm run preview
```

This serves the production build locally for final testing before deployment.

## Deployment Platforms

### Vercel (Recommended)

Vercel provides excellent support for React applications with automatic deployments.

#### Automatic Deployment

1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import your repository in the Vercel dashboard
4. Configure build settings:
   * Build Command: `npm run build`
   * Output Directory: `dist`
   * Install Command: `npm install`

#### Manual Deployment

```bash
npm install -g vercel
vercel --prod
```

#### Environment Configuration

Set environment variables in Vercel dashboard if needed:
* `NODE_ENV=production`
* Custom domain configuration
* Analytics tracking codes

### Netlify

Netlify offers robust static site hosting with continuous deployment.

#### Automatic Deployment

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   * Build command: `npm run build`
   * Publish directory: `dist`
   * Node version: 16 or higher

#### Manual Deployment

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Netlify Configuration

Create `netlify.toml` for advanced configuration:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "16"
```

### GitHub Pages

Deploy directly from your GitHub repository.

#### Setup Process

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add deployment script to `package.json`:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy the application:
```bash
npm run build
npm run deploy
```

#### GitHub Pages Configuration

* Enable GitHub Pages in repository settings
* Set source to gh-pages branch
* Configure custom domain if needed
* Update base URL in vite.config.ts for subdirectory deployment

### Traditional Web Hosting

For shared hosting or VPS deployment:

#### File Upload Method

1. Create production build locally
2. Upload `dist` folder contents to web server
3. Configure web server for single-page application routing
4. Set up SSL certificate for HTTPS

#### Server Configuration

**Apache (.htaccess)**:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Domain Configuration

### Custom Domain Setup

1. Purchase domain from registrar
2. Configure DNS settings:
   * A record pointing to hosting provider IP
   * CNAME record for www subdomain
   * MX records for email if needed

### SSL Certificate

Ensure HTTPS is enabled:
* Use hosting provider's SSL service
* Configure Let's Encrypt for free certificates
* Set up automatic certificate renewal

## SEO Deployment Checklist

### Pre-Deployment

* Verify all meta tags are properly configured
* Test structured data using Google's Rich Results Test
* Confirm sitemap.xml is accessible
* Check robots.txt configuration
* Validate canonical URLs are working

### Post-Deployment

* Submit sitemap to Google Search Console
* Set up Google Analytics 4 tracking
* Configure Search Console property
* Test page loading speeds with Google PageSpeed Insights
* Verify mobile-friendliness with Google's Mobile-Friendly Test

## Performance Optimization

### Content Delivery Network (CDN)

Configure CDN for static assets:
* Use hosting provider's built-in CDN
* Set up Cloudflare for additional performance
* Configure proper cache headers
* Enable compression (gzip/brotli)

### Monitoring Setup

Implement monitoring for production:
* Set up uptime monitoring
* Configure error tracking (Sentry, LogRocket)
* Monitor Core Web Vitals
* Track user analytics and behavior

## Environment-Specific Configuration

### Production Environment Variables

Set appropriate environment variables:
```bash
NODE_ENV=production
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Feature Flags

Configure feature toggles for production:
* Enable/disable specific university calculators
* A/B testing configurations
* Maintenance mode settings

## Backup and Recovery

### Automated Backups

Set up regular backups:
* Source code is backed up via Git repository
* Configure hosting provider backup schedules
* Export and backup any dynamic data

### Disaster Recovery Plan

Prepare for potential issues:
* Document rollback procedures
* Maintain staging environment for testing
* Keep deployment scripts and configurations version controlled

## Continuous Integration/Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## Security Considerations

### HTTPS Configuration

* Enforce HTTPS for all connections
* Configure HSTS headers
* Set up proper CSP headers
* Enable secure cookie settings

### Access Control

* Limit administrative access
* Use strong authentication methods
* Regular security updates and patches
* Monitor for suspicious activity

## Troubleshooting

### Common Deployment Issues

**Build Failures**:
* Check Node.js version compatibility
* Verify all dependencies are installed
* Review build logs for error details

**Routing Issues**:
* Configure proper server redirects for SPA
* Check base URL configuration
* Verify all routes are accessible

**Performance Problems**:
* Analyze bundle sizes with webpack-bundle-analyzer
* Optimize images and static assets
* Review and optimize JavaScript chunks

### Support Resources

* Check hosting provider documentation
* Review deployment logs and error messages
* Consult community forums and Stack Overflow
* Contact hosting provider support if needed

## Post-Deployment Maintenance

### Regular Updates

* Monitor for security vulnerabilities
* Update dependencies regularly
* Review and optimize performance metrics
* Backup configurations and data

### User Feedback Integration

* Monitor user reports and feedback
* Track calculator accuracy and usage
* Update university formulas as needed
* Continuous improvement based on user needs

This deployment guide ensures your University Admission Calculator is properly configured for production use with optimal performance, security, and user experience. 