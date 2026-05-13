# 🚀 Jepe Nexus Analyzer

**AI-Powered Multi-Agent Trading Signal Platform**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)
![MiMo API](https://img.shields.io/badge/MiMo-API%20Ready-purple?logo=ai)

---

## 📖 Overview

Jepe Nexus Analyzer adalah platform analisis trading yang menggunakan **Multi-Agent AI Workflow** untuk menghasilkan sinyal trading crypto yang actionable. Dibangun dengan arsitektur modern yang siap integrasi dengan **Xiaomi MiMo API** untuk AI reasoning dan analysis.

### 🎯 Problem yang Diselesaikan

Trader crypto menghadapi beberapa tantangan:
- **Information overload** - terlalu banyak data market yang harus dianalisis
- **Emotional trading** - keputusan trading dipengaruhi emosi
- **Time consuming** - analisis teknikal manual memakan waktu berjam-jam
- **Inconsistent results** - tanpa sistem yang terstruktur, hasil trading tidak konsisten

### 💡 Solution

Jepe Nexus Analyzer mengotomatisasi proses analisis dengan **3 AI Agents**:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Data Agent    │────▶│ Analysis Agent  │────▶│   Signal Agent  │
│                 │     │                 │     │                 │
│ - Fetch prices  │     │ - Technical     │     │ - Generate      │
│ - Order book    │     │ - Pattern rec.  │     │ - Entry/Target  │
│ - On-chain      │     │ - Sentiment     │     │ - Stop Loss     │
│ - News/Social   │     │ - MiMo API      │     │ - Confidence    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 🏗️ Architecture

### Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes
- **AI Integration:** Xiaomi MiMo API (ready)
- **Deployment:** Vercel (Edge-ready)
- **State Management:** React Hooks

### Project Structure

```
jepe-nexus-analyzer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts      # AI analysis endpoint
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── Header.tsx            # Navigation header
│       ├── StatsCard.tsx         # Statistics display
│       └── SignalCard.tsx        # Trading signal card
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔌 MiMo API Integration

### Current Status
- ✅ Project structure ready
- ✅ API endpoint prepared (`/api/analyze`)
- ✅ Mock data untuk demo
- ⏳ **Waiting for MiMo API approval**

### Integration Plan

Setelah mendapatkan MiMo API key, berikut implementasinya:

```typescript
// src/app/api/analyze/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { marketData } = await request.json();

  // Multi-Agent Workflow dengan MiMo API
  const analysisPrompt = `
    You are an expert crypto trading analyst.
    
    Market Data:
    ${JSON.stringify(marketData)}
    
    Analyze:
    1. Technical indicators (RSI, MACD, EMA, Volume)
    2. Chart patterns
    3. Market sentiment
    
    Output format:
    {
      "action": "BUY" | "SELL" | "HOLD",
      "confidence": 0-100,
      "entry": number,
      "target": number,
      "stopLoss": number,
      "reasoning": "string"
    }
  `;

  const response = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MIMO_API_KEY}`
    },
    body: JSON.stringify({
      model: 'mimo-v2.5-instruct',
      messages: [
        { role: 'system', content: 'You are a professional crypto trading analyst with 10+ years experience.' },
        { role: 'user', content: analysisPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })
  });

  const analysis = await response.json();
  return NextResponse.json({ signals: [analysis] });
}
```

### Environment Variables

```env
# .env.local
MIMO_API_KEY=your_api_key_here
MIMO_MODEL=mimo-v2.5-instruct
```

---

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo at vercel.com for auto-deploy
```

---

## 📊 Features

### Current (Demo Mode)
- ✅ Real-time dashboard UI
- ✅ Signal cards dengan entry/target/stop loss
- ✅ Confidence scoring visualization
- ✅ AI reasoning display
- ✅ Responsive design (mobile + desktop)
- ✅ Auto-refresh every 5 minutes

### After MiMo API Approval
- 🔄 Real AI-powered analysis
- 🔄 Multi-agent workflow orchestration
- 🔄 Historical signal tracking
- 🔄 Performance analytics
- 🔄 Telegram/Discord alerts
- 🔄 Portfolio integration
- 🔄 Backtesting module

---

## 🎯 Use Cases

### Personal Trading
Gunakan untuk daily trading analysis dan signal generation.

### Trading Community
Share signals dengan community via Telegram/Discord bot.

### Educational Platform
Demo AI trading analysis untuk course atau tutorial.

### SaaS Product
Scale menjadi subscription-based signal service.

---

## 📈 Token Consumption Estimate

Berdasarkan workflow yang direncanakan:

| Agent | Calls/day | Tokens/call | Total tokens/day |
|-------|-----------|-------------|------------------|
| Data Agent | 288 (5min) | 500 | 144,000 |
| Analysis Agent | 288 (5min) | 2,000 | 576,000 |
| Signal Agent | 288 (5min) | 1,000 | 288,000 |
| **Total** | **864** | - | **~1M tokens/day** |

**Monthly estimate: ~30M tokens**

---

## 📝 License

MIT License - feel free to use for your projects!

---

## 🙏 Xiaomi MiMo 100T Application

Project ini dibuat sebagai bagian dari aplikasi **Xiaomi MiMo Orbit 100T Token Creator Incentive Program**.

