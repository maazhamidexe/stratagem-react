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
import EmergencyDashboard from '@/components/EmergencyDashboard';
import heroImage from '@/assets/hero-emergency-center.jpg';
import bgImage from '@/assets/bg.png';
import lastSectionImage from '@/assets/lastsection.png';

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
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
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
                  ACCESS CONSOLE
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
      <section className="px-6 -mt-10 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <StatsCards />
        </div>
      </section>

      {/* Agent Workflow Timeline */}
      <section className="py-16 px-6 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
        </div>
        
        <div className="container mx-auto relative z-10">
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
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={lastSectionImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        </div>
        
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
            {/* Real Emergency Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-6"
            >
              <EmergencyDashboard />
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