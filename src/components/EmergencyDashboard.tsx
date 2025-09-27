import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock, 
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { mockEmergencies } from '@/data/mockData';

// Bridge server URL - change this to your bridge server URL
const BRIDGE_SERVER_URL = 'http://localhost:3001';

export interface BridgeEmergency {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'active' | 'responding' | 'resolved' | 'cancelled';
  timestamp: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reportedBy: {
    name: string;
    phone: string;
    email: string;
  };
  severity: number;
  assignedUnits?: string[];
  estimatedArrival?: string;
  images?: string[];
  audio?: string | null;
  video?: string | null;
}

interface BridgeResponse {
  success: boolean;
  data: {
    emergencies: BridgeEmergency[];
  };
}

const EmergencyDashboard: React.FC = () => {
  const [emergencies, setEmergencies] = useState<BridgeEmergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchEmergencies = async () => {
    try {
      console.log('Fetching emergencies from bridge server...');
      const response = await fetch(`${BRIDGE_SERVER_URL}/api/v1/emergencies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: BridgeResponse = await response.json();
      console.log('Received emergencies:', data);
      
      if (data.success && data.data.emergencies) {
        // Combine mock emergencies with real emergencies from bridge server
        const combinedEmergencies = [...mockEmergencies.map(mock => ({
          id: `mock-${mock.id}`,
          title: `[MOCK] ${mock.title}`,
          description: mock.description,
          type: mock.type,
          priority: mock.priority,
          status: mock.status,
          timestamp: mock.timestamp,
          address: mock.address,
          coordinates: {
            latitude: mock.location.lat,
            longitude: mock.location.lng
          },
          reportedBy: {
            name: mock.reportedBy.name,
            phone: mock.reportedBy.phone || '',
            email: mock.contactInfo?.email || ''
          },
          severity: mock.severity,
          assignedUnits: mock.assignedUnits,
          estimatedArrival: mock.estimatedDuration,
          images: mock.images || [],
          audio: mock.audio,
          video: mock.video
        })), ...data.data.emergencies];
        
        setEmergencies(combinedEmergencies);
        setLastUpdated(new Date());
        setError(null);
        console.log(`EmergencyDashboard: Loaded ${mockEmergencies.length} mock + ${data.data.emergencies.length} real = ${combinedEmergencies.length} total emergencies`);
      } else {
        // Show mock data only if no real data
        const mockBridgeEmergencies = mockEmergencies.map(mock => ({
          id: `mock-${mock.id}`,
          title: `[MOCK] ${mock.title}`,
          description: mock.description,
          type: mock.type,
          priority: mock.priority,
          status: mock.status,
          timestamp: mock.timestamp,
          address: mock.address,
          coordinates: {
            latitude: mock.location.lat,
            longitude: mock.location.lng
          },
          reportedBy: {
            name: mock.reportedBy.name,
            phone: mock.reportedBy.phone || '',
            email: mock.contactInfo?.email || ''
          },
          severity: mock.severity,
          assignedUnits: mock.assignedUnits,
          estimatedArrival: mock.estimatedDuration,
          images: mock.images || [],
          audio: mock.audio,
          video: mock.video
        }));
        setEmergencies(mockBridgeEmergencies);
        setLastUpdated(new Date());
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching emergencies:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch emergencies');
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeEmergency = async (emergencyId: string) => {
    try {
      console.log(`Acknowledging emergency ${emergencyId}...`);
      const response = await fetch(`${BRIDGE_SERVER_URL}/api/v1/emergencies/${emergencyId}/acknowledge`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Update local state
        setEmergencies(prev => 
          prev.map(emergency => 
            emergency.id === emergencyId 
              ? { ...emergency, status: 'responding', timestamp: new Date().toISOString() }
              : emergency
          )
        );
        console.log(`Emergency ${emergencyId} acknowledged successfully`);
      } else {
        console.error(`Failed to acknowledge emergency ${emergencyId}`);
      }
    } catch (err) {
      console.error('Error acknowledging emergency:', err);
    }
  };

  useEffect(() => {
    // Fetch initially
    fetchEmergencies();
    
    // Poll every 5 seconds for new emergencies
    const interval = setInterval(fetchEmergencies, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'responding': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="w-4 h-4" />;
      case 'responding': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-glass border-border/30 shadow-glass backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            Loading Emergency Data...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-lg text-muted-foreground">Connecting to emergency system...</div>
            <div className="text-sm text-muted-foreground mt-2">Bridge Server: {BRIDGE_SERVER_URL}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-glass border-red-300 shadow-glass backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-600">
            <XCircle className="w-6 h-6" />
            Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 mb-4">
            <div className="font-semibold">Failed to connect to emergency system</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
          <Button onClick={fetchEmergencies} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </Button>
          <div className="text-xs text-muted-foreground mt-3">
            Make sure the bridge server is running at: {BRIDGE_SERVER_URL}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-glass border-border/30 shadow-glass backdrop-blur-md hover:shadow-glow-primary transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <AlertTriangle className="w-7 h-7 text-emergency-high" />
            </motion.div>
            Live Emergency Feed
            <Badge variant="secondary" className="bg-emergency-high/20 text-emergency-high border-emergency-high/30">
              LIVE
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={fetchEmergencies}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <div className="text-xs text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {emergencies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No active emergencies</div>
            <div className="text-gray-400 text-sm">
              System is monitoring for new emergency reports...
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Bridge Server: {BRIDGE_SERVER_URL}
            </div>
          </div>
        ) : (
          emergencies.map((emergency, index) => (
            <motion.div
              key={emergency.id}
              className="group relative p-5 rounded-xl bg-card/40 border border-border/20 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              {/* Priority indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getPriorityColor(emergency.priority)}`} />
              
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                      {emergency.title}
                    </span>
                    <Badge 
                      variant={emergency.priority === 'Critical' ? 'destructive' : 
                               emergency.priority === 'High' ? 'default' : 'secondary'}
                      className="font-semibold"
                    >
                      {emergency.priority}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(emergency.status)} flex items-center gap-1`}
                    >
                      {getStatusIcon(emergency.status)}
                      {emergency.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 font-medium">{emergency.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{emergency.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(emergency.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Reported by: {emergency.reportedBy.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Severity: {emergency.severity}/10
                      </span>
                    </div>
                  </div>

                  {emergency.assignedUnits && emergency.assignedUnits.length > 0 && (
                    <div className="mt-3">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Assigned Units:</div>
                      <div className="flex flex-wrap gap-2">
                        {emergency.assignedUnits.map((unit, unitIndex) => (
                          <Badge key={unitIndex} variant="secondary" className="text-xs">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {emergency.estimatedArrival && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 inline mr-1" />
                      ETA: {emergency.estimatedArrival}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                    {emergency.reportedBy.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {emergency.reportedBy.phone}
                      </div>
                    )}
                    {emergency.reportedBy.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {emergency.reportedBy.email}
                      </div>
                    )}
                  </div>
                </div>
                
                {emergency.status === 'active' && (
                  <Button
                    onClick={() => acknowledgeEmergency(emergency.id)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Acknowledge
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
        
        <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/20 pt-4">
          <div>Bridge Server: {BRIDGE_SERVER_URL}</div>
          <div>Last updated: {lastUpdated.toLocaleString()}</div>
          <div>Total emergencies: {emergencies.length}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyDashboard;
