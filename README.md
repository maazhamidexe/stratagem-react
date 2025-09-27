# Swift Care

A highly interactive emergency dashboard built with React and Google Maps, featuring rapid emergency response with intelligent priority assessment, real-time resource optimization, and automated coordination protocols.

## 🚨 System Overview

Swift Care revolutionizes emergency management through:

- **Interactive Google Maps Integration** with custom dark theme styling
- **Real-time Emergency Visualization** with color-coded priority markers
- **AI Agent Orchestration** for intelligent routing and resource allocation
- **Hospital Search & Navigation** using Google Places and Directions APIs
- **Multi-layer Map Features** including traffic, heatmaps, and drawing tools
- **Responsive Design** with smooth animations and modern UI

## 🎯 Features

### Dashboard Page
- **Clean, minimal, responsive design** with sophisticated animations
- **Real-time system status** and performance metrics
- **AI agent workflow visualization** with live activity feeds
- **Emergency statistics** and response analytics
- **Interactive navigation** to map view

### Map View
- **Full-screen Google Maps integration** with custom dark theme styling
- **Color-coded emergency markers** with priority levels (Critical, High, Medium, Low)
- **Interactive info windows** with detailed emergency information
- **Real-time navigation** with Google Directions API
- **Nearest hospital search** using Google Places API
- **Multiple map layers**: Traffic, Heatmap, and Drawing tools
- **Smooth animations** for marker appearance and transitions
- **Responsive design** with collapsible side panels

### Advanced Features
- **Search and filtering** for emergency incidents
- **Real-time data updates** with API simulation
- **Emergency acknowledgment** and status tracking
- **Hospital directory** with distance calculations
- **AI agent performance monitoring**
- **System health indicators**

### Key Components
- **Responsive Navigation**: Seamless page transitions
- **Glass Morphism Design**: Modern, professional emergency operations aesthetic
- **Smooth Animations**: Framer Motion powered interactions
- **Real-time Updates**: Live data simulation with WebSocket-ready architecture

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Google Maps JavaScript API** via `@react-google-maps/api`
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Vite** for build tooling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Directions API
  - Geocoding API

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd stratagem-react

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

1. **Create Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Get Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Directions API
     - Geocoding API
   - Create credentials (API Key)
   - Restrict the API key to your domain (recommended for production)

3. **Configure Environment Variables**:
   Edit `.env` and add your Google Maps API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Architecture

### Agent System Flow
```
Input → Routing Agent → Sentiment Agent → Resource Allocator → Priority Map
```

1. **Input Processing**: Receives emergency reports from multiple sources
2. **Routing Agent**: Classifies emergency type using AI pattern recognition
3. **Sentiment Agent**: Analyzes language patterns for urgency assessment
4. **Resource Allocator**: Calculates optimal resource deployment
5. **Priority Mapping**: Visualizes everything on interactive map interface

### Design System

The emergency-themed design system includes:

- **Colors**: Critical (Red), High (Orange), Medium (Yellow), Low (Green), Info (Blue)
- **Gradients**: Professional emergency operation aesthetics
- **Glass Morphism**: Modern, clean interface elements
- **Animations**: Smooth transitions and micro-interactions
- **Typography**: Clear, readable fonts optimized for emergency operations

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── StatsCards.tsx   # Dashboard statistics
│   └── AgentTimeline.tsx # Animated workflow timeline
├── pages/
│   ├── Dashboard.tsx    # Main dashboard page
│   ├── MapPage.tsx      # Interactive map interface
│   └── NotFound.tsx     # 404 error page
├── data/
│   └── mockData.ts      # Mock emergency data & API simulation
├── assets/
│   └── hero-emergency-center.jpg # Hero background image
└── hooks/
    └── use-toast.ts     # Toast notification system
```

## 🔧 Customization

### Adding New Emergency Types
1. Update the `Emergency` interface in `src/data/mockData.ts`
2. Add new priority colors in `src/index.css`
3. Update the routing agent logic for classification

### Integrating Real APIs

Replace mock functions in `src/data/mockData.ts`:

```typescript
// Example: Real emergency data API
export const fetchEmergencies = async (): Promise<Emergency[]> => {
  const response = await axios.get('/api/emergencies');
  return response.data;
};

// Example: Acknowledge emergency
export const acknowledgeEmergency = async (id: number): Promise<boolean> => {
  await axios.post(`/api/emergencies/${id}/acknowledge`);
  return true;
};
```

### Google Maps Configuration

Update map options in `src/pages/MapPage.tsx`:

```typescript
// Custom map styling for emergency operations
const mapOptions = {
  styles: [/* Custom dark theme styles */],
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  fullscreenControl: true
};
```

## 🎨 Design Guidelines

- **Emergency Priority Colors**: Use semantic color system for consistent emergency classification
- **Glass Morphism**: Maintain backdrop-blur and transparency for modern aesthetic
- **Animations**: Ensure smooth 60fps animations using Framer Motion
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Responsive**: Mobile-first design with breakpoint optimization

## 📊 Performance Optimization

- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Automatic route-based code splitting with Vite
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Lovable
1. Open your [Lovable Project](https://lovable.dev/projects/ac66f2c8-efe3-46fe-95e5-be834fbcebda)
2. Click "Share" → "Publish"
3. Your app will be live at `yourproject.lovable.app`

### Custom Domain
- Navigate to Project Settings → Domains
- Connect your custom domain
- [Domain Setup Guide](https://docs.lovable.dev/features/custom-domain)

## 🛡️ Security Considerations

- **API Keys**: Store Google Maps API key securely (use environment variables in production)
- **Data Validation**: Validate all emergency report inputs
- **Authentication**: Implement proper authentication for emergency operators
- **Rate Limiting**: Protect API endpoints from abuse
- **HTTPS**: Always use HTTPS in production for sensitive emergency data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Issues**: Create an issue in this repository

## 🔮 Future Enhancements

- **Real-time WebSocket Integration**: Live updates without page refresh
- **Mobile App**: React Native version for field responders
- **AI Voice Processing**: Advanced speech recognition for emergency calls
- **Predictive Analytics**: ML models for emergency pattern prediction
- **Integration Hub**: Connect with existing emergency management systems

---

**Swift Care** - Saving lives through rapid response. 🚑🔥👮‍♂️