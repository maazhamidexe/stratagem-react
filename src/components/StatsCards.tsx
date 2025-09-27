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
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: stat.delay, duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
          className="group cursor-pointer"
        >
          <Card className="relative overflow-hidden bg-gradient-glass border-border/30 shadow-glass backdrop-blur-md hover:shadow-glow-primary transition-all duration-500 group-hover:border-primary/40">
            {/* Animated Background Gradient */}
            <motion.div 
              className={`absolute inset-0 ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              initial={false}
            />
            
            {/* Animated Border Light */}
            <motion.div
              className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 rounded-lg transition-all duration-500"
              initial={false}
            />
            
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <motion.p 
                    className="text-muted-foreground text-sm font-semibold mb-2 uppercase tracking-wider"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {stat.title}
                  </motion.p>
                  <motion.div className="relative">
                    <motion.p 
                      className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: stat.delay + 0.2, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.p>
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 text-4xl font-bold text-primary opacity-0 group-hover:opacity-30 blur-sm pointer-events-none"
                      initial={false}
                    >
                      {stat.value}
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div
                  className="relative p-4 rounded-2xl bg-card/30 border border-border/20 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300"
                  initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: stat.delay + 0.1, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className={`w-7 h-7 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  
                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 20px ${stat.iconColor.replace('text-', 'hsl(var(--')})/0.3)`
                    }}
                    initial={false}
                  />
                </motion.div>
              </div>
              
              <motion.div 
                className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: stat.delay + 0.4, duration: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <TrendingUp className="w-4 h-4 text-success group-hover:text-primary transition-colors duration-300" />
                </motion.div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">
                  {stat.change}
                </span>
                
                {/* Progress bar animation */}
                <motion.div 
                  className="flex-1 h-1 bg-border/20 rounded-full overflow-hidden ml-2"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: stat.delay + 0.6, duration: 0.8 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-success to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: stat.delay + 0.8, duration: 1.2, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>

              {/* Pulse effect for critical stats */}
              {stat.title === 'Active Emergencies' && (
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-emergency-high rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;