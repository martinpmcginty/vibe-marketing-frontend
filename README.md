# Vibe Marketing Frontend

A modern, AI-powered content strategy platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Workflow**: Live progress indicators and status updates
- **Interactive Results**: Tabbed interface for keywords, SERP analysis, and content briefs
- **Export Options**: Copy to clipboard and PDF export functionality
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **UI Components**: Radix UI primitives

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vibe-marketing-frontend.git
   cd vibe-marketing-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Home page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── WorkflowForm.tsx
│   └── ResultsDisplay.tsx
├── lib/               # Utilities and configurations
│   └── api.ts         # API client and types
└── styles/            # Global styles
```

## 🔌 API Integration

The frontend connects to the Vibe Marketing Backend API. Make sure your backend is running and accessible.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

### API Endpoints

- `GET /keywords` - Keyword research
- `POST /analyze` - SERP analysis
- `POST /workflow` - Complete workflow
- `GET /health` - Health check

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Emerald (#059669)
- **Accent**: Orange (#EA580C)
- **Neutral**: Gray (#64748B)

### Typography
- **Headings**: Inter (Bold)
- **Body**: Inter (Regular)

### Components
- Cards with subtle shadows
- Gradient buttons
- Tabbed interfaces
- Progress indicators

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Set environment variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel dashboard
   - Point to your deployed backend

3. **Deploy**
   - Vercel will automatically deploy on push to main

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔄 Backend Integration

This frontend is designed to work with the [Vibe Marketing Backend](https://github.com/martinpmcginty/vibe-marketing-backend).

### Development Setup

1. **Start the backend**
   ```bash
   cd ../vibe-marketing-backend
   npm run start:keyword-tool
   ```

2. **Start the frontend**
   ```bash
   npm run dev
   ```

3. **Test the integration**
   - Enter a seed phrase in the frontend
   - Verify the API calls work correctly

## 📱 Features

### Workflow Interface
- Clean, intuitive form for seed phrase input
- Real-time validation and feedback
- Loading states with progress indicators

### Results Display
- **Keywords Tab**: Keyword clusters with competition analysis
- **SERP Tab**: Content depth and gap analysis
- **Brief Tab**: Complete content brief with export options
- **Recommendations Tab**: Strategic insights and next steps

### Export Options
- Copy content brief to clipboard
- PDF export (coming soon)
- Slack integration (coming soon)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Check the backend documentation
- Review the API examples

---

**Built with ❤️ for modern marketing teams** 