import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Active Emergencies',
      value: '24',
      change: '+3 from last hour',
      icon: AlertTriangle,
      iconColor: 'text-emergency-high',
      bgGradient: 'bg-gradient-emergency',
      delay: 0.1
    },
    {
      title: 'Response Teams',
      value: '48',
      change: '12 available',
      icon: Users,
      iconColor: 'text-primary',
      bgGradient: 'bg-gradient-primary',
      delay: 0.2
    },
    {
      title: 'Coverage Areas',
      value: '156',
      change: '98% city coverage',
      icon: MapPin,
      iconColor: 'text-success',
      bgGradient: 'bg-gradient-success',
      delay: 0.3
    },
    {
      title: 'Avg Response Time',
      value: '4.2m',
      change: '-30s improvement',
      icon: Clock,
      iconColor: 'text-emergency-info',
      bgGradient: 'bg-gradient-primary',
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: stat.delay, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="relative overflow-hidden bg-gradient-glass border-border/20 shadow-glass backdrop-blur-sm hover:shadow-glow-primary transition-all duration-300">
            {/* Gradient Background */}
            <div className={`absolute inset-0 ${stat.bgGradient} opacity-5`} />
            
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <motion.p 
                    className="text-3xl font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: stat.delay + 0.2, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                
                <motion.div
                  className={`p-3 rounded-xl bg-card/20 border border-border/10`}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: stat.delay + 0.1, duration: 0.6 }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </motion.div>
              </div>
              
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stat.delay + 0.3, duration: 0.5 }}
              >
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">
                  {stat.change}
                </span>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;