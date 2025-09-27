# EmergencyMesh - Intelligent Response System

A cutting-edge emergency response system powered by AI agents for intelligent routing, priority assessment, and real-time coordination.

![EmergencyMesh Dashboard](https://lovable.dev/projects/ac66f2c8-efe3-46fe-95e5-be834fbcebda)

## 🚨 System Overview

EmergencyMesh revolutionizes emergency response through intelligent automation:

- **Input Processing**: Text/voice emergency reports via multiple channels
- **Routing Agent**: AI determines emergency type (medical, disaster, crime)
- **Sentiment Agent**: Analyzes urgency and assigns priority levels
- **Resource Allocator**: Finds nearest hospitals/stations and available resources
- **Priority Mapping**: Real-time visualization with priority-coded markers

## 🎯 Features

### Dashboard Page
- **Hero Section**: Animated system overview with agent workflow timeline
- **Live Statistics**: Active emergencies, response teams, coverage areas, response times
- **Agent Performance**: Real-time status and efficiency metrics
- **Recent Activity**: Live feed of emergencies and system updates

### Interactive Map Page
- **Google Maps Integration**: Full-featured mapping with custom markers
- **Priority Visualization**: Color-coded emergency markers (Red=Critical, Orange=High, Yellow=Medium, Green=Low)
- **Interactive Info Cards**: Detailed emergency information with action buttons
- **Agent Workflow Panels**: Real-time agent status and processing updates
- **Quick Actions**: Navigate, find hospitals, acknowledge emergencies

### Key Components
- **Responsive Navigation**: Seamless page transitions
- **Glass Morphism Design**: Modern, professional emergency operations aesthetic
- **Smooth Animations**: Framer Motion powered interactions
- **Real-time Updates**: Live data simulation with WebSocket-ready architecture

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom emergency design system
- **Animations**: Framer Motion for smooth interactions
- **Maps**: Google Maps API (@react-google-maps/api)
- **HTTP**: Axios for API communication
- **UI Components**: Shadcn/UI with custom variants
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google Maps API key (for map functionality)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd emergency-response-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

1. **Google Maps API Key**:
   - Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Replace `'YOUR_GOOGLE_MAPS_API_KEY'` in `src/pages/MapPage.tsx`
   - Enable Maps JavaScript API and Places API

2. **Backend Integration**:
   - Mock data is provided in `src/data/mockData.ts`
   - Replace mock functions with actual API endpoints
   - Update axios calls in components as needed

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

**EmergencyMesh** - Saving lives through intelligent automation. 🚑🔥👮‍♂️