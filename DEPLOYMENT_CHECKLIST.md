# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

---

## 🔧 Pre-Deployment (Local Testing)

- [ ] Run backend: `cd backend && npm run dev`
- [ ] Run frontend: `cd frontend && npm start`
- [ ] Test home page loads
- [ ] Test admin dashboard at `/admin`
- [ ] Test carousel add/edit/delete
- [ ] Test section management
- [ ] Test branding changes (site name, icon)
- [ ] Test responsive design on mobile
- [ ] Clear browser cache
- [ ] Git commit initial version: `git add . && git commit -m "Ready for deployment"`

---

## 📦 MongoDB Atlas Setup

### Create Cluster
- [ ] Sign up at mongodb.com/cloud/atlas
- [ ] Create M0 Shared Cluster (FREE)
- [ ] Name: `sanctuary-cove`
- [ ] Region: US-East-1

### Create Database User
- [ ] Go to Database Access
- [ ] Add New User: `sancove_user`
- [ ] Generate strong password
- [ ] **Copy and save password securely**

### Network Access
- [ ] Go to Network Access
- [ ] Add IP Address: `0.0.0.0/0` (Allow from anywhere)

### Get Connection String
- [ ] Go to Databases → Connect
- [ ] Select Drivers → Node.js
- [ ] Copy connection string
- [ ] Replace `<password>` with your password
- [ ] **Save this string** - you'll use it in Railway

Connection string saved:
```
mongodb+srv://sancove_user:_______@____________.mongodb.net/?retryWrites=true&w=majority
```

---

## 🚀 Railway Backend Deployment

### Setup
- [ ] Create Railway account (sign up with GitHub)
- [ ] Create new Railway project

### Environment Variables
In Railway dashboard, add these variables:
- [ ] `MONGODB_URI` = [your MongoDB connection string from above]
- [ ] `PORT` = `8000`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = [will update after Vercel deploy]

### Deploy
- [ ] Link your GitHub repository
- [ ] Select `/start-2026` as root directory
- [ ] Select `/backend` as service directory
- [ ] Click Deploy
- [ ] Wait 2-5 minutes for deployment

### Get Backend URL
- [ ] In Railway dashboard, go to Deployments
- [ ] Click the successful deployment
- [ ] Copy the URL (looks like `https://start-2026-prod-xxx.up.railway.app`)
- [ ] **Save this URL for Vercel setup**

Backend URL:
```
https://______________________.railway.app
```

---

## 🌐 Vercel Frontend Deployment

### Setup
- [ ] Create Vercel account (sign up with GitHub)
- [ ] Click "Add New → Project"
- [ ] Select your GitHub repository

### Configuration
- [ ] Set root directory to `frontend`
- [ ] Add Environment Variable:
  - Name: `REACT_APP_API_URL`
  - Value: `[Your Railway Backend URL]/api`
  - Example: `https://start-2026-prod-xxx.railway.app/api`

### Deploy
- [ ] Click Deploy
- [ ] Wait 2-3 minutes
- [ ] You'll get a preview URL like `https://start-2026.vercel.app`
- [ ] **Copy this URL** - you'll use it for Railway's FRONTEND_URL

Frontend URL:
```
https://__________________.vercel.app
```

---

## ✅ Post-Deployment Testing

### Frontend Tests
- [ ] Visit your Vercel URL
- [ ] Home page loads without errors
- [ ] Menu navigation works
- [ ] Admin page accessible at `/admin`
- [ ] Check browser console (F12) for errors

### Backend Health Check
- [ ] Visit `[Your Backend URL]/api/health`
- [ ] Should see: `{"success":true,"message":"Server is running"}`

### Integration Tests
- [ ] In admin, save site configuration (Home tab)
- [ ] Add a carousel slide
- [ ] Toggle section visibility
- [ ] Toggle "Hide from Menu"
- [ ] Create a hero section item
- [ ] Verify data persists after refresh
- [ ] Check MongoDB Atlas Collections for data

### Database Verification
- [ ] Login to MongoDB Atlas
- [ ] Go to Databases → Collections
- [ ] Should see collections: `accommodations`, `amenities`, `bookings`, `carousels`, `features`, `footers`, `heroes`, `masterconfigs`, `sections`
- [ ] Click into `masterconfigs` to verify your site config saved

---

## 🌍 Optional: Custom Domain Setup

### Buy Domain
- [ ] Go to Namecheap.com or GoDaddy
- [ ] Search and buy your domain (~$10-15/year)
- [ ] Note your domain name: `________________`
- [ ] Complete payment

### Connect Domain to Vercel
- [ ] In Vercel, go to Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter your domain name
- [ ] Vercel shows instructions
- [ ] Go to Namecheap → Manage DNS
- [ ] Update nameservers as per Vercel instructions
- [ ] Wait 24-48 hours for DNS propagation

### Test Domain
- [ ] Visit `https://yourdomain.com`
- [ ] Should load your frontend
- [ ] Check SSL certificate (green lock icon)

---

## 🔄 After Deployment: How to Update Your App

### Making Changes
1. Edit files in `/frontend` or `/backend`
2. Test locally first
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

### Auto-Deployment
- **Vercel**: Automatically redeploys in 2-3 minutes
- **Railway**: Automatically redeploys in 2-5 minutes
- **No manual steps needed!**

---

## 🚨 Troubleshooting

### Frontend shows blank page
- [ ] Check browser console (F12)
- [ ] Verify `REACT_APP_API_URL` in Vercel environment variables
- [ ] Hard refresh: Ctrl+Shift+Delete

### Can't connect to API
- [ ] Verify backend is running: Visit health check URL
- [ ] Check Railway logs: Dashboard → Deployments → View Logs
- [ ] Verify `REACT_APP_API_URL` matches your Railway URL exactly
- [ ] Check for CORS errors in browser console

### Database connection error
- [ ] Verify `MONGODB_URI` in Railway environment variables
- [ ] Check password has no special characters (or is URL encoded)
- [ ] Verify IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- [ ] Test connection string locally

### Admin dashboard not working
- [ ] Clear browser cache
- [ ] Check browser console for JavaScript errors
- [ ] Verify API_URL is correct
- [ ] Try accessing `/admin` directly
- [ ] Check Railway logs for API errors

### Data not saving
- [ ] Check browser console for errors
- [ ] Look at Railway logs for database errors
- [ ] Verify MongoDB connection string is correct
- [ ] Check network tab (F12) for failed requests

---

## 💰 Cost Verification

Go to each service and verify monthly costs:

### Railway
- [ ] Dashboard → Billing
- [ ] Check current month estimate
- [ ] Should be: $0-7/month

### MongoDB Atlas
- [ ] Dashboard → Billing
- [ ] Should show: Free tier
- [ ] Upgrade only if exceeding 512MB

### Vercel
- [ ] Dashboard → Settings → Billing
- [ ] Should show: Free tier
- [ ] No charges unless using paid features

**Total expected monthly cost: $0-7** ✅

---

## 🎉 You're Live!

Mark this when everything is working:
- [ ] Frontend accessible from your URL
- [ ] Backend API responding
- [ ] Admin dashboard functional
- [ ] Data persisting in database
- [ ] All CRUD operations working
- [ ] Mobile responsive
- [ ] SSL certificate active (green lock)

---

## 📝 Important Information to Save

Save these details securely (password manager or encrypted file):

```
🌐 Frontend URL: https://______________________.vercel.app
🔗 Backend URL: https://______________________.railway.app
🗄️  MongoDB URI: mongodb+srv://sancove_user:_______@____________.mongodb.net
🔑 MongoDB Password: ________________
🏠 Custom Domain: ________________
```

---

## Next Steps After Deployment

1. **Monitor Performance** - Check Railway dashboard weekly
2. **Setup Error Tracking** - Add Sentry (free for small apps)
3. **Add Analytics** - Google Analytics for page views
4. **Payment Integration** - Add Stripe for bookings
5. **Email Notifications** - Setup SendGrid for confirmations
6. **Backup Strategy** - MongoDB Atlas auto-backups

---

**Congratulations! Your app is now live on the internet! 🚀**

For detailed step-by-step instructions, see DEPLOYMENT.md
For service comparisons, see SERVERS_COMPARISON.md
