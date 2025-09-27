import React, { useState, useEffect } from 'react';
import { Brain, Users, Calendar, BarChart3, Camera, Award, MessageSquare, Zap, TrendingUp, Activity, Bot, Sparkles, LogOut, User } from 'lucide-react';

// Import your existing components
import AgendaComponent from './agenda';
import CertificatesComponent from './certificates';
import FeedbackComponent from './feedback';
import GalleryComponent from './gallery';
import SpeakersComponent from './speakers';
import TasksComponent from './tasks';
import VendorsComponent from './vendors';
import VolunteersComponent from './volounteers';

interface AIEventDashboardProps {
  onLogout: () => void;
}

const AIEventDashboard: React.FC<AIEventDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiInsights, setAiInsights] = useState({
    sentiment: 'Positive',
    engagement: 87,
    riskScore: 15,
    recommendations: 4
  });

  // Simulate real-time AI updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiInsights(prev => ({
        ...prev,
        engagement: Math.floor(Math.random() * 20) + 80,
        riskScore: Math.floor(Math.random() * 30) + 10
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'AI Dashboard', icon: Brain, component: null },
    { id: 'tasks', label: 'Smart Tasks', icon: Zap, component: TasksComponent },
    { id: 'vendors', label: 'Vendor AI', icon: Users, component: VendorsComponent },
    { id: 'volunteers', label: 'Volunteers', icon: Users, component: VolunteersComponent },
    { id: 'speakers', label: 'Speaker Insights', icon: MessageSquare, component: SpeakersComponent },
    { id: 'gallery', label: 'AI Gallery', icon: Camera, component: GalleryComponent },
    { id: 'feedback', label: 'NLP Analytics', icon: BarChart3, component: FeedbackComponent },
    { id: 'certificates', label: 'Auto Certs', icon: Award, component: CertificatesComponent },
    { id: 'agenda', label: 'Smart Agenda', icon: Calendar, component: AgendaComponent }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'linear-gradient(to right, #1f2937, #000000)',
      borderBottom: '1px solid #374151',
      padding: '16px'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    logo: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0
    },
    subtitle: {
      color: '#9ca3af',
      fontSize: '14px',
      margin: 0
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#10b981'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      borderRadius: '8px',
      border: '1px solid rgba(55, 65, 81, 0.5)'
    },
    logoutButton: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      padding: '8px 12px',
      color: '#fca5a5',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    mainContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      gap: '24px'
    },
    sidebar: {
      width: '256px',
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #374151',
      height: 'fit-content'
    },
    navButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '8px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '14px'
    },
    navButtonActive: {
      background: 'linear-gradient(to right, #2563eb, #8b5cf6)',
      color: 'white'
    },
    navButtonInactive: {
      backgroundColor: 'transparent',
      color: '#9ca3af'
    },
    contentArea: {
      flex: 1
    },
    componentWrapper: {
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #374151',
      minHeight: '500px'
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    card: {
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #374151',
      transition: 'transform 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    cardValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    cardLabel: {
      color: '#9ca3af',
      fontSize: '14px'
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const renderTabContent = () => {
    const currentItem = navItems.find(item => item.id === activeTab);
    
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }
    
    if (currentItem?.component) {
      const Component = currentItem.component;
      return (
        <div style={styles.componentWrapper}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <currentItem.icon size={24} color="#60a5fa" style={{ marginRight: '12px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {currentItem.label}
            </h2>
          </div>
          <Component />
        </div>
      );
    }
    
    return (
      <div style={styles.componentWrapper}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Bot size={48} color="#60a5fa" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>
            {currentItem?.label}
          </h3>
          <p style={{ color: '#9ca3af' }}>Component coming soon...</p>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div>
      {/* AI Insights Cards */}
      <div style={styles.dashboardGrid}>
        <div style={{ ...styles.card, borderColor: '#3b82f6' }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>AI Engagement Score</h3>
            <TrendingUp size={24} color="#3b82f6" />
          </div>
          <div style={{ ...styles.cardValue, color: '#3b82f6' }}>
            {aiInsights.engagement}%
          </div>
          <p style={styles.cardLabel}>Real-time audience engagement</p>
        </div>

        <div style={{ ...styles.card, borderColor: '#10b981' }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Event Sentiment</h3>
            <Activity size={24} color="#10b981" />
          </div>
          <div style={{ ...styles.cardValue, color: '#10b981' }}>
            {aiInsights.sentiment}
          </div>
          <p style={styles.cardLabel}>AI sentiment analysis</p>
        </div>

        <div style={{ ...styles.card, borderColor: '#f59e0b' }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Risk Assessment</h3>
            <BarChart3 size={24} color="#f59e0b" />
          </div>
          <div style={{ ...styles.cardValue, color: '#f59e0b' }}>
            {aiInsights.riskScore}%
          </div>
          <p style={styles.cardLabel}>AI-powered risk detection</p>
        </div>

        <div style={{ ...styles.card, borderColor: '#8b5cf6' }}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>AI Recommendations</h3>
            <Sparkles size={24} color="#8b5cf6" />
          </div>
          <div style={{ ...styles.cardValue, color: '#8b5cf6' }}>
            {aiInsights.recommendations}
          </div>
          <p style={styles.cardLabel}>Active AI suggestions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.componentWrapper}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: 'white' }}>
          Quick AI Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {navItems.slice(1).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.card,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#374151';
                }}
              >
                <Icon size={32} color="#60a5fa" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  {item.label}
                </h4>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>
              <Brain size={24} color="white" />
            </div>
            <div>
              <h1 style={styles.title}>LAY-M AI</h1>
              <p style={styles.subtitle}>Event Intelligence Platform</p>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <div style={styles.statusIndicator}>
              <div style={styles.statusDot}></div>
              <span style={{ fontSize: '14px' }}>AI Online</span>
            </div>
            
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <User size={16} color="#9ca3af" />
                <span style={{ fontSize: '14px', color: '#e5e7eb' }}>Demo User</span>
              </div>
              
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    ...styles.navButton,
                    ...(activeTab === item.id ? styles.navButtonActive : styles.navButtonInactive)
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                      e.currentTarget.style.color = '#e5e7eb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#9ca3af';
                    }
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div style={styles.contentArea}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AIEventDashboard;