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
  ArrowRight,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCards from '@/components/StatsCards';
import AgentTimeline from '@/components/AgentTimeline';
import heroImage from '@/assets/hero-emergency-center.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>

      {/* Hero Section with Enhanced Design */}
      <section className="relative py-24 px-6">
        {/* Background Image with Sophisticated Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Emergency Response Center" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* System Status Banner */}
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-glass px-6 py-3 rounded-full border border-primary/20 mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="w-3 h-3 bg-success rounded-full"
                animate={{ 
                  boxShadow: ["0 0 5px hsl(var(--success))", "0 0 20px hsl(var(--success))", "0 0 5px hsl(var(--success))"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-foreground">SYSTEM OPERATIONAL</span>
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                99.8% UPTIME
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              SWIFT
              <motion.span 
                className="bg-gradient-primary bg-clip-text text-transparent block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                CARE
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Rapid emergency response with intelligent priority assessment, 
              real-time resource optimization, and automated coordination protocols.
            </motion.p>
            
            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate('/map')}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-500 text-lg px-10 py-6 rounded-2xl font-semibold group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ translateX: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  ACCESS LIVE MAP
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:bg-primary/10 text-lg px-10 py-6 rounded-2xl font-semibold backdrop-blur-sm"
                >
                  <Brain className="w-5 h-5 mr-3" />
                  SYSTEM ANALYTICS
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Live Metrics Bar */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {[
                { label: "Active Alerts", value: "24", icon: AlertTriangle, color: "text-emergency-high" },
                { label: "Response Units", value: "48", icon: Users, color: "text-primary" },
                { label: "Avg Response", value: "4.2m", icon: Clock, color: "text-success" },
                { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-success" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-glass backdrop-blur-sm border border-border/20 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <metric.icon className={`w-6 h-6 ${metric.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</div>
                </motion.div>
              ))}
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

      {/* Enhanced Real-time Activity Feed */}
      <section className="py-20 px-6 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/50" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Live Command Center
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of system operations, active emergencies, and AI agent performance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Enhanced Recent Emergencies */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-glass border-border/30 shadow-glass backdrop-blur-md hover:shadow-glow-primary transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <AlertTriangle className="w-7 h-7 text-emergency-high" />
                    </motion.div>
                    Active Emergency Feed
                    <Badge variant="secondary" className="bg-emergency-high/20 text-emergency-high border-emergency-high/30">
                      LIVE
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      type: 'Medical Emergency', 
                      location: 'Downtown Medical Center', 
                      priority: 'Critical', 
                      time: '2 min ago',
                      id: 'MED-2024-001',
                      status: 'Dispatched',
                      responders: 3
                    },
                    { 
                      type: 'Structure Fire', 
                      location: 'Industrial District Block 5', 
                      priority: 'High', 
                      time: '5 min ago',
                      id: 'FIR-2024-047',
                      status: 'En Route',
                      responders: 8
                    },
                    { 
                      type: 'Traffic Incident', 
                      location: 'Highway 101 Mile Marker 45', 
                      priority: 'Medium', 
                      time: '8 min ago',
                      id: 'TRA-2024-156',
                      status: 'Responding',
                      responders: 2
                    },
                  ].map((emergency, index) => (
                    <motion.div
                      key={index}
                      className="group relative p-5 rounded-xl bg-card/40 border border-border/20 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      {/* Priority indicator */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                        emergency.priority === 'Critical' ? 'bg-emergency-critical' :
                        emergency.priority === 'High' ? 'bg-emergency-high' : 'bg-emergency-medium'
                      }`} />
                      
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                              {emergency.type}
                            </span>
                            <Badge 
                              variant={emergency.priority === 'Critical' ? 'destructive' : 
                                     emergency.priority === 'High' ? 'default' : 'secondary'}
                              className="font-semibold"
                            >
                              {emergency.priority}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 font-medium">{emergency.location}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">ID: {emergency.id}</span>
                            <span className="flex items-center gap-1 text-success">
                              <Users className="w-3 h-3" />
                              {emergency.responders} units
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {emergency.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Clock className="w-4 h-4" />
                            {emergency.time}
                          </div>
                          <motion.div
                            className={`w-3 h-3 rounded-full ${
                              emergency.priority === 'Critical' ? 'bg-emergency-critical' :
                              emergency.priority === 'High' ? 'bg-emergency-high' : 'bg-emergency-medium'
                            }`}
                            animate={{ 
                              boxShadow: [
                                "0 0 5px currentColor", 
                                "0 0 15px currentColor", 
                                "0 0 5px currentColor"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Agent Performance Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-glass border-border/30 shadow-glass backdrop-blur-md hover:shadow-glow-primary transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Brain className="w-7 h-7 text-primary" />
                    </motion.div>
                    AI Agent Performance
                    <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                      OPTIMAL
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { 
                      name: 'Neural Routing Engine', 
                      status: 'Active', 
                      efficiency: '98.7%', 
                      icon: Route,
                      load: 87,
                      processed: '2.1k',
                      trend: '+12%'
                    },
                    { 
                      name: 'Sentiment Analysis Core', 
                      status: 'Processing', 
                      efficiency: '96.4%', 
                      icon: Brain,
                      load: 92,
                      processed: '1.8k',
                      trend: '+8%'
                    },
                    { 
                      name: 'Resource Optimizer', 
                      status: 'Allocating', 
                      efficiency: '94.8%', 
                      icon: Zap,
                      load: 76,
                      processed: '856',
                      trend: '+15%'
                    },
                  ].map((agent, index) => (
                    <motion.div
                      key={index}
                      className="group relative p-5 rounded-xl bg-card/40 border border-border/20 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <motion.div
                            className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300"
                            whileHover={{ rotate: 5 }}
                          >
                            <agent.icon className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                {agent.name}
                              </p>
                              <Badge 
                                variant="secondary" 
                                className="bg-success/10 text-success border-success/20 text-xs"
                              >
                                <Activity className="w-3 h-3 mr-1" />
                                {agent.status}
                              </Badge>
                            </div>
                            
                            {/* Performance metrics */}
                            <div className="grid grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-muted-foreground">Efficiency</span>
                                <div className="font-bold text-success">{agent.efficiency}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Processed</span>
                                <div className="font-bold text-foreground">{agent.processed}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Trend</span>
                                <div className="font-bold text-success flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {agent.trend}
                                </div>
                              </div>
                            </div>
                            
                            {/* Load indicator */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>System Load</span>
                                <span>{agent.load}%</span>
                              </div>
                              <div className="h-2 bg-border/20 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-success via-primary to-success"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${agent.load}%` }}
                                  transition={{ delay: 1.4 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status light */}
                        <motion.div
                          className="w-4 h-4 rounded-full bg-success"
                          animate={{ 
                            boxShadow: [
                              "0 0 5px hsl(var(--success))", 
                              "0 0 20px hsl(var(--success))", 
                              "0 0 5px hsl(var(--success))"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
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