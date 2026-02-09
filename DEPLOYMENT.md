# 🚀 Deployment Guide - Sanctuary Cove Booking App

This guide covers deploying your full-stack accommodation booking app to production using cost-friendly, easy-to-manage services.

---

## 📊 Recommended Architecture

```
📱 Frontend (React)
   └─> Vercel / Netlify (Free)

🔗 API (Express.js)
   └─> Railway / Render ($5-7/month)

🗄️ Database (MongoDB)
   └─> MongoDB Atlas (Free tier)

🌐 Domain & SSL
   └─> Auto-included with hosting
```

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid Tier | Recommendation |
|---------|-----------|-----------|-----------------|
| MongoDB Atlas | 512MB (Free) | $57+/month | Free tier for start |
| Vercel | Unlimited | $20+/month | Free (excellent for React) |
| Railway | $5 credit/month | $5-7/month actual | Best for Node.js backend |
| Total Monthly | ~$0 | ~$12-25 | Very affordable |

---

## 🔧 Pre-Deployment Checklist

- [ ] Test app locally: `npm run dev` (frontend & backend)
- [ ] Test all CRUD operations work
- [ ] Verify carousel, section management works
- [ ] Check responsive design on mobile
- [ ] Clear browser cache and test fresh load

---

## 📝 Step 1: Set Up MongoDB Atlas (Free Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Sign Up for Free"
3. Create account with email/password
4. Verify email

### 1.2 Create Cluster
1. Click "Create a Deployment"
2. Select **M0 Shared Cluster** (FREE)
3. Select cloud provider: **AWS** and region: **US-East-1** (closest to you)
4. Name cluster: `sanctuary-cove`
5. Click "Create Deployment"

### 1.3 Create Database User
1. In left sidebar, go to **Database Access**
2. Click **Add Database User**
3. Username: `sancove_user`
4. Password: Generate secure password (copy it!)
5. Click **Add User**

### 1.4 Allow Network Access
1. In left sidebar, go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow access from anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 1.5 Get Connection String
1. In left sidebar, go to **Databases**
2. Next to your cluster, click **Connect**
3. Select **Drivers**
4. Copy connection string starting with `mongodb+srv://...`
5. **Replace `<password>` with your user password**
6. **Save this string** - you'll need it for Railway/Render

Example format:
```
mongodb+srv://sancove_user:yourPassword@sanctuary-cove.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 🚀 Step 2: Deploy Backend (Railway - Recommended)

Railway is beginner-friendly, fast, and perfect for Node.js apps.

### 2.1 Prepare Backend for Production

Update `/backend/.env.production`:
```env
PORT=8000
NODE_ENV=production
MONGODB_URI=mongodb+srv://sancove_user:yourPassword@sanctuary-cove.xxxxx.mongodb.net/?retryWrites=true&w=majority
FRONTEND_URL=https://yourdomain.com
```

### 2.2 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **Sign Up**
3. Continue with GitHub (easier for deploying)
4. Authorize Railway to access GitHub

### 2.3 Create New Project
1. Click **Create New Project**
2. Select **GitHub Repo**
3. Click **Deploy from GitHub Repo**
4. Find your repo `Akhil/start-2026` and click **Select**

### 2.4 Configure Environment Variables
1. In Railway dashboard, click your project
2. Go to **Variables** tab
3. Add these variables:
   ```
   PORT: 8000
   NODE_ENV: production
   MONGODB_URI: (paste from Step 1.5)
   FRONTEND_URL: https://yourdomain.com
   ```
4. Click **Deploy** button

### 2.5 Get Backend URL
1. In Railway dashboard, select your **api** service
2. Click **Deployments** tab
3. Copy the **URL** (looks like `https://start-2026-production-xxx.up.railway.app`)
4. **Save this URL** - needed for frontend

> Railway gives you free $5/month credit. After that: ~$5-7/month actual cost

---

## 🌐 Step 3: Deploy Frontend (Vercel - Easiest)

Vercel is built specifically for React apps and auto-deploys on GitHub push.

### 3.1 Prepare Frontend

Create `/frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-railway-backend-url/api
```

### 3.2 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Use **GitHub** (connect your GitHub account)
4. Authorize Vercel

### 3.3 Import Project
1. Click **Add New → Project**
2. Select your GitHub repo
3. **Important:** Root directory should be `frontend`
4. In **Environment Variables**, add:
   ```
   REACT_APP_API_URL: (Backend URL from Step 2.5)
   ```

### 3.4 Deploy
1. Click **Deploy**
2. Wait 2-3 minutes for deployment
3. You'll get a FREE URL like `https://start-2026.vercel.app`

> Completely **FREE** for unlimited deployments!

---

## 🎯 Step 4: Connect Domain (Optional but Recommended)

### 4.1 Buy Domain
1. Go to [Namecheap.com](https://namecheap.com) or GoDaddy
2. Search for your desired domain (e.g., `sanctuarycove.com`)
3. Cost: ~$10-15/year
4. Complete purchase

### 4.2 Connect to Vercel
1. In Vercel dashboard, go to **Settings → Domains**
2. Click **Add Domain**
3. Enter your domain name
4. Vercel shows DNS records to add
5. Go to Namecheap, find **Manage DNS** for your domain
6. Add Vercel's nameservers (takes 24-48 hours to propagate)

### 4.3 Connect to Railway (Optional)
1. If you want `api.yourdomain.com` instead of random URL:
2. In Railway, go to **Settings → Domains**
3. Add your domain subdomain

---

## ✅ Step 5: Post-Deployment Testing

### 5.1 Test Frontend
1. Visit your Vercel URL
2. Test these features:
   - [ ] Page loads without errors
   - [ ] Navigation menu works
   - [ ] Try to go to `/admin` page
   - [ ] Check browser console (F12) for errors

### 5.2 Test Backend
1. Visit `https://your-backend-url/api/health`
2. Should see: `{"success":true,"message":"Server is running"}`

### 5.3 Test Full Integration
1. In admin dashboard, test:
   - [ ] Site configuration saves (Home tab)
   - [ ] Section visibility toggles work
   - [ ] Try adding carousel item
   - [ ] Refresh button works
   - [ ] Success notifications appear

### 5.4 Check Database
1. In MongoDB Atlas, go to **Collections**
2. Should see your collections created automatically
3. Data persists after refresh

---

## 🔄 Updating Your App (After Initial Deployment)

### Automatic Updates with Vercel:
1. Make changes to `/frontend` files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Vercel automatically redeploys (2-3 minutes)

### Updating Backend on Railway:
1. Make changes to `/backend` files
2. Commit and push to GitHub (same commands above)
3. Railway automatically rebuilds and deploys

---

## 🐛 Troubleshooting

### Frontend shows blank page
- Check browser console (F12 → Console tab)
- Verify `REACT_APP_API_URL` environment variable is set
- Clear cache: Ctrl+Shift+Delete

### Backend API returns 404 errors
- Check Railway environment variables (MONGODB_URI specifically)
- Visit backend health check URL
- Check Railway logs: Dashboard → Deployments → View Logs

### CORS errors (frontend can't reach backend)
- Verify `FRONTEND_URL` is set in Railway
- Update `/backend/server.js` CORS origin if needed:
  ```javascript
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }));
  ```

### Database connection fails
- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- Test with MongoDB Compass local connection

---

## 📱 Going Live Checklist

- [ ] Custom domain connected
- [ ] Admin dashboard working
- [ ] All CRUD operations tested
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active (auto with Vercel/Railway)
- [ ] Backups configured (MongoDB Atlas auto-backups free tier)
- [ ] Monitoring set up (Railway has free error tracking)

---

## 💡 Pro Tips

1. **Free SSL Certificate**: Both Vercel and Railway provide free HTTPS
2. **Auto-scaling**: Railway scales automatically on demand
3. **Monitoring**: Check Railway dashboard for CPU/Memory usage
4. **Database Backup**: MongoDB Atlas auto-backs up on free tier
5. **Custom Email**: Set up admin email notifications for bookings

---

## 🆘 Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [railway.app/docs](https://railway.app/docs)
- **MongoDB Docs**: [docs.mongodb.com](https://docs.mongodb.com)
- **Error Messages**: Always check browser console + server logs

---

## 📞 Support & Next Steps

After deployment, consider:
1. **Email Notifications**: Set up SMTP for booking confirmations
2. **Payment Gateway**: Integrate Stripe for bookings
3. **Analytics**: Add Google Analytics
4. **Monitoring**: Set up Sentry for error tracking
5. **CDN**: Add Cloudflare for faster image loading

---

**Your app is now LIVE! 🎉**

Estimated Setup Time: 30-45 minutes
Estimated Monthly Cost: $0-20 (very affordable!)
