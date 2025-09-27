// Emergency data interface matching backend API
// Hospitals will be fetched from Google Places API

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
  timestamp: string; // ISO 8601 format
  type: 'medical' | 'fire' | 'accident' | 'police' | 'other';
  status: 'active' | 'responding' | 'resolved' | 'cancelled';
  severity: number; // 1-10 scale
  estimatedDuration?: string;
  assignedUnits?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
  reportedBy: {
    id: number;
    name: string;
    phone?: string;
  };
  images?: string[];
  audio?: string;
  video?: string;
}

// Google Places API hospital interface
export interface GoogleHospital {
  place_id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating: number;
  user_ratings_total: number;
  price_level?: number;
  types: string[];
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  photos?: Array<{
    photo_reference?: string;
    height?: number;
    width?: number;
  }>;
  vicinity: string;
  business_status?: string;
}

export const mockEmergencies: Emergency[] = [
  {
    id: 1,
    title: 'Cardiac Arrest - DHA Phase 2',
    priority: 'Critical',
    location: { lat: 24.8607, lng: 67.0011 },
    address: 'DHA Phase 2, Karachi, Pakistan',
    description: 'Cardiac arrest reported in DHA Phase 2. Patient unconscious, CPR in progress. Ambulance and paramedics dispatched.',
    timestamp: '2024-01-15T10:28:00Z',
    type: 'medical',
    status: 'active',
    severity: 9,
    estimatedDuration: '15-20 min',
    assignedUnits: ['EMS-101', 'FD-Karachi-Engine-54'],
    contactInfo: {
      phone: '+92-21-555-0123'
    },
    createdAt: '2024-01-15T10:28:00Z',
    updatedAt: '2024-01-15T10:28:00Z',
    reportedBy: {
      id: 123,
      name: 'John Doe',
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
    timestamp: '2024-01-15T10:25:00Z',
    type: 'accident',
    status: 'responding',
    severity: 7,
    estimatedDuration: '45-60 min',
    assignedUnits: ['Lahore-Police-19th', 'FD-Lahore-Engine-23', 'EMS-205'],
    contactInfo: {
      phone: '+92-42-555-0124'
    },
    createdAt: '2024-01-15T10:25:00Z',
    updatedAt: '2024-01-15T10:25:00Z',
    reportedBy: {
      id: 124,
      name: 'Sarah Ahmed',
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
    timestamp: '2024-01-15T10:22:00Z',
    type: 'fire',
    status: 'responding',
    severity: 8,
    estimatedDuration: '30-45 min',
    assignedUnits: ['FD-Islamabad-Engine-22', 'FD-Islamabad-Ladder-13', 'FD-Islamabad-Rescue-1'],
    contactInfo: {
      phone: '+92-51-555-0125'
    },
    createdAt: '2024-01-15T10:22:00Z',
    updatedAt: '2024-01-15T10:22:00Z',
    reportedBy: {
      id: 125,
      name: 'Ali Khan',
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
    timestamp: '2024-01-15T10:18:00Z',
    type: 'police',
    status: 'active',
    severity: 5,
    estimatedDuration: '20-30 min',
    assignedUnits: ['Lahore-Police-20th', 'Lahore-Bomb-Squad'],
    contactInfo: {
      phone: '+92-42-555-0126'
    },
    createdAt: '2024-01-15T10:18:00Z',
    updatedAt: '2024-01-15T10:18:00Z',
    reportedBy: {
      id: 126,
      name: 'Fatima Sheikh',
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
    timestamp: '2024-01-15T10:15:00Z',
    type: 'other',
    status: 'responding',
    severity: 6,
    estimatedDuration: '25-35 min',
    assignedUnits: ['FD-Karachi-Hazmat-1', 'SSGC-Response'],
    contactInfo: {
      phone: '+92-21-555-0127'
    },
    createdAt: '2024-01-15T10:15:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    reportedBy: {
      id: 127,
      name: 'Hassan Ali',
      phone: '+92-21-555-0127'
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
export const fetchAgentStatus = async (): Promise<Agent[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAgents;
};

export const fetchSystemStats = async (): Promise<SystemStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSystemStats;
};




export const updateEmergencyStatus = async (id: number, status: Emergency['status']): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`Emergency ${id} status updated to: ${status}`);
  return true;
};

// Backend API functions
export const fetchEmergencies = async (): Promise<Emergency[]> => {
  try {
    // Replace with actual backend API call
    const response = await fetch('/api/v1/emergencies', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.emergencies || [];
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    // Fallback to mock data
    return mockEmergencies;
  }
};

export const acknowledgeEmergency = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/v1/emergencies/${id}/acknowledge`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error acknowledging emergency:', error);
    return false;
  }
};

// Google Places API functions
export const findNearestHospitals = async (
  location: { lat: number; lng: number },
  radius: number = 5
): Promise<GoogleHospital[]> => {
  if (!window.google?.maps?.places) {
    console.error('Google Places API not loaded');
    return [];
  }

  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: radius * 1000, // Convert km to meters
      type: 'hospital',
      keyword: 'emergency hospital medical',
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const hospitals: GoogleHospital[] = results.map((place: any) => ({
            place_id: place.place_id,
            name: place.name,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            address: place.vicinity,
            rating: place.rating || 0,
            user_ratings_total: place.user_ratings_total || 0,
            price_level: place.price_level,
            types: place.types,
            opening_hours: place.opening_hours,
            formatted_phone_number: place.formatted_phone_number,
            international_phone_number: place.international_phone_number,
            website: place.website,
            photos: place.photos,
            vicinity: place.vicinity,
            business_status: place.business_status,
          }));
          resolve(hospitals);
        } else {
          console.error('Places API error:', status);
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error finding nearest hospitals:', error);
    return [];
  }
};

export const getPlaceDetails = async (placeId: string): Promise<GoogleHospital | null> => {
  if (!window.google?.maps?.places) {
    console.error('Google Places API not loaded');
    return null;
  }

  try {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const request = {
      placeId: placeId,
      fields: [
        'place_id',
        'name',
        'geometry',
        'formatted_address',
        'rating',
        'user_ratings_total',
        'price_level',
        'types',
        'opening_hours',
        'formatted_phone_number',
        'international_phone_number',
        'website',
        'photos',
        'vicinity',
        'business_status',
      ],
    };

    return new Promise((resolve, reject) => {
      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const hospital: GoogleHospital = {
            place_id: place.place_id!,
            name: place.name!,
            location: {
              lat: place.geometry!.location!.lat(),
              lng: place.geometry!.location!.lng(),
            },
            address: place.formatted_address || place.vicinity!,
            rating: place.rating || 0,
            user_ratings_total: place.user_ratings_total || 0,
            price_level: place.price_level,
            types: place.types || [],
            opening_hours: place.opening_hours,
            formatted_phone_number: place.formatted_phone_number,
            international_phone_number: place.international_phone_number,
            website: place.website,
            photos: place.photos,
            vicinity: place.vicinity!,
            business_status: place.business_status,
          };
          resolve(hospital);
        } else {
          console.error('Place details error:', status);
          reject(new Error(`Place details error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};

// Google Directions API functions
export const getDirections = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
): Promise<google.maps.DirectionsResult | null> => {
  if (!window.google?.maps) {
    console.error('Google Maps API not loaded');
    return null;
  }

  try {
    const directionsService = new window.google.maps.DirectionsService();
    
    const request: google.maps.DirectionsRequest = {
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(destination.lat, destination.lng),
      travelMode: travelMode,
      avoidHighways: false,
      avoidTolls: false,
    };

    return new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          resolve(result);
        } else {
          console.error('Directions API error:', status);
          reject(new Error(`Directions API error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error getting directions:', error);
    return null;
  }
};

export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
        // Fallback to default location (Karachi, Pakistan)
        resolve({
          lat: 24.8607,
          lng: 67.0011,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};