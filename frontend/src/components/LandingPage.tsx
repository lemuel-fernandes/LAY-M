import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, Calendar, BarChart3, Camera, Award, MessageSquare, Zap, TrendingUp, Activity, Bot, Sparkles, ArrowRight, Play, CheckCircle, Star, Globe, Shield, Lightbulb, Target } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Real-time insights and predictions for every aspect of your event',
      color: '#3b82f6'
    },
    {
      icon: Users,
      title: 'Smart Volunteer Management',
      description: 'Optimize volunteer assignments with AI efficiency scoring',
      color: '#10b981'
    },
    {
      icon: Camera,
      title: 'Intelligent Media Gallery',
      description: 'Computer vision analysis for engagement and quality metrics',
      color: '#8b5cf6'
    },
    {
      icon: MessageSquare,
      title: 'Speaker Intelligence',
      description: 'AI-driven speaker performance and audience matching',
      color: '#f59e0b'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Events Managed', icon: Calendar },
    { number: '500K+', label: 'Attendees Served', icon: Users },
    { number: '98%', label: 'Efficiency Gain', icon: TrendingUp },
    { number: '24/7', label: 'AI Monitoring', icon: Activity }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Event Director, TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      text: 'SYNKRONIS transformed how we manage events. The AI insights are incredible!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Conference Manager, StartupHub',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      text: 'The volunteer management system alone saved us 40 hours of planning time.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Academic Conference Organizer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      text: 'Speaker insights helped us create the most engaging lineup ever.',
      rating: 5
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleDemoClick = () => {
    // You can replace this with actual demo logic
    alert('Demo video would open here! You can integrate with a video modal or redirect to a demo page.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .hover-glow {
          transition: all 0.3s ease;
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }} />

      {/* Floating AI Elements */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', zIndex: 1, opacity: 0.3 }}>
        <Brain size={60} color="#3b82f6" style={{ animation: 'float 6s ease-in-out infinite' }} />
      </div>
      <div style={{ position: 'fixed', top: '60%', right: '10%', zIndex: 1, opacity: 0.2 }}>
        <Sparkles size={40} color="#8b5cf6" style={{ animation: 'float 4s ease-in-out infinite reverse' }} />
      </div>
      <div style={{ position: 'fixed', bottom: '20%', left: '15%', zIndex: 1, opacity: 0.25 }}>
        <Zap size={50} color="#10b981" style={{ animation: 'float 5s ease-in-out infinite' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Navigation */}
        <nav style={{
          padding: '20px 0',
          borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Brain size={24} color="white" />
              </div>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  SYNKRONIS
                </h1>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button 
                onClick={() => scrollToSection('features')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#9ca3af', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  transition: 'color 0.3s',
                  padding: '8px 12px',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#60a5fa';
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#9ca3af', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  transition: 'color 0.3s',
                  padding: '8px 12px',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#60a5fa';
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Testimonials
              </button>
              <button 
                onClick={navigateToDashboard}
                className="hover-glow"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Enter Dashboard
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}>
              {/* Left Column */}
              <div style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    color: '#60a5fa',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={16} />
                    Powered by Advanced AI
                  </span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'bold',
                  lineHeight: '1.1',
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  The Future of
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Event Intelligence
                  </span>
                </h1>

                <p style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  color: '#9ca3af',
                  marginBottom: '32px'
                }}>
                  Revolutionize your event management with AI-powered insights, real-time analytics, and intelligent automation. From volunteers to speakers, every aspect optimized by artificial intelligence.
                </p>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={navigateToLogin}
                    className="hover-glow"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '16px 32px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Play size={20} />
                    Start Free Trial
                  </button>
                  <button 
                    onClick={handleDemoClick}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '16px 32px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    Watch Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  fontSize: '14px',
                  color: '#6b7280',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={16} color="#10b981" />
                    Enterprise Secure
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} color="#3b82f6" />
                    Global Scale
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="#f59e0b" />
                    Real-time AI
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Dashboard Preview */}
              <div style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease-out 0.3s'
              }}>
                <div style={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderRadius: '24px',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  padding: '32px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#60a5fa',
                      marginBottom: '12px'
                    }}>
                      Live AI Dashboard
                    </h3>
                    <div style={{
                      height: '4px',
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981, #f59e0b)',
                      borderRadius: '2px',
                      marginBottom: '20px'
                    }} />
                  </div>

                  {/* Rotating Features */}
                  <div style={{ minHeight: '200px' }}>
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          style={{
                            display: currentFeature === index ? 'block' : 'none',
                            opacity: currentFeature === index ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                          }}
                        >
                          <div style={{
                            backgroundColor: 'rgba(55, 65, 81, 0.5)',
                            borderRadius: '16px',
                            padding: '20px',
                            border: `1px solid ${feature.color}20`
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                              <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: `${feature.color}20`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px'
                              }}>
                                <Icon size={24} color={feature.color} />
                              </div>
                              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                                {feature.title}
                              </h4>
                            </div>
                            <p style={{ margin: 0, color: '#9ca3af', lineHeight: '1.5' }}>
                              {feature.description}
                            </p>
                            
                            {/* Animated Progress Bars */}
                            <div style={{ marginTop: '16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>Performance</span>
                                <span style={{ fontSize: '12px', color: feature.color }}>
                                  {85 + (index * 5)}%
                                </span>
                              </div>
                              <div style={{
                                width: '100%',
                                height: '6px',
                                backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                borderRadius: '3px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  width: `${85 + (index * 5)}%`,
                                  height: '100%',
                                  backgroundColor: feature.color,
                                  borderRadius: '3px',
                                  transition: 'width 1s ease'
                                }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feature Dots */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeature(index)}
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: currentFeature === index ? '#3b82f6' : 'rgba(107, 114, 128, 0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding: '80px 24px', backgroundColor: 'rgba(31, 41, 55, 0.3)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '40px' 
            }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} style={{ textAlign: 'center' }} className="fade-in-up">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      <Icon size={32} color="#60a5fa" />
                    </div>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '16px' }}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Powered by Advanced AI
              </h2>
              <p style={{ fontSize: '20px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
                Every feature designed to maximize efficiency and deliver insights you never thought possible
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {[
                {
                  icon: Brain,
                  title: 'Real-time AI Analytics',
                  description: 'Advanced machine learning algorithms provide instant insights into every aspect of your event.',
                  color: '#3b82f6'
                },
                {
                  icon: Users,
                  title: 'Smart Volunteer Optimization',
                  description: 'AI-powered matching and scheduling ensures optimal volunteer placement and satisfaction.',
                  color: '#10b981'
                },
                {
                  icon: MessageSquare,
                  title: 'Speaker Intelligence Platform',
                  description: 'Predict audience engagement and optimize speaker selection with AI-driven insights.',
                  color: '#f59e0b'
                },
                {
                  icon: Camera,
                  title: 'Computer Vision Gallery',
                  description: 'Automatically analyze photos and videos for engagement metrics and quality scoring.',
                  color: '#8b5cf6'
                },
                {
                  icon: Target,
                  title: 'Predictive Planning',
                  description: 'AI forecasting helps predict attendance, resource needs, and potential issues.',
                  color: '#ec4899'
                },
                {
                  icon: Lightbulb,
                  title: 'Intelligent Recommendations',
                  description: 'Get AI-powered suggestions for every decision from venue layout to catering quantities.',
                  color: '#06b6d4'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'rgba(31, 41, 55, 0.5)',
                      borderRadius: '20px',
                      padding: '32px',
                      border: '1px solid rgba(55, 65, 81, 0.5)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: `${feature.color}20`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <Icon size={28} color={feature.color} />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" style={{ padding: '120px 24px', backgroundColor: 'rgba(31, 41, 55, 0.3)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Loved by Event Professionals
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid rgba(55, 65, 81, 0.5)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', marginBottom: '16px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} color="#f59e0b" fill="#f59e0b" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#e5e7eb',
                    marginBottom: '24px',
                    fontStyle: 'italic'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginRight: '16px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {testimonial.name}
                      </div>
                      <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff, #60a5fa)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Ready to Transform Your Events?
            </h2>
            <p style={{ fontSize: '20px', color: '#9ca3af', marginBottom: '40px' }}>
              Join thousands of event professionals who trust SYNKRONIS to deliver exceptional experiences
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={navigateToLogin}
                className="hover-glow"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 40px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                }}
              >
                Get Started Free
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid rgba(55, 65, 81, 0.3)',
          padding: '40px 24px',
          backgroundColor: 'rgba(17, 24, 39, 0.8)'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Brain size={24} color="white" />
              </div>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  SYNKRONIS
                </h3>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              marginBottom: '32px',
              textAlign: 'left'
            }}>
              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
                  Product
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    onClick={() => scrollToSection('features')}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textAlign: 'left', padding: '4px 0', fontSize: '14px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    Features
                  </button>
                  <button 
                    onClick={navigateToDashboard}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', textAlign: 'left', padding: '4px 0', fontSize: '14px' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    Dashboard
                  </button>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Analytics</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>AI Insights</span>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
                  Company
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>About Us</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Careers</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Contact</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Blog</span>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
                  Support
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Help Center</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Documentation</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>API Reference</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Community</span>
                </div>
              </div>
              
              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>
                  Legal
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Privacy Policy</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Terms of Service</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>Cookie Policy</span>
                  <span style={{ color: '#9ca3af', fontSize: '14px', padding: '4px 0' }}>GDPR</span>
                </div>
              </div>
            </div>
            
            <div style={{
              borderTop: '1px solid rgba(55, 65, 81, 0.3)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                © 2024 SYNKRONIS. All rights reserved. Powered by advanced artificial intelligence.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={16} color="#10b981" />
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>SOC 2 Compliant</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={16} color="#3b82f6" />
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>Global Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;