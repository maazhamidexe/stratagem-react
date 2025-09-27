import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, TrafficLayer, HeatmapLayer, Marker } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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
  Phone,
  Layers,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import { Emergency, Hospital as HospitalType } from '@/data/mockData';
import { findNearestHospitals } from '@/data/mockData';

// Map styling for dark theme with better readability
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1a1a1a' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { weight: 2 }]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#1e3a8a' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2a2a2a' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { weight: 1 }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { weight: 1 }]
  }
];

// Heatmap data for emergency intensity in Pakistan
const heatmapData = [
  { lat: 24.8607, lng: 67.0011, weight: 0.8 }, // Karachi
  { lat: 31.5204, lng: 74.3587, weight: 0.6 }, // Lahore
  { lat: 33.6844, lng: 73.0479, weight: 0.7 }, // Islamabad
  { lat: 31.5497, lng: 74.3436, weight: 0.4 }, // Liberty Market, Lahore
  { lat: 24.8607, lng: 67.0011, weight: 0.5 }, // Saddar, Karachi
  { lat: 24.8607, lng: 67.0011, weight: 0.3 }, // Shahrah-e-Faisal, Karachi
];

interface MapContainerProps {
  emergencies: Emergency[];
  selectedEmergency: Emergency | null;
  onEmergencySelect: (emergency: Emergency | null) => void;
  onNavigate: (location: { lat: number; lng: number }) => void;
  onAcknowledge: (id: number) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  emergencies,
  selectedEmergency,
  onEmergencySelect,
  onNavigate,
  onAcknowledge
}) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [nearestHospitals, setNearestHospitals] = useState<HospitalType[]>([]);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 30.3753,
    lng: 69.3451
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    setIsMapLoaded(true);
    setMapError(null);
    directionsService.current = new window.google.maps.DirectionsService();
    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#3b82f6',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });
  }, []);

  const onError = useCallback((error: any) => {
    console.error('Google Maps error:', error);
    setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#3b82f6';
    }
  };

  const handleMarkerClick = (emergency: Emergency) => {
    onEmergencySelect(emergency);
  };

  const handleNavigate = async (location: { lat: number; lng: number }) => {
    if (!directionsService.current || !directionsRenderer.current || !mapRef) return;

    // Get user's current location or use a default
    const userLocation = { lat: 30.3753, lng: 69.3451 }; // Default to Pakistan center

    try {
      const result = await directionsService.current.route({
        origin: userLocation,
        destination: location,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
      });

      if (result) {
        setDirections(result);
        directionsRenderer.current.setDirections(result);
        directionsRenderer.current.setMap(mapRef);
      }
    } catch (error) {
      console.error('Directions request failed:', error);
    }
  };

  const handleFindHospitals = async (location: { lat: number; lng: number }) => {
    setIsLoadingHospitals(true);
    try {
      const hospitals = await findNearestHospitals(location, 5);
      setNearestHospitals(hospitals);
    } catch (error) {
      console.error('Failed to find hospitals:', error);
    } finally {
      setIsLoadingHospitals(false);
    }
  };

  const clearDirections = () => {
    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(null);
      setDirections(null);
    }
  };

  const clearHospitals = () => {
    setNearestHospitals([]);
  };

  // Auto-find hospitals when emergency is selected
  useEffect(() => {
    if (selectedEmergency) {
      handleFindHospitals(selectedEmergency.location);
    } else {
      clearHospitals();
    }
  }, [selectedEmergency]);


  // Check if Google Maps is loaded
  const isGoogleMapsLoaded = window.google?.maps;

  return (
    <div className="relative w-full h-full">
      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        {/* Layer Controls */}
        <motion.div
          className="bg-card/90 backdrop-blur-sm border border-border/20 rounded-lg p-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
            className="w-full justify-start"
          >
            <Layers className="w-4 h-4 mr-2" />
            Layers
          </Button>
          
          <AnimatePresence>
            {showLayers && (
              <motion.div
                className="mt-2 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTraffic(!showTraffic)}
                  className="w-full justify-start"
                >
                  {showTraffic ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                  Traffic
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="w-full justify-start"
                >
                  {showHeatmap ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                  Heatmap
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Clear Controls */}
        {(directions || nearestHospitals.length > 0) && (
          <motion.div
            className="bg-card/90 backdrop-blur-sm border border-border/20 rounded-lg p-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={clearDirections}
              className="w-full justify-start"
            >
              <Route className="w-4 h-4 mr-2" />
              Clear Route
            </Button>
            {nearestHospitals.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHospitals}
                className="w-full justify-start"
              >
                <Hospital className="w-4 h-4 mr-2" />
                Clear Hospitals
              </Button>
            )}
          </motion.div>
        )}
      </div>


      {/* Google Map */}
      {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
        <LoadScript 
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={['places', 'geometry', 'drawing', 'visualization']}
          onError={(error) => {
            console.error('LoadScript error:', error);
            setMapError('Failed to load Google Maps script. Check your API key.');
          }}
        >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={6}
          onLoad={onLoad}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true
          }}
        >
          {/* Emergency Markers */}
          {isGoogleMapsLoaded && emergencies.map((emergency) => (
            <Marker
              key={emergency.id}
              position={emergency.location}
              onClick={() => handleMarkerClick(emergency)}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="16" fill="${getPriorityColor(emergency.priority)}" stroke="white" stroke-width="3"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                    <text x="20" y="25" text-anchor="middle" fill="${getPriorityColor(emergency.priority)}" font-family="Arial" font-size="12" font-weight="bold">
                      ${emergency.severity}
                    </text>
                  </svg>
                `)}`,
                scaledSize: window.google?.maps ? new window.google.maps.Size(40, 40) : undefined,
                anchor: window.google?.maps ? new window.google.maps.Point(20, 20) : undefined
              }}
              animation={window.google?.maps?.Animation?.DROP}
            />
          ))}

          {/* Hospital Markers */}
          {isGoogleMapsLoaded && nearestHospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={hospital.location}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="6" width="16" height="20" rx="2" fill="#10b981" stroke="white" stroke-width="2"/>
                    <rect x="12" y="10" width="8" height="2" fill="white"/>
                    <rect x="12" y="14" width="8" height="2" fill="white"/>
                    <rect x="12" y="18" width="8" height="2" fill="white"/>
                    <circle cx="16" cy="4" r="3" fill="#10b981" stroke="white" stroke-width="2"/>
                  </svg>
                `)}`,
                scaledSize: window.google?.maps ? new window.google.maps.Size(32, 32) : undefined
              }}
            />
          ))}

          {/* Traffic Layer */}
          {showTraffic && <TrafficLayer />}

          {/* Heatmap Layer */}
          {showHeatmap && window.google?.maps && (
            <HeatmapLayer
              data={heatmapData.map(point => ({
                location: new window.google.maps.LatLng(point.lat, point.lng),
                weight: point.weight
              }))}
              options={{
                radius: 50,
                opacity: 0.6,
                gradient: [
                  'rgba(0, 255, 255, 0)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(0, 191, 255, 1)',
                  'rgba(0, 127, 255, 1)',
                  'rgba(0, 63, 255, 1)',
                  'rgba(0, 0, 255, 1)',
                  'rgba(0, 0, 223, 1)',
                  'rgba(0, 0, 191, 1)',
                  'rgba(0, 0, 159, 1)',
                  'rgba(0, 0, 127, 1)',
                  'rgba(76, 0, 76, 1)',
                  'rgba(102, 0, 51, 1)',
                  'rgba(128, 0, 0, 1)',
                  'rgba(153, 0, 0, 1)',
                  'rgba(178, 0, 0, 1)',
                  'rgba(204, 0, 0, 1)',
                  'rgba(229, 0, 0, 1)',
                  'rgba(255, 0, 0, 1)'
                ]
              }}
            />
          )}

          {/* Directions Renderer */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#3b82f6',
                  strokeWeight: 4,
                  strokeOpacity: 0.8
                }
              }}
            />
          )}
        </GoogleMap>
        </LoadScript>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">🔑</div>
            <h3 className="text-xl font-bold text-foreground mb-2">API Key Missing</h3>
            <p className="text-muted-foreground mb-4">
              Please add your Google Maps API key to the .env file
            </p>
            <div className="text-left bg-card/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Steps to fix:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. Create a .env file in the project root</li>
                <li>2. Add: VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</li>
                <li>3. Restart the development server</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!isMapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground">Loading Google Maps...</p>
            <p className="text-muted-foreground text-sm mt-2">Please wait while the map initializes</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Map Loading Error</h3>
            <p className="text-muted-foreground mb-4">{mapError}</p>
            <div className="text-left bg-card/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Troubleshooting steps:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check if your API key is correct in .env file</li>
                <li>• Ensure Maps JavaScript API is enabled</li>
                <li>• Verify your internet connection</li>
                <li>• Check browser console for detailed errors</li>
              </ul>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Emergency Info Panel */}
      <AnimatePresence>
        {selectedEmergency && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedEmergency.title}
                      </h3>
                      <Badge 
                        variant={selectedEmergency.priority === 'Critical' ? 'destructive' : 
                               selectedEmergency.priority === 'High' ? 'default' : 'secondary'}
                        className="font-semibold"
                      >
                        {selectedEmergency.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {selectedEmergency.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedEmergency.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedEmergency.timestamp}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Severity: {selectedEmergency.severity}/10
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEmergencySelect(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleNavigate(selectedEmergency.location)}
                    className="flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFindHospitals(selectedEmergency.location)}
                    disabled={isLoadingHospitals}
                    className="flex items-center gap-2"
                  >
                    <Hospital className="w-4 h-4" />
                    {isLoadingHospitals ? 'Finding...' : 'Find Hospitals'}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onAcknowledge(selectedEmergency.id)}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Acknowledge
                  </Button>
                  
                  {selectedEmergency.contactInfo?.phone && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedEmergency.contactInfo?.phone}`)}
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nearest Hospitals Panel */}
      <AnimatePresence>
        {nearestHospitals.length > 0 && (
          <motion.div
            className="absolute top-4 left-4 z-10 max-w-sm"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Hospital className="w-5 h-5 text-blue-600" />
                    Nearest Hospitals
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHospitals}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {nearestHospitals.map((hospital) => (
                    <motion.div
                      key={hospital.id}
                      className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNavigate(hospital.location)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {hospital.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {hospital.address}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{hospital.distance?.toFixed(1)} km</span>
                            {hospital.rating && (
                              <span>★ {hospital.rating}</span>
                            )}
                            {hospital.availableBeds && (
                              <span>{hospital.availableBeds} beds</span>
                            )}
                          </div>
                        </div>
                        <Navigation className="w-4 h-4 text-blue-600" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapContainer;

