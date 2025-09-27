import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Hospital, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Route,
  Brain,
  Zap,
  Phone
} from 'lucide-react';

// Mock emergency data - replace with real API calls
const mockEmergencies = [
  {
    id: 1,
    title: 'Medical Emergency',
    priority: 'Critical',
    location: { lat: 40.7128, lng: -74.0060 },
    address: '123 Main St, NYC',
    description: 'Cardiac arrest reported, ambulance dispatched',
    timestamp: '2 min ago',
    type: 'medical',
    status: 'active'
  },
  {
    id: 2,
    title: 'Structure Fire',
    priority: 'High',
    location: { lat: 40.7589, lng: -73.9851 },
    address: '456 Broadway, NYC',
    description: 'Apartment building fire, multiple units responding',
    timestamp: '5 min ago',
    type: 'fire',
    status: 'responding'
  },
  {
    id: 3,
    title: 'Traffic Accident',
    priority: 'Medium',
    location: { lat: 40.7505, lng: -73.9934 },
    address: 'Times Square, NYC',
    description: 'Multi-vehicle collision, injuries reported',
    timestamp: '8 min ago',
    type: 'accident',
    status: 'active'
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return '#ef4444';
    case 'high': return '#f97316';
    case 'medium': return '#eab308';
    case 'low': return '#22c55e';
    default: return '#3b82f6';
  }
};

const MapPage = () => {
  const [selectedEmergency, setSelectedEmergency] = useState<any>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const handleMarkerClick = (emergency: any) => {
    setSelectedEmergency(emergency);
  };

  const handleNavigate = (location: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const handleAcknowledge = (emergencyId: number) => {
    // TODO: Replace with actual API call
    console.log('Acknowledging emergency:', emergencyId);
    // POST to backend endpoint
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Panel - Emergency List */}
      <motion.div
        className="w-80 bg-gradient-glass border-r border-border/20 p-4 overflow-y-auto"
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-emergency-high" />
          Active Emergencies
        </h2>
        
        <div className="space-y-3">
          {mockEmergencies.map((emergency, index) => (
            <motion.div
              key={emergency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card 
                className="bg-card/50 border-border/20 hover:bg-card/70 transition-all duration-200 cursor-pointer"
                onClick={() => handleMarkerClick(emergency)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">
                      {emergency.title}
                    </h3>
                    <Badge 
                      variant={emergency.priority === 'Critical' ? 'destructive' : 
                             emergency.priority === 'High' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {emergency.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {emergency.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {emergency.timestamp}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* TODO: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with actual environment variable */}
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            options={{
              styles: [
                {
                  featureType: 'all',
                  elementType: 'geometry.fill',
                  stylers: [{ color: '#1a1a1a' }]
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#ffffff' }]
                }
              ]
            }}
          >
            {mockEmergencies.map((emergency) => (
              <Marker
                key={emergency.id}
                position={emergency.location}
                onClick={() => handleMarkerClick(emergency)}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="12" fill="${getPriorityColor(emergency.priority)}" stroke="white" stroke-width="3"/>
                      <circle cx="16" cy="16" r="6" fill="white"/>
                    </svg>
                  `)}`,
                  scaledSize: new window.google.maps.Size(32, 32)
                }}
              />
            ))}

            {selectedEmergency && (
              <InfoWindow
                position={selectedEmergency.location}
                onCloseClick={() => setSelectedEmergency(null)}
              >
                <div className="p-4 bg-card text-foreground rounded-lg min-w-[300px]">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg">{selectedEmergency.title}</h3>
                    <Badge 
                      variant={selectedEmergency.priority === 'Critical' ? 'destructive' : 
                             selectedEmergency.priority === 'High' ? 'default' : 'secondary'}
                    >
                      {selectedEmergency.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {selectedEmergency.description}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedEmergency.address}
                  </p>
                  
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      size="sm" 
                      onClick={() => handleNavigate(selectedEmergency.location)}
                      className="flex items-center gap-1"
                    >
                      <Navigation className="w-4 h-4" />
                      Navigate
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Finding nearest hospitals...')}
                      className="flex items-center gap-1"
                    >
                      <Hospital className="w-4 h-4" />
                      Hospitals
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAcknowledge(selectedEmergency.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Right Panel - Agent Workflow */}
      <motion.div
        className="w-80 bg-gradient-glass border-l border-border/20 p-4 overflow-y-auto"
        initial={{ x: 320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Agent Workflow
        </h2>
        
        <div className="space-y-4">
          {[
            { name: 'Routing Agent', status: 'Processing', activity: 'Analyzing new reports', icon: Route, color: 'text-primary' },
            { name: 'Sentiment Agent', status: 'Active', activity: 'Priority assessment', icon: Brain, color: 'text-warning' },
            { name: 'Resource Allocator', status: 'Active', activity: 'Finding resources', icon: Zap, color: 'text-success' }
          ].map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="bg-card/50 border-border/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <agent.icon className={`w-4 h-4 ${agent.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {agent.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.activity}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      {agent.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border/20">
          <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-2" />
              Emergency Hotline
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Hospital className="w-4 h-4 mr-2" />
              Hospital Directory
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapPage;