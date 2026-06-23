# SHEDVR Site - Deploy Guide

## Hosts that work from Russia:
1. **GitHub Pages** (github.io) - FREE, unlimited
2. **Netlify** (netlify.app) - FREE, 100GB/mo
3. **Cloudflare Pages** (pages.dev) - FREE, unlimited
4. **Render** (onrender.com) - FREE tier

## Deploy to GitHub Pages (easiest):
1. Create GitHub repo
2. Upload index.html, tools.html, proxy.html
3. Enable Pages in Settings

## Deploy to Netlify:
1. Go to netlify.com
2. Drag & drop this folder
3. Get URL like shedevr.netlify.app

## Deploy to Cloudflare Pages:
1. Go to pages.dev
2. Connect GitHub repo
3. Auto-deploys

## How it works:
- Provider sees you visiting "CloudNews" (normal blog)
- Hidden /tools page routes traffic through proxy
- Provider can't distinguish from normal browsing