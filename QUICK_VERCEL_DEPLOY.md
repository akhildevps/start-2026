# 🚀 Deploy on Vercel - Quick Start

**TL;DR: Deploy both frontend and backend on Vercel in 5 steps**

---

## 📝 What You Have

```
start-2026/  (Your GitHub repo)
├── frontend/   (React app)
├── backend/    (Express API)
└── vercel.json (Already created)
```

---

## 6️⃣ Quick Deployment Steps

### Step 1: Push to GitHub ✅
```bash
git add .
git commit -m "Ready for Vercel"
git push origin main
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Use GitHub (easiest)

### Step 3: Connect GitHub Repo
1. Click "Add New → Project"
2. Find your `start-2026` repo
3. Click "Import"

### Step 4: Configure Settings (Should be Auto-Detected ✅)

Vercel will auto-detect your monorepo setup. Verify:
- **Framework Preset:** `Other` (custom monorepo)
- **Root Directory:** Leave blank (monorepo detection)
- **Node.js Version:** `18.x` or higher (OK to keep default)
- **Build Command:** Auto-detected from `vercel.json`

Everything should be automatic! If not, these settings are already configured in your `vercel.json` file.

### Step 5: Add Environment Variable

1. Click **Settings → Environment Variables**
2. Add new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://sancove_user:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority`
     - Replace `sancove_user` and `PASSWORD` with your MongoDB credentials
     - Get this from MongoDB Atlas
   - **Environments:** Check `Production`

3. Click "Deploy"

### Step 6: Wait & Test
- Deployment takes 3-5 minutes
- You'll get a URL like `https://start-2026.vercel.app`
- Test it!

---

## ✅ Testing

| Test | URL |
|------|-----|
| Home page | `https://yoururl.vercel.app/` |
| Admin | `https://yoururl.vercel.app/admin` |
| API health | `https://yoururl.vercel.app/api/health` |

---

## 🔄 Update Your App

```bash
# Make changes
# Test locally
# Commit
git push origin main

# ✅ Vercel auto-deploys in 2-3 minutes
```

---

## 📚 More Details

- Full guide: **VERCEL_FULLSTACK_DEPLOYMENT.md**
- Choosing deployment: **CHOOSING_DEPLOYMENT.md**
- Original Railway guide: **DEPLOYMENT.md**

---

## 💡 Need Your MongoDB Info?

### Get MongoDB Connection String:

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Login to your account
3. Go to **Databases**
4. Click **Connect** next to your cluster
5. Select **Drivers**
6. Copy the connection string
7. Replace `<password>` with your password

Example format:
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

---

## 🎉 You're Live!

Once deployed, you have:
- ✅ Frontend running
- ✅ Backend running
- ✅ Database connected
- ✅ Auto-updates on git push
- ✅ Free SSL certificate
- ✅ Professional hosting

**Total Cost: FREE (for now) 🎊**

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page | Check browser console (F12) |
| API 404 | Verify MONGODB_URI environment variable |
| Build failed | Check Vercel logs: Deployments → View Logs |

---

## 📖 Next Steps

1. **Deploy now** using 5 steps above
2. **Test** at your Vercel URL
3. **Read full guide** for advanced setup
4. **Add custom domain** (optional, later)

---

**Ready? Let's deploy! 🚀**

**→ Go to Step 2: Create Vercel Account**
