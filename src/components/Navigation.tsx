import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, Activity } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Hide navbar on map page
  if (currentPath === '/map') {
    return null;
  }

  return (
    <nav className="bg-gradient-glass backdrop-blur-md border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and System Name */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-primary p-1.5 rounded-md shadow-glow-primary">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Swift Care</h1>
              <p className="text-xs text-muted-foreground">Emergency Response</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 transition-all duration-300 text-sm px-3 py-1.5"
            >
              <Activity className="w-4 h-4" />
              Dashboard
            </Button>
            
            <Button
              variant={currentPath === '/map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/map')}
              className="flex items-center gap-1.5 transition-all duration-300 text-sm px-3 py-1.5"
            >
              <MapPin className="w-4 h-4" />
              Console
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;