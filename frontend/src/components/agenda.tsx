import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Brain, TrendingUp, Plus, Zap, AlertTriangle } from 'lucide-react';

interface AgendaItem {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  speaker?: string;
  attendees?: number;
  maxCapacity?: number;
  type: 'keynote' | 'workshop' | 'networking' | 'break' | 'panel';
  aiOptimization: {
    engagementPrediction: number;
    capacityUtilization: number;
    timeOptimal: boolean;
    suggestions: string[];
    riskFactors: string[];
  };
}

const AgendaComponent = () => {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    {
      id: '1',
      title: 'Opening Keynote: Future of AI',
      description: 'Exploring the transformative potential of artificial intelligence in modern business',
      startTime: '09:00',
      endTime: '10:00',
      location: 'Main Auditorium',
      speaker: 'Dr. Priya Sharma',
      attendees: 450,
      maxCapacity: 500,
      type: 'keynote',
      aiOptimization: {
        engagementPrediction: 92,
        capacityUtilization: 90,
        timeOptimal: true,
        suggestions: ['Perfect timing for keynote', 'High engagement expected'],
        riskFactors: []
      }
    },
    {
      id: '2',
      title: 'Coffee Break & Networking',
      description: 'Informal networking session with refreshments',
      startTime: '10:00',
      endTime: '10:30',
      location: 'Main Lobby',
      attendees: 380,
      maxCapacity: 400,
      type: 'break',
      aiOptimization: {
        engagementPrediction: 75,
        capacityUtilization: 95,
        timeOptimal: true,
        suggestions: ['Optimal break timing', 'Good networking opportunity'],
        riskFactors: ['Near capacity - monitor closely']
      }
    },
    {
      id: '3',
      title: 'Workshop: Machine Learning Basics',
      description: 'Hands-on workshop covering fundamental ML concepts and practical applications',
      startTime: '10:30',
      endTime: '12:00',
      location: 'Workshop Room A',
      speaker: 'Raj Kumar',
      attendees: 65,
      maxCapacity: 80,
      type: 'workshop',
      aiOptimization: {
        engagementPrediction: 88,
        capacityUtilization: 81,
        timeOptimal: true,
        suggestions: ['High hands-on engagement expected', 'Good capacity utilization'],
        riskFactors: []
      }
    },
    {
      id: '4',
      title: 'Panel Discussion: Ethics in AI',
      description: 'Expert panel discussing ethical considerations in AI development and deployment',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Conference Hall B',
      speaker: 'Multiple Experts',
      attendees: 280,
      maxCapacity: 300,
      type: 'panel',
      aiOptimization: {
        engagementPrediction: 78,
        capacityUtilization: 93,
        timeOptimal: false,
        suggestions: ['Consider shorter duration', 'Post-lunch timing may affect engagement'],
        riskFactors: ['Post-lunch energy dip', 'High capacity utilization']
      }
    },
    {
      id: '5',
      title: 'Tech Demo: AI in Action',
      description: 'Live demonstrations of cutting-edge AI applications and tools',
      startTime: '15:45',
      endTime: '16:45',
      location: 'Innovation Lab',
      speaker: 'Tech Team',
      attendees: 120,
      maxCapacity: 150,
      type: 'workshop',
      aiOptimization: {
        engagementPrediction: 85,
        capacityUtilization: 80,
        timeOptimal: true,
        suggestions: ['Great timing for tech demos', 'Interactive format will maintain energy'],
        riskFactors: []
      }
    }
  ]);

  const [aiInsights, setAiInsights] = useState({
    totalSessions: agendaItems.length,
    avgEngagement: 0,
    avgCapacityUtilization: 0,
    optimizedSessions: 0,
    riskSessions: 0
  });

  useEffect(() => {
    const avgEngagement = Math.round(
      agendaItems.reduce((sum, item) => sum + item.aiOptimization.engagementPrediction, 0) / agendaItems.length
    );
    const avgCapacityUtilization = Math.round(
      agendaItems.reduce((sum, item) => sum + item.aiOptimization.capacityUtilization, 0) / agendaItems.length
    );
    const optimizedSessions = agendaItems.filter(item => item.aiOptimization.timeOptimal).length;
    const riskSessions = agendaItems.filter(item => item.aiOptimization.riskFactors.length > 0).length;

    setAiInsights({
      totalSessions: agendaItems.length,
      avgEngagement,
      avgCapacityUtilization,
      optimizedSessions,
      riskSessions
    });
  }, [agendaItems]);

  const styles = {
    container: {
      backgroundColor: '#000000',
      color: 'white',
      minHeight: '100vh',
      padding: '24px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      background: 'linear-gradient(to right, #2563eb, #8b5cf6)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'transform 0.2s ease'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    metricCard: {
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #374151',
      textAlign: 'center' as const
    },
    metricCardBlue: {
      background: 'linear-gradient(135deg, #1e3a8a, #1e40af)'
    },
    metricCardGreen: {
      background: 'linear-gradient(135deg, #166534, #059669)'
    },
    metricCardPurple: {
      background: 'linear-gradient(135deg, #7c3aed, #6b21a8)'
    },
    metricCardOrange: {
      background: 'linear-gradient(135deg, #ea580c, #dc2626)'
    },
    metricCardYellow: {
      background: 'linear-gradient(135deg, #d97706, #b45309)'
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    metricLabel: {
      fontSize: '14px',
      opacity: 0.8
    },
    timeline: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    agendaItem: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '24px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative' as const
    },
    timelineConnector: {
      position: 'absolute' as const,
      left: '24px',
      top: '100%',
      width: '2px',
      height: '16px',
      backgroundColor: '#374151'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    itemTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#60a5fa',
      backgroundColor: '#1e3a8a',
      padding: '6px 12px',
      borderRadius: '6px',
      minWidth: 'fit-content'
    },
    itemTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '4px'
    },
    itemDescription: {
      color: '#9ca3af',
      marginBottom: '12px',
      lineHeight: '1.5'
    },
    itemMeta: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginBottom: '16px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#d1d5db'
    },
    typeBadge: {
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const
    },
    keynote: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    workshop: {
      backgroundColor: '#059669',
      color: 'white'
    },
    networking: {
      backgroundColor: '#d97706',
      color: 'white'
    },
    break: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    panel: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    aiAnalysis: {
      backgroundColor: '#1e3a8a',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #3b82f6',
      marginTop: '16px'
    },
    aiHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    aiTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#93c5fd'
    },
    optimizationStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    aiMetrics: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '12px'
    },
    aiMetric: {
      textAlign: 'center' as const
    },
    aiMetricValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#93c5fd'
    },
    aiMetricLabel: {
      fontSize: '11px',
      color: '#dbeafe'
    },
    suggestions: {
      marginBottom: '8px'
    },
    suggestionTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#93c5fd',
      marginBottom: '4px'
    },
    suggestionsList: {
      fontSize: '11px',
      color: '#dbeafe'
    },
    riskFactors: {
      marginTop: '8px'
    },
    riskTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#fbbf24',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    riskList: {
      fontSize: '11px',
      color: '#fcd34d'
    },
    capacityIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px'
    },
    capacityBar: {
      flex: 1,
      height: '6px',
      backgroundColor: '#374151',
      borderRadius: '3px',
      overflow: 'hidden'
    },
    capacityFill: {
      height: '100%',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    },
    capacityText: {
      fontSize: '12px',
      color: '#9ca3af',
      minWidth: 'fit-content'
    }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'keynote': return styles.keynote;
      case 'workshop': return styles.workshop;
      case 'networking': return styles.networking;
      case 'break': return styles.break;
      case 'panel': return styles.panel;
      default: return styles.break;
    }
  };

  const getCapacityColor = (utilization: number) => {
    if (utilization >= 90) return '#ef4444';
    if (utilization >= 75) return '#f59e0b';
    return '#10b981';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 85) return '#10b981';
    if (engagement >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Smart Agenda</h1>
          <p style={{ color: '#9ca3af', marginTop: '4px' }}>AI-optimized event scheduling and capacity management</p>
        </div>
        <button 
          style={styles.addButton}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <Plus size={20} />
          Add Session
        </button>
      </div>

      {/* AI Metrics */}
      <div style={styles.metricsGrid}>
        <div style={{...styles.metricCard, ...styles.metricCardBlue}}>
          <div style={styles.metricValue}>{aiInsights.totalSessions}</div>
          <div style={styles.metricLabel}>Total Sessions</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardGreen}}>
          <div style={styles.metricValue}>{aiInsights.avgEngagement}%</div>
          <div style={styles.metricLabel}>Avg Engagement</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardPurple}}>
          <div style={styles.metricValue}>{aiInsights.avgCapacityUtilization}%</div>
          <div style={styles.metricLabel}>Avg Capacity</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardOrange}}>
          <div style={styles.metricValue}>{aiInsights.optimizedSessions}</div>
          <div style={styles.metricLabel}>Optimized</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardYellow}}>
          <div style={styles.metricValue}>{aiInsights.riskSessions}</div>
          <div style={styles.metricLabel}>Need Attention</div>
        </div>
      </div>

      {/* Agenda Timeline */}
      <div style={styles.timeline}>
        {agendaItems.map((item, index) => (
          <div 
            key={item.id}
            style={styles.agendaItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {index < agendaItems.length - 1 && <div style={styles.timelineConnector} />}
            
            <div style={styles.itemHeader}>
              <div style={styles.itemTime}>
                <Clock size={16} />
                {item.startTime} - {item.endTime}
              </div>
              <div style={{...styles.typeBadge, ...getTypeStyle(item.type)}}>
                {item.type}
              </div>
            </div>

            <h3 style={styles.itemTitle}>{item.title}</h3>
            <p style={styles.itemDescription}>{item.description}</p>

            <div style={styles.itemMeta}>
              <div style={styles.metaItem}>
                <MapPin size={16} color="#60a5fa" />
                {item.location}
              </div>
              {item.speaker && (
                <div style={styles.metaItem}>
                  <Users size={16} color="#10b981" />
                  {item.speaker}
                </div>
              )}
              {item.attendees && (
                <div style={styles.metaItem}>
                  <Users size={16} color="#f59e0b" />
                  {item.attendees} / {item.maxCapacity} attendees
                </div>
              )}
            </div>

            {/* Capacity Indicator */}
            {item.attendees && item.maxCapacity && (
              <div style={styles.capacityIndicator}>
                <span style={styles.capacityText}>Capacity:</span>
                <div style={styles.capacityBar}>
                  <div 
                    style={{
                      ...styles.capacityFill,
                      width: `${item.aiOptimization.capacityUtilization}%`,
                      backgroundColor: getCapacityColor(item.aiOptimization.capacityUtilization)
                    }}
                  />
                </div>
                <span style={styles.capacityText}>{item.aiOptimization.capacityUtilization}%</span>
              </div>
            )}

            {/* AI Analysis */}
            <div style={styles.aiAnalysis}>
              <div style={styles.aiHeader}>
                <div style={styles.aiTitle}>
                  <Brain size={16} />
                  AI Optimization Analysis
                </div>
                <div style={styles.optimizationStatus}>
                  {item.aiOptimization.timeOptimal ? (
                    <>
                      <Zap size={14} color="#10b981" />
                      <span style={{ color: '#10b981' }}>OPTIMIZED</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={14} color="#f59e0b" />
                      <span style={{ color: '#f59e0b' }}>NEEDS REVIEW</span>
                    </>
                  )}
                </div>
              </div>

              <div style={styles.aiMetrics}>
                <div style={styles.aiMetric}>
                  <div style={{
                    ...styles.aiMetricValue,
                    color: getEngagementColor(item.aiOptimization.engagementPrediction)
                  }}>
                    {item.aiOptimization.engagementPrediction}%
                  </div>
                  <div style={styles.aiMetricLabel}>Predicted Engagement</div>
                </div>
                <div style={styles.aiMetric}>
                  <div style={{
                    ...styles.aiMetricValue,
                    color: getCapacityColor(item.aiOptimization.capacityUtilization)
                  }}>
                    {item.aiOptimization.capacityUtilization}%
                  </div>
                  <div style={styles.aiMetricLabel}>Capacity Utilization</div>
                </div>
              </div>

              {item.aiOptimization.suggestions.length > 0 && (
                <div style={styles.suggestions}>
                  <div style={styles.suggestionTitle}>AI Suggestions:</div>
                  <div style={styles.suggestionsList}>
                    {item.aiOptimization.suggestions.map((suggestion, index) => (
                      <div key={index}>• {suggestion}</div>
                    ))}
                  </div>
                </div>
              )}

              {item.aiOptimization.riskFactors.length > 0 && (
                <div style={styles.riskFactors}>
                  <div style={styles.riskTitle}>
                    <AlertTriangle size={14} />
                    Risk Factors:
                  </div>
                  <div style={styles.riskList}>
                    {item.aiOptimization.riskFactors.map((risk, index) => (
                      <div key={index}>⚠ {risk}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaComponent;