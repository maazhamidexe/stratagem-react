import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, Activity } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <nav className="bg-gradient-glass backdrop-blur-md border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and System Name */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow-primary">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EmergencyMesh</h1>
              <p className="text-xs text-muted-foreground">Intelligent Response System</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <Activity className="w-4 h-4" />
              Dashboard
            </Button>
            
            <Button
              variant={currentPath === '/map' ? 'default' : 'ghost'}
              onClick={() => navigate('/map')}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              Live Map
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;