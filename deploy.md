# GitHub Pages Deployment Guide

## Prerequisites

1. Your portfolio code should be in a GitHub repository
2. GitHub Pages should be enabled for your repository
3. Your GitHub token should be added as a repository secret

## Setup Steps

### 1. Create GitHub Repository
```bash
# Initialize git if not already done
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/RajMandal17/portfolio.git

# Add all files and commit
git add .
git commit -m "Initial portfolio commit"

# Push to GitHub
git push -u origin main
```

### 2. Configure GitHub Repository Settings

1. Go to your repository on GitHub: `https://github.com/RajMandal17/portfolio`
2. Go to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 3. Add GitHub Token as Secret

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_GITHUB_TOKEN`
4. Value: Your GitHub personal access token (the same one you're using locally)

### 4. Deploy

Once you push your code to the `main` branch, the GitHub Actions workflow will automatically:

1. Build your React application
2. Deploy it to GitHub Pages
3. Your site will be available at: `https://rajmandal17.github.io/portfolio/`

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build for GitHub Pages
npx vite build --base="/portfolio/" --config vite.config.production.ts

# Install gh-pages globally if needed
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist/public
```

## Important Notes

- Your site will be available at: `https://rajmandal17.github.io/portfolio/`
- The GitHub API calls work directly from the browser, so no backend is needed
- All your real GitHub data (repositories, contributions) will load dynamically
- The site will automatically update when you push changes to the main branch

## Troubleshooting

- Ensure your repository is public or you have GitHub Pages enabled for private repos
- Check that the VITE_GITHUB_TOKEN secret is properly set
- Verify the base path is correctly configured as "/portfolio/"