import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Phone,
  Activity,
  RefreshCw,
  Filter,
  Search,
  ArrowLeft,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapContainer from '@/components/MapContainer';
import { Emergency, mockEmergencies, mockAgents, acknowledgeEmergency } from '@/data/mockData';
import { BridgeEmergency } from '@/components/EmergencyDashboard';

// Bridge server URL - change this to your bridge server URL
const BRIDGE_SERVER_URL = 'http://localhost:3001';

const MapPage = () => {
  const navigate = useNavigate();
  const [emergencies, setEmergencies] = useState<Emergency[]>(mockEmergencies);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load emergencies on component mount
  useEffect(() => {
    loadEmergencies();
    
    // Poll every 5 seconds for new emergencies
    const interval = setInterval(loadEmergencies, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadEmergencies = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching emergencies from bridge server...');
      const response = await fetch(`${BRIDGE_SERVER_URL}/api/v1/emergencies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received emergencies:', data);
      
      if (data.success && data.data.emergencies) {
        // Convert BridgeEmergency to Emergency format
        const convertedEmergencies: Emergency[] = data.data.emergencies.map((bridgeEmergency: BridgeEmergency) => ({
          id: typeof bridgeEmergency.id === 'string' 
            ? parseInt(bridgeEmergency.id.replace(/\D/g, '')) || Math.random() * 1000
            : Math.floor(bridgeEmergency.id) || Math.random() * 1000,
          title: bridgeEmergency.title || 'Unknown Emergency',
          priority: bridgeEmergency.priority || 'Medium',
          location: {
            lat: bridgeEmergency.coordinates?.latitude || 0.0,
            lng: bridgeEmergency.coordinates?.longitude || 0.0
          },
          address: bridgeEmergency.address || 'Unknown address',
          description: bridgeEmergency.description || 'No description available',
          timestamp: bridgeEmergency.timestamp || new Date().toISOString(),
          type: (bridgeEmergency.type as Emergency['type']) || 'other',
          status: bridgeEmergency.status || 'active',
          severity: bridgeEmergency.severity || 5,
          assignedUnits: bridgeEmergency.assignedUnits || [],
          createdAt: bridgeEmergency.timestamp || new Date().toISOString(),
          updatedAt: bridgeEmergency.timestamp || new Date().toISOString(),
          reportedBy: {
            id: Math.random() * 1000,
            name: bridgeEmergency.reportedBy?.name || 'Unknown Reporter',
            phone: bridgeEmergency.reportedBy?.phone || ''
          },
          contactInfo: {
            phone: bridgeEmergency.reportedBy?.phone || '',
            email: bridgeEmergency.reportedBy?.email || ''
          },
          estimatedDuration: bridgeEmergency.estimatedArrival || 'Unknown',
          images: bridgeEmergency.images || [],
          audio: bridgeEmergency.audio || null,
          video: bridgeEmergency.video || null
        }));
        
        // Combine mock data with real data from bridge server
        const combinedEmergencies = [...mockEmergencies, ...convertedEmergencies];
        setEmergencies(combinedEmergencies);
        console.log(`Loaded ${mockEmergencies.length} mock emergencies + ${convertedEmergencies.length} real emergencies = ${combinedEmergencies.length} total:`, combinedEmergencies.map(e => e.title));
      } else {
        console.log('No emergencies received from bridge server, using mock data only');
        setEmergencies(mockEmergencies);
      }
    } catch (error) {
      console.error('Failed to load emergencies from bridge server, using mock data:', error);
      setEmergencies(mockEmergencies);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencySelect = (emergency: Emergency | null) => {
    setSelectedEmergency(emergency);
  };

  const handleNavigate = (location: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const handleAcknowledge = async (emergencyId: number) => {
    try {
      // Find the emergency to get its bridge ID
      const emergency = emergencies.find(e => e.id === emergencyId);
      if (!emergency) {
        console.error('Emergency not found');
        return;
      }
      
      // Extract bridge ID from the emergency (we'll need to store this)
      const bridgeId = emergency.title.includes('Test Integration') ? 'test-integration-' + emergencyId : emergencyId.toString();
      
      console.log(`Acknowledging emergency ${bridgeId}...`);
      const response = await fetch(`${BRIDGE_SERVER_URL}/api/v1/emergencies/${bridgeId}/acknowledge`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Update the emergency status in local state
        setEmergencies(prev => 
          prev.map(emergency => 
            emergency.id === emergencyId 
              ? { ...emergency, status: 'responding' as const }
              : emergency
          )
        );
        console.log(`Emergency ${bridgeId} acknowledged successfully`);
      } else {
        console.error(`Failed to acknowledge emergency ${bridgeId}`);
      }
    } catch (error) {
      console.error('Failed to acknowledge emergency:', error);
    }
  };

  // Filter emergencies based on priority and search query
  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesPriority = filterPriority === 'all' || emergency.priority.toLowerCase() === filterPriority;
    const matchesSearch = searchQuery === '' || 
      emergency.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Floating Back Button */}
      <motion.div
        className="absolute top-4 left-4 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="sm"
          className="bg-black/90 backdrop-blur-sm border-gray-200 hover:bg-black shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
        </Button>
      </motion.div>

      {/* Swift Care Logo */}
      <motion.div
        className="absolute top-4 right-4 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-1 rounded">

            </div>
            <span className="font-bold text-gray-900 text-sm"></span>
          </div>
        </div>
      </motion.div>
      {/* Left Panel - Enhanced Emergency List */}
      <motion.div
        className="w-80 bg-gradient-glass border-r border-border/20 p-4 overflow-y-auto"
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emergency-high" />
              Active Emergencies
            </h2>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                Bridge: {emergencies.some(e => e.title.includes('Test')) ? 'Connected' : 'Mock Data Only'}
                {emergencies.some(e => e.title.includes('Test')) && emergencies.length > 5 && ' + Mock Data'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadEmergencies}
                disabled={isLoading}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search emergencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
          </div>
          
          {/* Priority Filter */}
          <div className="flex gap-2">
            {['all', 'critical', 'high', 'medium', 'low'].map((priority) => (
              <Button
                key={priority}
                variant={filterPriority === priority ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPriority(priority)}
                className="text-xs capitalize"
              >
                {priority}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Emergency List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredEmergencies.map((emergency, index) => (
              <motion.div
                key={emergency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card 
                  className={`bg-card/50 border-border/20 hover:bg-card/70 transition-all duration-200 cursor-pointer ${
                    selectedEmergency?.id === emergency.id ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                  }`}
                  onClick={() => handleEmergencySelect(emergency)}
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
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {emergency.timestamp}
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {emergency.severity}/10
                      </div>
                    </div>
                    
                    {emergency.assignedUnits && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Units: {emergency.assignedUnits.join(', ')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredEmergencies.length === 0 && (
            <motion.div
              className="text-center py-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No emergencies found</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapContainer
          emergencies={filteredEmergencies}
          selectedEmergency={selectedEmergency}
          onEmergencySelect={handleEmergencySelect}
          onNavigate={handleNavigate}
          onAcknowledge={handleAcknowledge}
        />
      </div>

      {/* Right Panel - Enhanced Agent Workflow */}
      <motion.div
        className="w-80 bg-gradient-glass border-l border-border/20 p-4 overflow-y-auto"
        initial={{ x: 320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Agent Status
        </h2>
        
        <div className="space-y-4">
          {mockAgents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="bg-card/50 border-border/20 hover:bg-card/70 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {agent.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.activity}
                      </p>
                    </div>
                    <motion.div
                      className="w-2 h-2 bg-success rounded-full"
                      animate={{ 
                        boxShadow: [
                          "0 0 5px hsl(var(--success))", 
                          "0 0 15px hsl(var(--success))", 
                          "0 0 5px hsl(var(--success))"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge 
                        variant={agent.status === 'Active' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Efficiency:</span>
                      <span className="font-semibold text-success">{agent.efficiency}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Last Update:</span>
                      <span className="text-muted-foreground">{agent.lastUpdate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System Stats */}
        <div className="mt-6 pt-6 border-t border-border/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            System Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Emergencies:</span>
              <span className="font-semibold text-foreground">{emergencies.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Response Rate:</span>
              <span className="font-semibold text-success">98.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg Response Time:</span>
              <span className="font-semibold text-foreground">4.2m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">System Uptime:</span>
              <span className="font-semibold text-success">99.8%</span>
            </div>
          </div>
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
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapPage;