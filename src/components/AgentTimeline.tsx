import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Brain, 
  Route, 
  Hospital, 
  MapPin, 
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';

const AgentTimeline = () => {
  const agents = [
    {
      id: 1,
      title: 'Input Processing',
      description: 'Emergency reports received via text, voice, or API',
      icon: MessageSquare,
      color: 'text-emergency-info',
      bgColor: 'bg-emergency-info/10',
      borderColor: 'border-emergency-info/20',
      details: ['Text/Voice Recognition', 'Data Validation', 'Initial Categorization'],
      delay: 0.2
    },
    {
      id: 2,
      title: 'Routing Agent',
      description: 'AI determines emergency type: medical, disaster, or crime',
      icon: Route,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      details: ['Pattern Recognition', 'Category Classification', 'Confidence Scoring'],
      delay: 0.4
    },
    {
      id: 3,
      title: 'Sentiment Agent',
      description: 'Analyzes urgency and assigns priority level',
      icon: Brain,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      details: ['Urgency Detection', 'Priority Assignment', 'Risk Assessment'],
      delay: 0.6
    },
    {
      id: 4,
      title: 'Resource Allocator',
      description: 'Finds nearest hospitals, stations, and available resources',
      icon: Hospital,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      details: ['Location Mapping', 'Resource Availability', 'Optimal Routing'],
      delay: 0.8
    },
    {
      id: 5,
      title: 'Priority Mapping',
      description: 'Everything plotted on interactive map with priority markers',
      icon: MapPin,
      color: 'text-emergency-high',
      bgColor: 'bg-emergency-high/10',
      borderColor: 'border-emergency-high/20',
      details: ['Visual Representation', 'Real-time Updates', 'Dispatch Coordination'],
      delay: 1.0
    }
  ];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-warning to-success rounded-full opacity-30 hidden lg:block" />
      
      <div className="space-y-12 lg:space-y-16">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            className={`flex items-center gap-8 ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } flex-col lg:flex-row`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: agent.delay, duration: 0.6 }}
          >
            {/* Content Card */}
            <div className="flex-1 max-w-lg">
              <Card className={`bg-gradient-glass border ${agent.borderColor} shadow-glass hover:shadow-glow-primary transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`p-3 rounded-xl ${agent.bgColor} border ${agent.borderColor}`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: agent.delay + 0.2, duration: 0.5 }}
                    >
                      <agent.icon className={`w-6 h-6 ${agent.color}`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {agent.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {agent.description}
                      </p>
                      
                      <div className="space-y-2">
                        {agent.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: agent.delay + 0.3 + idx * 0.1, duration: 0.4 }}
                          >
                            <Zap className={`w-3 h-3 ${agent.color}`} />
                            <span className="text-sm text-foreground">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline Node */}
            <motion.div
              className="relative z-10 hidden lg:block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: agent.delay + 0.1, duration: 0.4 }}
            >
              <div className={`w-16 h-16 rounded-full ${agent.bgColor} border-4 ${agent.borderColor} bg-card flex items-center justify-center shadow-glass`}>
                <Target className={`w-6 h-6 ${agent.color}`} />
              </div>
              
              {/* Step Number */}
              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${agent.color.replace('text-', 'bg-')} text-white text-xs font-bold flex items-center justify-center`}>
                {agent.id}
              </div>
            </motion.div>

            {/* Arrow for mobile */}
            {index < agents.length - 1 && (
              <motion.div
                className="flex justify-center lg:hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: agent.delay + 0.4, duration: 0.3 }}
              >
                <ArrowRight className="w-6 h-6 text-muted-foreground transform rotate-90" />
              </motion.div>
            )}

            {/* Spacer for desktop */}
            <div className="flex-1 max-w-lg hidden lg:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentTimeline;