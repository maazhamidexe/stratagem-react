// Mock data for the emergency response system
// TODO: Replace with actual API endpoints

export interface Emergency {
  id: number;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  description: string;
  timestamp: string;
  type: 'medical' | 'fire' | 'accident' | 'crime' | 'disaster';
  status: 'active' | 'responding' | 'resolved';
  assignedUnits?: string[];
}

export const mockEmergencies: Emergency[] = [
  {
    id: 1,
    title: 'Medical Emergency',
    priority: 'Critical',
    location: { lat: 40.7128, lng: -74.0060 },
    address: '123 Main St, New York, NY',
    description: 'Cardiac arrest reported, patient unconscious. Ambulance dispatched immediately.',
    timestamp: '2 min ago',
    type: 'medical',
    status: 'active',
    assignedUnits: ['AMB-001', 'PARA-05']
  },
  {
    id: 2,
    title: 'Structure Fire',
    priority: 'High',
    location: { lat: 40.7589, lng: -73.9851 },
    address: '456 Broadway, New York, NY',
    description: 'Apartment building fire on 3rd floor. Multiple units responding, evacuations in progress.',
    timestamp: '5 min ago',
    type: 'fire',
    status: 'responding',
    assignedUnits: ['ENG-12', 'LADDER-08', 'CHIEF-02']
  },
  {
    id: 3,
    title: 'Multi-Vehicle Accident',
    priority: 'Medium',
    location: { lat: 40.7505, lng: -73.9934 },
    address: 'Times Square, New York, NY',
    description: 'Three-car collision with minor injuries. Traffic control needed.',
    timestamp: '8 min ago',
    type: 'accident',
    status: 'active',
    assignedUnits: ['POLICE-15', 'AMB-003']
  },
  {
    id: 4,
    title: 'Break-in in Progress',
    priority: 'High',
    location: { lat: 40.7282, lng: -73.9942 },
    address: '789 Park Ave, New York, NY',
    description: 'Silent alarm triggered at residential building. Officers en route.',
    timestamp: '12 min ago',
    type: 'crime',
    status: 'responding',
    assignedUnits: ['POLICE-07', 'POLICE-23']
  },
  {
    id: 5,
    title: 'Gas Leak Report',
    priority: 'Medium',
    location: { lat: 40.7614, lng: -73.9776 },
    address: '321 Central Park West, NY',
    description: 'Strong gas odor reported by multiple residents. Utility company notified.',
    timestamp: '15 min ago',
    type: 'disaster',
    status: 'active',
    assignedUnits: ['HAZMAT-01', 'ENG-09']
  }
];

export interface Agent {
  name: string;
  status: 'Active' | 'Idle' | 'Processing' | 'Offline';
  efficiency: string;
  activity: string;
  lastUpdate: string;
}

export const mockAgents: Agent[] = [
  {
    name: 'Routing Agent',
    status: 'Active',
    efficiency: '98.2%',
    activity: 'Processing 3 new emergency reports',
    lastUpdate: '30 sec ago'
  },
  {
    name: 'Sentiment Agent',
    status: 'Active',
    efficiency: '96.7%',
    activity: 'Analyzing priority levels for 5 incidents',
    lastUpdate: '45 sec ago'
  },
  {
    name: 'Resource Allocator',
    status: 'Processing',
    efficiency: '94.1%',
    activity: 'Finding optimal resource allocation',
    lastUpdate: '1 min ago'
  }
];

export interface SystemStats {
  activeEmergencies: number;
  responseTeams: number;
  coverageAreas: number;
  avgResponseTime: string;
  systemUptime: string;
  totalIncidentsToday: number;
}

export const mockSystemStats: SystemStats = {
  activeEmergencies: 24,
  responseTeams: 48,
  coverageAreas: 156,
  avgResponseTime: '4.2m',
  systemUptime: '99.8%',
  totalIncidentsToday: 127
};

// API simulation functions
export const fetchEmergencies = async (): Promise<Emergency[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockEmergencies;
};

export const fetchAgentStatus = async (): Promise<Agent[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAgents;
};

export const fetchSystemStats = async (): Promise<SystemStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSystemStats;
};

export const acknowledgeEmergency = async (emergencyId: number): Promise<boolean> => {
  // TODO: Replace with actual API endpoint
  console.log(`Acknowledging emergency ${emergencyId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const findNearestHospitals = async (location: { lat: number; lng: number }) => {
  // TODO: Replace with actual Places API call
  console.log('Finding nearest hospitals for location:', location);
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { name: 'NYC General Hospital', distance: '0.8 miles', address: '123 Hospital Ave' },
    { name: 'Emergency Medical Center', distance: '1.2 miles', address: '456 Care St' }
  ];
};