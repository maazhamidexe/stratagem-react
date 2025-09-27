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
  type: 'medical' | 'fire' | 'accident' | 'police' | 'other';
  status: 'active' | 'responding' | 'resolved' | 'cancelled';
  severity: number; // 1-10 scale
  estimatedDuration?: string;
  assignedUnits?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export const mockEmergencies: Emergency[] = [
  {
    id: 1,
    title: 'Cardiac Arrest - DHA Phase 2',
    priority: 'Critical',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'DHA Phase 2, Karachi, Pakistan',
    description: 'Cardiac arrest reported in DHA Phase 2. Patient unconscious, CPR in progress. Ambulance and paramedics dispatched.',
    timestamp: '2 min ago',
    type: 'medical',
    status: 'active',
    severity: 9,
    estimatedDuration: '15-20 min',
    assignedUnits: ['EMS-101', 'FD-Karachi-Engine-54'],
    contactInfo: {
      phone: '+92-21-555-0123'
    }
  },
  {
    id: 2,
    title: 'Multi-Vehicle Collision - M2 Motorway',
    priority: 'High',
    location: { lat: 31.5204, lng: 74.3587 },
    address: 'M2 Motorway, Lahore, Pakistan',
    description: 'Multi-vehicle collision on M2 Motorway. 3 vehicles involved, multiple injuries reported. Traffic backed up for 2 km.',
    timestamp: '5 min ago',
    type: 'accident',
    status: 'responding',
    severity: 7,
    estimatedDuration: '45-60 min',
    assignedUnits: ['Lahore-Police-19th', 'FD-Lahore-Engine-23', 'EMS-205'],
    contactInfo: {
      phone: '+92-42-555-0124'
    }
  },
  {
    id: 3,
    title: 'Building Fire - F-8 Sector',
    priority: 'High',
    location: { lat: 33.6844, lng: 73.0479 },
    address: 'F-8 Sector, Islamabad, Pakistan',
    description: 'Residential building fire, 4th floor. Smoke visible from street. All residents evacuated. Fire department on scene.',
    timestamp: '8 min ago',
    type: 'fire',
    status: 'responding',
    severity: 8,
    estimatedDuration: '30-45 min',
    assignedUnits: ['FD-Islamabad-Engine-22', 'FD-Islamabad-Ladder-13', 'FD-Islamabad-Rescue-1'],
    contactInfo: {
      phone: '+92-51-555-0125'
    }
  },
  {
    id: 4,
    title: 'Suspicious Package - Liberty Market',
    priority: 'Medium',
    location: { lat: 31.5497, lng: 74.3436 },
    address: 'Liberty Market, Lahore, Pakistan',
    description: 'Suspicious package reported near Liberty Market entrance. Bomb squad requested. Area cordoned off.',
    timestamp: '12 min ago',
    type: 'police',
    status: 'active',
    severity: 5,
    estimatedDuration: '20-30 min',
    assignedUnits: ['Lahore-Police-20th', 'Lahore-Bomb-Squad'],
    contactInfo: {
      phone: '+92-42-555-0126'
    }
  },
  {
    id: 5,
    title: 'Gas Leak - Saddar Area',
    priority: 'High',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'Saddar, Karachi, Pakistan',
    description: 'Gas leak reported in building basement. Strong odor detected. SSGC and fire department responding.',
    timestamp: '15 min ago',
    type: 'other',
    status: 'responding',
    severity: 6,
    estimatedDuration: '25-35 min',
    assignedUnits: ['FD-Karachi-Hazmat-1', 'SSGC-Response'],
    contactInfo: {
      phone: '+92-21-555-0127'
    }
  },
  {
    id: 6,
    title: 'Traffic Accident - Shahrah-e-Faisal',
    priority: 'Medium',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'Shahrah-e-Faisal, Karachi, Pakistan',
    description: 'Minor collision on Shahrah-e-Faisal. No injuries reported. Traffic moving slowly.',
    timestamp: '18 min ago',
    type: 'accident',
    status: 'active',
    severity: 3,
    estimatedDuration: '10-15 min',
    assignedUnits: ['Karachi-Police-1st'],
    contactInfo: {
      phone: '+92-21-555-0128'
    }
  },
  {
    id: 7,
    title: 'Medical Emergency - Rawalpindi',
    priority: 'Medium',
    location: { lat: 33.5651, lng: 73.0169 },
    address: 'Cantt Area, Rawalpindi, Pakistan',
    description: 'Medical emergency reported in Cantt area. Patient requires immediate attention.',
    timestamp: '22 min ago',
    type: 'medical',
    status: 'responding',
    severity: 4,
    estimatedDuration: '20-25 min',
    assignedUnits: ['Rawalpindi-EMS-301'],
    contactInfo: {
      phone: '+92-51-555-0129'
    }
  },
  {
    id: 8,
    title: 'Fire Incident - Peshawar',
    priority: 'High',
    location: { lat: 34.0151, lng: 71.5249 },
    address: 'University Road, Peshawar, Pakistan',
    description: 'Commercial building fire on University Road. Fire department responding.',
    timestamp: '25 min ago',
    type: 'fire',
    status: 'responding',
    severity: 7,
    estimatedDuration: '35-40 min',
    assignedUnits: ['FD-Peshawar-Engine-15', 'FD-Peshawar-Ladder-8'],
    contactInfo: {
      phone: '+92-91-555-0130'
    }
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

export interface Hospital {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  distance?: number; // in km
  rating?: number;
  phone?: string;
  specialties?: string[];
  availableBeds?: number;
  emergencyCapacity?: 'high' | 'medium' | 'low';
}

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'Aga Khan University Hospital',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'Stadium Road, Karachi, Pakistan',
    rating: 4.5,
    phone: '+92-21-486-3000',
    specialties: ['Emergency Medicine', 'Cardiology', 'Trauma'],
    availableBeds: 12,
    emergencyCapacity: 'high'
  },
  {
    id: 'h2',
    name: 'Shaukat Khanum Memorial Hospital',
    location: { lat: 31.5204, lng: 74.3587 },
    address: '7-A Block R-3, M.A Johar Town, Lahore, Pakistan',
    rating: 4.3,
    phone: '+92-42-3590-5000',
    specialties: ['Emergency Medicine', 'Oncology', 'Surgery'],
    availableBeds: 8,
    emergencyCapacity: 'high'
  },
  {
    id: 'h3',
    name: 'Jinnah Postgraduate Medical Centre',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'Rafiqui Shaheed Road, Karachi, Pakistan',
    rating: 4.1,
    phone: '+92-21-9920-2000',
    specialties: ['Emergency Medicine', 'Psychiatry', 'Trauma'],
    availableBeds: 15,
    emergencyCapacity: 'high'
  },
  {
    id: 'h4',
    name: 'Pakistan Institute of Medical Sciences',
    location: { lat: 33.6844, lng: 73.0479 },
    address: 'Sector G-8/3, Islamabad, Pakistan',
    rating: 4.2,
    phone: '+92-51-926-0000',
    specialties: ['Emergency Medicine', 'Orthopedics', 'Cardiology'],
    availableBeds: 6,
    emergencyCapacity: 'medium'
  },
  {
    id: 'h5',
    name: 'Liaquat National Hospital',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'Stadium Road, Karachi, Pakistan',
    rating: 4.4,
    phone: '+92-21-111-456-456',
    specialties: ['Emergency Medicine', 'Neurosurgery', 'Pediatrics'],
    availableBeds: 10,
    emergencyCapacity: 'high'
  },
  {
    id: 'h6',
    name: 'Holy Family Hospital',
    location: { lat: 33.5651, lng: 73.0169 },
    address: 'Cantt Area, Rawalpindi, Pakistan',
    rating: 4.0,
    phone: '+92-51-927-0000',
    specialties: ['Emergency Medicine', 'General Surgery', 'Pediatrics'],
    availableBeds: 8,
    emergencyCapacity: 'medium'
  },
  {
    id: 'h7',
    name: 'Lady Reading Hospital',
    location: { lat: 34.0151, lng: 71.5249 },
    address: 'University Road, Peshawar, Pakistan',
    rating: 3.8,
    phone: '+92-91-921-0000',
    specialties: ['Emergency Medicine', 'Trauma', 'General Medicine'],
    availableBeds: 12,
    emergencyCapacity: 'high'
  }
];

export const findNearestHospitals = async (
  location: { lat: number; lng: number },
  radius: number = 5
): Promise<Hospital[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple distance calculation (in real app, use proper geolocation API)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return mockHospitals
    .map(hospital => ({
      ...hospital,
      distance: calculateDistance(location.lat, location.lng, hospital.location.lat, hospital.location.lng)
    }))
    .filter(hospital => hospital.distance! <= radius)
    .sort((a, b) => a.distance! - b.distance!);
};

export const updateEmergencyStatus = async (id: number, status: Emergency['status']): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`Emergency ${id} status updated to: ${status}`);
  return true;
};