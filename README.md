# 🧠 IF24 UNLIP

> A web-based app built with Next.js, Tailwind CSS, and TypeScript for Informatika 2024 UNLIP Class.

## 🚀 Overview

This is a modern web application designed using **Next.js App Router**, with styling powered by **Tailwind CSS**, and written in **TypeScript**. It serves as a foundational platform for the Informatika 2024 UNLIP project—either for internal tools, academic collaboration, or community engagement.

## ✨ Features

- ✅ Built using Next.js 14 with App Router
- 🎨 Tailwind CSS for rapid UI development
- ⚡ Optimized for fast development and deployment
- 🔤 Custom font integration using [Geist](https://vercel.com/font)
- 🧱 Modular folder structure for scalability
- ☁️ Deployed on [Vercel](https://if24-unlip.vercel.app)

## 📁 Project Structure

```
if24-unlip/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── favicon.ico
│   ├── members/
│   │   └── pahe.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemape.ts
├── components/
│   ├── admin/
│   │   └── admin-panel.tsx
│   ├── loading/
│   │   ├── member-card-skeleton.tsx
│   │   └── page-loading.tsx
│   ├── member/
│   │   └── member-detail-modal.tsx
│   ├── search/
│   │   └── member-search.tsx
│   ├── seo/
│   │   ├── meta-tags.tsx
│   │   └── structured-data.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── optimized-image.tsx
│   │   ├── particle-background.tsx
│   │   └── skeleton.tsx
│   └── error-boundary.tsx
├── lib/
│   ├── analytics.ts
│   ├── blur-data-url.ts
│   └── utils.ts
├── public/
│   ├── member/
│   ├── manifest.json
│   └── site.webmanifest
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/informatika24-unlip/if24-unlip.git
cd if24-unlip
```

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Live Demo

Check out the live version at:  
👉 [https://if24-unlip.vercel.app](https://if24-unlip.vercel.app)

## 📦 Deployment

This project is set up for instant deployment on [Vercel](https://vercel.com/). Just connect the repo and you're good to go!

## 🙌 Credits

Made with ❤️ by the **Informatika 2024 UNLIP** team.  
Powered by [Next.js](https://nextjs.org/) and [Vercel](https://vercel.com/).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
