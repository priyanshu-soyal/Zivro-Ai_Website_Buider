# Deployment Guide - Fixing Login/Signup Issues

## Common Issues After Deployment

The login/signup problems you're experiencing are likely due to one or more of these issues:

1. **Missing Environment Variables**
2. **Incorrect CORS Configuration**
3. **Cookie Settings (HTTPS Required)**
4. **Wrong Base URLs**

## Step-by-Step Fix

### 1. Server Environment Variables

Make sure your server has these environment variables set:

```env
NODE_ENV=production
PORT=3000

# Your PostgreSQL database URL
DATABASE_URL=postgresql://user:password@host:5432/database

# IMPORTANT: This should be your deployed SERVER URL
BETTER_AUTH_URL=https://your-backend-domain.com

# Generate a secure secret (use: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_secure_secret_key_minimum_32_characters

# IMPORTANT: Add your deployed FRONTEND URL(s)
TRUSTED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### 2. Client Environment Variables

Make sure your client has this environment variable set:

```env
# IMPORTANT: This should point to your deployed SERVER URL
VITE_BASEURL=https://your-backend-domain.com
```

### 3. HTTPS Requirements

When `NODE_ENV=production`, the app sets cookies with `secure: true` and `sameSite: "none"`. This means:

- ✅ **Both frontend and backend MUST use HTTPS**
- ❌ HTTP will NOT work in production
- ✅ Make sure your deployment platform has SSL/TLS certificates

### 4. Common Deployment Platforms

#### Vercel (Frontend)

1. Go to your project settings → Environment Variables
2. Add: `VITE_BASEURL` with your backend URL
3. Redeploy

#### Vercel (Backend) / Railway / Render

1. Go to your project settings → Environment Variables
2. Add all server environment variables listed above
3. Make sure `TRUSTED_ORIGINS` includes your frontend URL
4. Redeploy

#### Netlify (Frontend)

1. Go to Site settings → Build & deploy → Environment
2. Add: `VITE_BASEURL` with your backend URL
3. Redeploy

### 5. Troubleshooting Checklist

- [ ] Server has `BETTER_AUTH_URL` set to the deployed server URL
- [ ] Server has `BETTER_AUTH_SECRET` set (minimum 32 characters)
- [ ] Server has `TRUSTED_ORIGINS` with the frontend URL(s)
- [ ] Server has `NODE_ENV=production`
- [ ] Client has `VITE_BASEURL` set to the deployed server URL
- [ ] Both frontend and backend are using HTTPS
- [ ] Database is accessible from the server
- [ ] Server is running and accessible

### 6. Testing

After setting environment variables:

1. Check browser console for errors
2. Check Network tab for failed requests
3. Look for CORS errors (means `TRUSTED_ORIGINS` is wrong)
4. Look for 401/403 errors (means authentication isn't working)

### 7. Quick Test

Open browser console on your deployed frontend and run:

```javascript
console.log(import.meta.env.VITE_BASEURL);
// Should show your backend URL
```

### 8. Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Not allowed by CORS" | Frontend URL not in TRUSTED_ORIGINS | Add frontend URL to TRUSTED_ORIGINS |
| "Network Error" | Wrong VITE_BASEURL | Check VITE_BASEURL points to backend |
| Cookie not set | Not using HTTPS in production | Enable HTTPS on both frontend and backend |
| 404 on /api/auth/* | Wrong BETTER_AUTH_URL | Set BETTER_AUTH_URL to deployed server URL |

## Example Production Setup

### Frontend (e.g., deployed to Vercel)
- URL: `https://myapp.vercel.app`
- Environment: `VITE_BASEURL=https://myapp-api.railway.app`

### Backend (e.g., deployed to Railway)
- URL: `https://myapp-api.railway.app`
- Environment:
  ```
  NODE_ENV=production
  BETTER_AUTH_URL=https://myapp-api.railway.app
  BETTER_AUTH_SECRET=abc123...
  TRUSTED_ORIGINS=https://myapp.vercel.app
  DATABASE_URL=postgresql://...
  ```

## Need More Help?

If issues persist:
1. Check server logs for errors
2. Check browser console and Network tab
3. Verify all environment variables are set correctly
4. Ensure SSL certificates are valid
