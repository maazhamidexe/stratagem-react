import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp,
  Brain,
  Route,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCards from '@/components/StatsCards';
import AgentTimeline from '@/components/AgentTimeline';
import heroImage from '@/assets/hero-emergency-center.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden py-20 px-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Emergency Response Center" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Emergency Response
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Intelligence System
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered emergency routing with intelligent priority assessment, 
              real-time resource allocation, and automated response coordination.
            </p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <Button 
                onClick={() => navigate('/map')}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              >
                View Live Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            
            {/* Status Indicator */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-glass px-4 py-2 rounded-full border border-border/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
              <span className="text-sm font-medium text-foreground">System Online</span>
              <Badge variant="secondary" className="ml-2">Active</Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="px-6 -mt-10">
        <div className="container mx-auto">
          <StatsCards />
        </div>
      </section>

      {/* Agent Workflow Timeline */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How the System Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From emergency input to coordinated response - see how our AI agents 
              work together to save lives through intelligent automation.
            </p>
          </motion.div>
          
          <AgentTimeline />
        </div>
      </section>

      {/* Real-time Activity Feed */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-3xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Live System Activity
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Emergencies */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card className="bg-gradient-glass border-border/20 shadow-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-emergency-high" />
                    Recent Emergencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { type: 'Medical', location: 'Downtown Hospital', priority: 'Critical', time: '2 min ago' },
                    { type: 'Fire', location: 'Industrial District', priority: 'High', time: '5 min ago' },
                    { type: 'Accident', location: 'Highway 101', priority: 'Medium', time: '8 min ago' },
                  ].map((emergency, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{emergency.type}</span>
                          <Badge 
                            variant={emergency.priority === 'Critical' ? 'destructive' : 
                                   emergency.priority === 'High' ? 'default' : 'secondary'}
                          >
                            {emergency.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{emergency.location}</p>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {emergency.time}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Agent Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card className="bg-gradient-glass border-border/20 shadow-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Agent Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Routing Agent', status: 'Active', efficiency: '98%', icon: Route },
                    { name: 'Sentiment Agent', status: 'Active', efficiency: '96%', icon: Brain },
                    { name: 'Resource Allocator', status: 'Active', efficiency: '94%', icon: Zap },
                  ].map((agent, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <agent.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-success">{agent.efficiency}</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-success" />
                          <span className="text-xs text-success">Optimal</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;