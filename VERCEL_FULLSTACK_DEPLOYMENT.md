# 🚀 Vercel Full-Stack Deployment Guide

Deploy **both frontend and backend** from the same Vercel account (single repository).

---

## 📋 Overview

Your app structure is perfect for this:

```
start-2026/  (Single GitHub repo)
├── frontend/          ← React app
├── backend/           ← Express.js API
├── images/            ← Shared assets
├── vercel.json        ← NEW: Vercel configuration
└── .vercelignore      ← NEW: Ignore files
```

**How it works:**
```
Push to GitHub
    ↓
Vercel builds BOTH:
  • Frontend → React build (static files)
  • Backend → Node.js server
    ↓
Single Vercel deployment
  • Frontend served as static
  • Backend handles /api routes
```

---

## ✅ Pre-Deployment Checklist

- [ ] Latest code committed to GitHub
- [ ] Backend routes work locally
- [ ] Frontend builds: `cd frontend && npm run build`
- [ ] No TypeScript errors
- [ ] `.env` files NOT committed (only `.env.example`)
- [ ] MongoDB connection string ready

---

## 🔧 Step 1: Update Environment Variables

### Create Production Environment File

Create `.env.production.local` in project root (NOT committed):

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Node Environment
NODE_ENV=production
```

**⚠️ DO NOT commit this file! It's in `.gitignore`**

---

## 🔐 Step 2: MongoDB Atlas Setup (If not done)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free M0 cluster
3. Create database user: `sancove_user`
4. Allow network access from anywhere (0.0.0.0/0)
5. Get connection string:
   ```
   mongodb+srv://sancove_user:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 📤 Step 3: Push to GitHub

Commit all changes:

```bash
git add .
git commit -m "Setup Vercel full-stack deployment"
git push origin main
```

---

## 🌐 Step 4: Deploy on Vercel

### 4.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with **GitHub**
3. Authorize Vercel to access your repositories

### 4.2 Import Project

1. Click **Add New → Project**
2. Select your GitHub repository (`start-2026`)
3. **Root Directory**: Leave blank (Vercel will detect monorepo)
4. Click **Continue**

### 4.3 Environment Variables

Add these in Vercel project settings:

1. Click **Settings → Environment Variables**
2. Add new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://sancove_user:PASSWORD@******.mongodb.net/?retryWrites=true&w=majority`
   - **Environments**: Check `Production`

3. Add another (optional but recommended):
   - **Name**: `NODE_ENV`
   - **Value**: `production`

4. Save variables

### 4.4 Deploy

1. Click **Deploy** button
2. Wait 3-5 minutes for build to complete
3. You'll get a URL like: `https://start-2026.vercel.app`

---

## ✅ Step 5: Testing

### Test Frontend
- [ ] Visit your Vercel URL: `https://yourapp.vercel.app`
- [ ] Check home page loads
- [ ] Check admin page: `/admin`
- [ ] Navigation works

### Test Backend Health Check
- [ ] Visit: `https://yourapp.vercel.app/api/health`
- [ ] Should return: `{"success":true,"message":"Server is running"}`

### Test API Connection
1. Go to admin dashboard: `/admin`
2. Go to **Home** tab
3. Change **Site Name** to something new
4. Click **Save Config**
5. Should see success message
6. Refresh page - change should persist

### Test Database
- [ ] MongoDB Atlas → Databases → Collections
- [ ] Should see data was saved
- [ ] Try adding carousel item
- [ ] Verify in MongoDB Collections

---

## 🔄 Updating Your App

### Making Changes

```bash
# 1. Make changes in frontend/ or backend/
# 2. Test locally
npm run dev  # in different terminals for each

# 3. Commit
git add .
git commit -m "Description of changes"
git push origin main
```

### Auto-Deployment

**Vercel automatically redeploys on every push!**

- Vercel detects changes
- Runs build (2-3 minutes)
- Deploys both frontend & backend
- Live immediately

**No manual steps needed!**

---

## 🎯 What Gets Built

Vercel's `vercel.json` configuration:

```
$ npm run build        (in frontend/)
    ↓
frontend/build/        ← Created (React static files)
    ↓
Backend server.js      ← Runs as Node.js
    ↓
All routes served:
  • https://yourapp.vercel.app/          → frontend/build/index.html
  • https://yourapp.vercel.app/admin     → frontend/build/index.html (SPA routing)
  • https://yourapp.vercel.app/api/...   → backend/server.js (API)
  • https://yourapp.vercel.app/images/   → backend/server.js (static)
```

---

## 🚨 Troubleshooting

### Build Failed
**Check logs:**
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. Scroll to build output
4. Look for error messages

**Common issues:**
- ❌ `MONGODB_URI not defined` → Add environment variable in Vercel
- ❌ `npm ERR!` → Missing dependency in package.json
- ❌ `React build failed` → Check for TypeScript errors locally first

### Frontend shows blank page
- [ ] Open browser console (F12)
- [ ] Look for JavaScript errors
- [ ] Check that API URL is `/api` (not hardcoded localhost)
- [ ] Hard refresh: Ctrl+Shift+Delete

### API 404 errors
- [ ] Check Vercel logs for backend errors
- [ ] Verify MongoDB connection string
- [ ] Try health check endpoint: `/api/health`

### Cannot connect to database
- [ ] Verify `MONGODB_URI` in Vercel environment variables
- [ ] Test connection string locally first
- [ ] Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- [ ] Check password doesn't have special characters that need encoding

---

## 🌍 Custom Domain (Optional)

### 1. Buy Domain
- Namecheap: $10-15/year
- GoDaddy: $12-18/year

### 2. Connect to Vercel
1. Vercel Dashboard → Settings → Domains
2. Click **Add Domain**
3. Enter your domain
4. Update nameservers in your domain registrar:
   - Vercel shows the exact nameservers
   - Go to your domain provider's DNS settings
   - Replace with Vercel's nameservers
5. Wait 24-48 hours for propagation

### 3. SSL Certificate
- ✅ FREE - Vercel provides automatic HTTPS

---

## 📊 Monitoring

### View Deployment History
- Vercel Dashboard → Deployments
- See all builds and deployments
- Click any deployment to see logs

### Check Usage
- Vercel Dashboard → Settings → Billing
- Free tier includes plenty for small apps

### Monitor API Performance
- Check backend logs: Deployments → View Logs
- Look for slow operations
- Monitor MongoDB usage in Atlas

---

## 💡 Pro Tips

1. **Preview Deployments**: Each GitHub pull request gets a preview URL
2. **Rollback**: One-click rollback to previous deployment
3. **Analytics**: Enable Vercel analytics in Settings
4. **Email Alerts**: Get notified of deployment failures
5. **Performance**: Vercel automatically optimizes your React build

---

## 🔄 Deployment Flow Diagram

```
┌─────────────────────────────┐
│   Your Local Machine        │
│  (Make changes in code)     │
└──────────────┬──────────────┘
               │
        git push origin main
               │
               ↓
┌─────────────────────────────┐
│   GitHub Repository         │
│  (start-2026)               │
└──────────────┬──────────────┘
               │
         Webhook trigger
               │
               ↓
┌─────────────────────────────┐
│   Vercel Build Server       │
├─────────────────────────────┤
│ • Build frontend (React)    │
│ • Build backend (Node.js)   │
│ • Run tests                 │
└──────────────┬──────────────┘
               │
               ↓
        ✅ Deployment Success
               │
               ↓
┌─────────────────────────────┐
│   Vercel Live Server        │
│  yourapp.vercel.app         │
├─────────────────────────────┤
│ React Frontend + Express API│
│ MongoDB Atlas (Database)    │
└─────────────────────────────┘
```

---

## 📝 Environment Variables Explained

| Variable | Where from | Why needed |
|----------|-----------|-----------|
| `MONGODB_URI` | MongoDB Atlas | Connect to database |
| `NODE_ENV` | Any value | Tells Express it's production |

---

## ✨ You're Now on Vercel!

**Congratulations!** Your app is live on Vercel with:

- ✅ React frontend (auto-optimized)
- ✅ Express backend (auto-scaled)
- ✅ MongoDB database
- ✅ Free SSL certificate
- ✅ Auto-updated on every git push
- ✅ Professional deployment

---

## 🆘 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Check Deployment Logs**: Vercel Dashboard → Deployments → View Logs
- **Test API locally** before pushing to GitHub
- **Common Issues**: See Troubleshooting section above

---

**Next: Set up a custom domain, add analytics, and start building!**
