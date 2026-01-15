# Deployment Configuration Guide

This project supports two deployment modes:

## 1. Custom Domain Deployment (Current)

Site hosted at: **www.genai-prototyping.fun**

### Configuration

Set environment variable:
```bash
NEXT_PUBLIC_CUSTOM_DOMAIN=true
```

### How it works
- Site serves from domain root (`/`)
- No `basePath` or `assetPrefix`
- CNAME file automatically added to deployment
- Assets load from `/papers/...`, `/images/...`

### Local Development
```bash
# Copy .env.example to .env (already configured for custom domain)
cp .env.example .env

# Start dev server
pnpm run dev
```

### GitHub Actions
Already configured in `.github/workflows/deploy.yml`:
```yaml
env:
  NEXT_PUBLIC_CUSTOM_DOMAIN: 'true'
```

---

## 2. GitHub Pages Subdirectory Deployment

Site hosted at: **kikispace.github.io/chi-meetup-site/**

### Configuration

Set environment variable:
```bash
NEXT_PUBLIC_CUSTOM_DOMAIN=false
```

Or comment it out / leave unset.

### How it works
- Site serves from `/chi-meetup-site/`
- Uses `basePath` and `assetPrefix`
- No CNAME file needed
- Assets load from `/chi-meetup-site/papers/...`, etc.

### Local Development
```bash
# Edit .env
NEXT_PUBLIC_CUSTOM_DOMAIN=false

# Start dev server
pnpm run dev
# Note: Dev server always runs at http://localhost:3000 (no basePath)
```

### GitHub Actions
Edit `.github/workflows/deploy.yml`:
```yaml
env:
  NODE_ENV: production
  NEXT_PUBLIC_CUSTOM_DOMAIN: 'false'  # Change this line
```

And comment out or remove the CNAME step:
```yaml
# - name: Add CNAME file for custom domain
#   if: env.NEXT_PUBLIC_CUSTOM_DOMAIN == 'true'
#   run: echo "www.genai-prototyping.fun" > out/CNAME
```

---

## Switching Between Modes

### To switch from Custom Domain to Subdirectory:

1. **Update `.env`**:
   ```bash
   NEXT_PUBLIC_CUSTOM_DOMAIN=false
   ```

2. **Update `.github/workflows/deploy.yml`**:
   ```yaml
   NEXT_PUBLIC_CUSTOM_DOMAIN: 'false'
   ```

3. **Remove CNAME** (optional):
   - Delete `/CNAME` file from repo root
   - Or comment out CNAME step in workflow

4. **Update GitHub Pages Settings**:
   - Go to repo Settings → Pages
   - Remove custom domain
   - Source should still be "GitHub Actions"

5. **Rebuild and deploy**:
   ```bash
   pnpm run build
   git add .
   git commit -m "Switch to subdirectory deployment"
   git push
   ```

### To switch from Subdirectory to Custom Domain:

1. **Update `.env`**:
   ```bash
   NEXT_PUBLIC_CUSTOM_DOMAIN=true
   ```

2. **Update `.github/workflows/deploy.yml`**:
   ```yaml
   NEXT_PUBLIC_CUSTOM_DOMAIN: 'true'
   ```

3. **Add CNAME file** (if not present):
   - Create `/CNAME` with your domain
   - Ensure CNAME step is uncommented in workflow

4. **Configure DNS** (at your domain registrar):
   ```
   Type    Name    Value                    TTL
   ------------------------------------------------
   CNAME   www     kikispace.github.io.     3600
   ```

5. **Update GitHub Pages Settings**:
   - Go to repo Settings → Pages
   - Custom domain: `www.genai-prototyping.fun`
   - Enforce HTTPS (after DNS validates)

6. **Rebuild and deploy**:
   ```bash
   pnpm run build
   git add .
   git commit -m "Switch to custom domain deployment"
   git push
   ```

---

## Testing Your Build Locally

### Test with subdirectory basePath:
```bash
NEXT_PUBLIC_CUSTOM_DOMAIN=false pnpm run build
npx serve out
# Visit: http://localhost:3000/chi-meetup-site/
```

### Test with custom domain (no basePath):
```bash
NEXT_PUBLIC_CUSTOM_DOMAIN=true pnpm run build
npx serve out
# Visit: http://localhost:3000/
```

---

## Files Modified for Dual-Mode Support

1. **`next.config.ts`** - Reads `NEXT_PUBLIC_CUSTOM_DOMAIN` env variable
2. **`src/lib/constants.ts`** - Asset URL helper respects basePath
3. **`.env.example`** - Documents environment variable options
4. **`.github/workflows/deploy.yml`** - Sets deployment mode
5. **`DEPLOYMENT.md`** - This documentation file

---

## Troubleshooting

### Assets not loading?
- Check browser console for 404 errors
- Verify `NEXT_PUBLIC_CUSTOM_DOMAIN` matches your deployment mode
- Rebuild: `pnpm run build`

### Wrong basePath in build output?
```bash
# Check what basePath was used:
grep -r "chi-meetup-site" out/ | head -5

# If found and you want custom domain:
NEXT_PUBLIC_CUSTOM_DOMAIN=true pnpm run build

# If not found and you want subdirectory:
NEXT_PUBLIC_CUSTOM_DOMAIN=false pnpm run build
```

### GitHub Pages not using custom domain?
1. Verify CNAME file is in repo root
2. Check GitHub Settings → Pages → Custom domain
3. Wait 10-30 minutes for DNS propagation
4. Verify DNS records at domain registrar
