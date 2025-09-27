import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Brain, 
  Route, 
  Hospital, 
  MapPin, 
  ArrowRight,
  Zap,
  Target,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const AgentTimeline = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  
  const agents = [
    {
      id: 1,
      title: 'Emergency Input Processing',
      description: 'Advanced voice and text processing with real-time sentiment analysis and emergency classification',
      icon: MessageSquare,
      color: 'text-emergency-info',
      bgColor: 'bg-emergency-info/10',
      borderColor: 'border-emergency-info/20',
      details: ['Natural Language Processing', 'Voice Recognition AI', 'Multi-channel Input'],
      status: 'Processing',
      metrics: { processed: '2.3k', accuracy: '99.2%', avgTime: '0.8s' },
      delay: 0.2
    },
    {
      id: 2,
      title: 'Intelligent Route Classification',
      description: 'Machine learning algorithms determine emergency type with advanced pattern recognition',
      icon: Route,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      details: ['Deep Learning Models', 'Pattern Recognition', 'Confidence Scoring'],
      status: 'Analyzing',
      metrics: { classified: '1.8k', accuracy: '97.8%', categories: '12' },
      delay: 0.4
    },
    {
      id: 3,
      title: 'Priority Assessment Engine',
      description: 'AI-powered urgency analysis with emotional state detection and risk scoring',
      icon: Brain,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      details: ['Sentiment Analysis', 'Risk Assessment', 'Priority Algorithms'],
      status: 'Evaluating',
      metrics: { evaluated: '1.8k', critical: '156', confidence: '94%' },
      delay: 0.6
    },
    {
      id: 4,
      title: 'Smart Resource Allocation',
      description: 'Optimal resource deployment with real-time availability tracking and route optimization',
      icon: Hospital,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      details: ['Geospatial Analysis', 'Resource Tracking', 'Route Optimization'],
      status: 'Dispatching',
      metrics: { allocated: '356', available: '89%', efficiency: '96%' },
      delay: 0.8
    },
    {
      id: 5,
      title: 'Live Command Coordination',
      description: 'Real-time mapping and coordination with integrated command center operations',
      icon: MapPin,
      color: 'text-emergency-high',
      bgColor: 'bg-emergency-high/10',
      borderColor: 'border-emergency-high/20',
      details: ['Live Mapping', 'Real-time Updates', 'Command Integration'],
      status: 'Coordinating',
      metrics: { coordinated: '124', active: '24', success: '98%' },
      delay: 1.0
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Enhanced Timeline Visualization */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-primary via-warning to-success rounded-full opacity-40"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Flow animation */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-primary to-transparent rounded-full"
          animate={{ y: [0, "calc(100vh - 100px)"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="space-y-16 lg:space-y-20">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            className={`flex items-center gap-12 ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } flex-col lg:flex-row`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: agent.delay, duration: 0.8 }}
            onHoverStart={() => setActiveAgent(index)}
          >
            {/* Enhanced Content Card */}
            <motion.div 
              className="flex-1 max-w-2xl"
              whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`relative overflow-hidden bg-gradient-glass border-2 ${agent.borderColor} shadow-glass hover:shadow-glow-primary transition-all duration-500 backdrop-blur-md group`}>
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute inset-0 ${agent.bgColor} opacity-0 group-hover:opacity-20`}
                  initial={false}
                  animate={{ opacity: activeAgent === index ? 0.15 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                <CardContent className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      className={`relative p-4 rounded-2xl ${agent.bgColor} border-2 ${agent.borderColor} group-hover:scale-110 transition-transform duration-300`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: agent.delay + 0.2, duration: 0.6, type: "spring" }}
                    >
                      <agent.icon className={`w-8 h-8 ${agent.color}`} />
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                        style={{
                          boxShadow: `0 0 20px ${agent.color.replace('text-', 'hsl(var(--')})/0.4)`
                        }}
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {agent.title}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`${agent.bgColor} ${agent.color} border ${agent.borderColor} font-semibold px-3 py-1`}
                        >
                          <Activity className="w-3 h-3 mr-1" />
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                        {agent.description}
                      </p>
                      
                      {/* Enhanced capabilities list */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {agent.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/10 group-hover:bg-card/50 transition-all duration-300"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: agent.delay + 0.4 + idx * 0.1, duration: 0.5 }}
                          >
                            <CheckCircle className={`w-4 h-4 ${agent.color} flex-shrink-0`} />
                            <span className="text-sm text-foreground font-medium">{detail}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Performance metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(agent.metrics).map(([key, value], metricIndex) => (
                          <motion.div
                            key={key}
                            className="text-center p-3 rounded-lg bg-card/20 border border-border/10 group-hover:bg-primary/5 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: agent.delay + 0.6 + metricIndex * 0.1, duration: 0.5 }}
                          >
                            <div className={`text-xl font-bold ${agent.color} group-hover:text-primary transition-colors duration-300`}>
                              {value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                              {key}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Progress indicator */}
                <motion.div
                  className={`h-1 ${agent.color.replace('text-', 'bg-')}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: agent.delay + 0.8, duration: 1.5, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </Card>
            </motion.div>

            {/* Enhanced Timeline Node */}
            <motion.div
              className="relative z-10 hidden lg:block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: agent.delay + 0.1, duration: 0.6, type: "spring" }}
            >
              <div className={`relative w-20 h-20 rounded-full ${agent.bgColor} border-4 ${agent.borderColor} bg-card flex items-center justify-center shadow-glass group-hover:shadow-glow-primary transition-all duration-300`}>
                <Target className={`w-8 h-8 ${agent.color}`} />
                
                {/* Pulse rings */}
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${agent.borderColor} opacity-60`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: agent.delay }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full border ${agent.borderColor} opacity-40`}
                  animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: agent.delay + 0.5 }}
                />
              </div>
              
              {/* Enhanced step indicator */}
              <motion.div 
                className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${agent.color.replace('text-', 'bg-')} text-white text-sm font-bold flex items-center justify-center shadow-lg`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: agent.delay + 0.3, duration: 0.4, type: "spring" }}
              >
                {agent.id}
              </motion.div>

              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: agent.delay + 0.5, duration: 0.5 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${agent.color.replace('text-', 'bg-')}`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-muted-foreground font-semibold">ACTIVE</span>
              </motion.div>
            </motion.div>

            {/* Mobile flow arrow */}
            {index < agents.length - 1 && (
              <motion.div
                className="flex justify-center lg:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: agent.delay + 0.4, duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-primary transform rotate-90" />
                  </motion.div>
                  <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
                </div>
              </motion.div>
            )}

            {/* Spacer for desktop layout */}
            <div className="flex-1 max-w-2xl hidden lg:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentTimeline;