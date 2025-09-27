import React, { useState, useEffect } from 'react';
import { Award, Download, Mail, Users, Brain, CheckCircle, Clock, Plus, Filter, Zap } from 'lucide-react';

interface Certificate {
  id: string;
  recipientName: string;
  recipientEmail: string;
  eventName: string;
  completionDate: string;
  certificateType: 'attendance' | 'completion' | 'achievement' | 'speaker';
  status: 'generated' | 'sent' | 'downloaded' | 'pending';
  templateId: string;
  aiVerification: {
    attendanceScore: number;
    engagementLevel: string;
    completionRate: number;
    verified: boolean;
    verificationDetails: string[];
  };
  metadata: {
    sessionCount: number;
    totalHours: number;
    skillsEarned: string[];
  };
}

const CertificatesComponent = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      recipientName: 'Amit Patel',
      recipientEmail: 'amit.patel@email.com',
      eventName: 'AI Innovation Summit 2025',
      completionDate: '2025-01-10',
      certificateType: 'completion',
      status: 'sent',
      templateId: 'template-001',
      aiVerification: {
        attendanceScore: 95,
        engagementLevel: 'High',
        completionRate: 100,
        verified: true,
        verificationDetails: ['Attended all sessions', 'Completed interactive polls', 'High engagement score']
      },
      metadata: {
        sessionCount: 8,
        totalHours: 12,
        skillsEarned: ['Machine Learning Basics', 'AI Ethics', 'Data Science']
      }
    },
    {
      id: '2',
      recipientName: 'Priya Sharma',
      recipientEmail: 'priya.sharma@email.com',
      eventName: 'AI Innovation Summit 2025',
      completionDate: '2025-01-10',
      certificateType: 'speaker',
      status: 'generated',
      templateId: 'template-002',
      aiVerification: {
        attendanceScore: 100,
        engagementLevel: 'Expert',
        completionRate: 100,
        verified: true,
        verificationDetails: ['Delivered keynote session', 'Expert speaker', 'High audience engagement']
      },
      metadata: {
        sessionCount: 5,
        totalHours: 8,
        skillsEarned: ['Public Speaking', 'AI Leadership', 'Technical Communication']
      }
    },
    {
      id: '3',
      recipientName: 'Raj Kumar',
      recipientEmail: 'raj.kumar@email.com',
      eventName: 'AI Innovation Summit 2025',
      completionDate: '2025-01-10',
      certificateType: 'attendance',
      status: 'pending',
      templateId: 'template-003',
      aiVerification: {
        attendanceScore: 72,
        engagementLevel: 'Medium',
        completionRate: 75,
        verified: false,
        verificationDetails: ['Minimum attendance not met', 'Missing 2 sessions', 'Needs manual review']
      },
      metadata: {
        sessionCount: 6,
        totalHours: 9,
        skillsEarned: ['AI Fundamentals', 'Data Analysis']
      }
    },
    {
      id: '4',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah.johnson@email.com',
      eventName: 'AI Innovation Summit 2025',
      completionDate: '2025-01-10',
      certificateType: 'achievement',
      status: 'downloaded',
      templateId: 'template-004',
      aiVerification: {
        attendanceScore: 98,
        engagementLevel: 'Exceptional',
        completionRate: 100,
        verified: true,
        verificationDetails: ['Perfect attendance', 'Top performer', 'Active participation in all activities']
      },
      metadata: {
        sessionCount: 10,
        totalHours: 15,
        skillsEarned: ['Advanced ML', 'AI Strategy', 'Innovation Leadership', 'Technical Excellence']
      }
    }
  ]);

  const [aiMetrics, setAiMetrics] = useState({
    totalCertificates: certificates.length,
    generated: 0,
    sent: 0,
    verified: 0,
    avgEngagement: 0,
    avgAttendance: 0
  });

  useEffect(() => {
    const generated = certificates.filter(c => c.status !== 'pending').length;
    const sent = certificates.filter(c => c.status === 'sent').length;
    const verified = certificates.filter(c => c.aiVerification.verified).length;
    const avgEngagement = certificates.reduce((sum, c) => sum + c.aiVerification.attendanceScore, 0) / certificates.length;
    const avgAttendance = certificates.reduce((sum, c) => sum + c.aiVerification.completionRate, 0) / certificates.length;

    setAiMetrics({
      totalCertificates: certificates.length,
      generated,
      sent,
      verified,
      avgEngagement: Math.round(avgEngagement),
      avgAttendance: Math.round(avgAttendance)
    });
  }, [certificates]);

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
    controls: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'transform 0.2s ease'
    },
    primaryButton: {
      background: 'linear-gradient(to right, #2563eb, #8b5cf6)',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#374151',
      color: 'white',
      border: '1px solid #4b5563'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
    metricCardIndigo: {
      background: 'linear-gradient(135deg, #4338ca, #3730a3)'
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    metricLabel: {
      fontSize: '14px',
      opacity: 0.9
    },
    certificatesGrid: {
      display: 'grid',
      gap: '20px'
    },
    certificateCard: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '24px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    recipientInfo: {
      flex: 1
    },
    recipientName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '4px'
    },
    recipientEmail: {
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '8px'
    },
    eventName: {
      fontSize: '16px',
      color: '#60a5fa',
      fontWeight: '500'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const
    },
    statusGenerated: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    statusSent: {
      backgroundColor: '#059669',
      color: 'white'
    },
    statusDownloaded: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    statusPending: {
      backgroundColor: '#d97706',
      color: 'white'
    },
    certificateDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px',
      marginBottom: '16px'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#d1d5db'
    },
    typeBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    typeAttendance: {
      backgroundColor: '#4b5563',
      color: 'white'
    },
    typeCompletion: {
      backgroundColor: '#059669',
      color: 'white'
    },
    typeAchievement: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    typeSpeaker: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    aiVerification: {
      backgroundColor: '#1e3a8a',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #3b82f6',
      marginBottom: '16px'
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
    verificationStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    aiMetrics: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
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
    verificationDetails: {
      fontSize: '12px',
      color: '#dbeafe'
    },
    skillsSection: {
      marginBottom: '16px'
    },
    skillsTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#e5e7eb',
      marginBottom: '8px'
    },
    skillsTags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px'
    },
    skillTag: {
      padding: '4px 8px',
      backgroundColor: '#4b5563',
      borderRadius: '4px',
      fontSize: '12px',
      color: 'white'
    },
    actions: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s ease'
    },
    downloadButton: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    sendButton: {
      backgroundColor: '#059669',
      color: 'white'
    },
    generateButton: {
      backgroundColor: '#7c3aed',
      color: 'white'
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'generated': return styles.statusGenerated;
      case 'sent': return styles.statusSent;
      case 'downloaded': return styles.statusDownloaded;
      case 'pending': return styles.statusPending;
      default: return styles.statusPending;
    }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'attendance': return styles.typeAttendance;
      case 'completion': return styles.typeCompletion;
      case 'achievement': return styles.typeAchievement;
      case 'speaker': return styles.typeSpeaker;
      default: return styles.typeAttendance;
    }
  };

  const getEngagementColor = (level: string) => {
    switch(level) {
      case 'Exceptional': return '#10b981';
      case 'High': return '#059669';
      case 'Medium': return '#f59e0b';
      default: return '#ef4444';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Auto Certificates</h1>
          <p style={{ color: '#9ca3af', marginTop: '4px' }}>AI-powered certificate generation and verification</p>
        </div>
        <div style={styles.controls}>
          <button 
            style={{...styles.button, ...styles.secondaryButton}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            <Filter size={16} />
            Filter
          </button>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
          >
            <Zap size={16} />
            Generate All
          </button>
        </div>
      </div>

      {/* AI Metrics */}
      <div style={styles.metricsGrid}>
        <div style={{...styles.metricCard, ...styles.metricCardBlue}}>
          <div style={styles.metricValue}>{aiMetrics.totalCertificates}</div>
          <div style={styles.metricLabel}>Total Certificates</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardGreen}}>
          <div style={styles.metricValue}>{aiMetrics.generated}</div>
          <div style={styles.metricLabel}>Generated</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardPurple}}>
          <div style={styles.metricValue}>{aiMetrics.sent}</div>
          <div style={styles.metricLabel}>Sent</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardOrange}}>
          <div style={styles.metricValue}>{aiMetrics.verified}</div>
          <div style={styles.metricLabel}>AI Verified</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardYellow}}>
          <div style={styles.metricValue}>{aiMetrics.avgEngagement}%</div>
          <div style={styles.metricLabel}>Avg Engagement</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardIndigo}}>
          <div style={styles.metricValue}>{aiMetrics.avgAttendance}%</div>
          <div style={styles.metricLabel}>Avg Attendance</div>
        </div>
      </div>

      {/* Certificates List */}
      <div style={styles.certificatesGrid}>
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            style={styles.certificateCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.recipientInfo}>
                <h3 style={styles.recipientName}>{cert.recipientName}</h3>
                <div style={styles.recipientEmail}>{cert.recipientEmail}</div>
                <div style={styles.eventName}>{cert.eventName}</div>
              </div>
              <div>
                <span style={{...styles.statusBadge, ...getStatusStyle(cert.status)}}>
                  {cert.status}
                </span>
              </div>
            </div>

            <div style={styles.certificateDetails}>
              <div style={styles.detailItem}>
                <Award size={16} color="#60a5fa" />
                <span style={{...styles.typeBadge, ...getTypeStyle(cert.certificateType)}}>
                  {cert.certificateType.toUpperCase()}
                </span>
              </div>
              <div style={styles.detailItem}>
                <Clock size={16} color="#9ca3af" />
                {formatDate(cert.completionDate)}
              </div>
              <div style={styles.detailItem}>
                <Users size={16} color="#f59e0b" />
                {cert.metadata.sessionCount} sessions
              </div>
              <div style={styles.detailItem}>
                <Clock size={16} color="#10b981" />
                {cert.metadata.totalHours} hours
              </div>
            </div>

            {/* AI Verification */}
            <div style={styles.aiVerification}>
              <div style={styles.aiHeader}>
                <div style={styles.aiTitle}>
                  <Brain size={16} />
                  AI Verification
                </div>
                <div style={styles.verificationStatus}>
                  {cert.aiVerification.verified ? (
                    <>
                      <CheckCircle size={14} color="#10b981" />
                      <span style={{ color: '#10b981' }}>VERIFIED</span>
                    </>
                  ) : (
                    <>
                      <Clock size={14} color="#f59e0b" />
                      <span style={{ color: '#f59e0b' }}>PENDING</span>
                    </>
                  )}
                </div>
              </div>

              <div style={styles.aiMetrics}>
                <div style={styles.aiMetric}>
                  <div style={styles.aiMetricValue}>{cert.aiVerification.attendanceScore}%</div>
                  <div style={styles.aiMetricLabel}>Attendance</div>
                </div>
                <div style={styles.aiMetric}>
                  <div style={{
                    ...styles.aiMetricValue,
                    color: getEngagementColor(cert.aiVerification.engagementLevel)
                  }}>
                    {cert.aiVerification.engagementLevel}
                  </div>
                  <div style={styles.aiMetricLabel}>Engagement</div>
                </div>
                <div style={styles.aiMetric}>
                  <div style={styles.aiMetricValue}>{cert.aiVerification.completionRate}%</div>
                  <div style={styles.aiMetricLabel}>Completion</div>
                </div>
              </div>

              <div style={styles.verificationDetails}>
                {cert.aiVerification.verificationDetails.map((detail, index) => (
                  <div key={index}>• {detail}</div>
                ))}
              </div>
            </div>

            {/* Skills Earned */}
            <div style={styles.skillsSection}>
              <div style={styles.skillsTitle}>Skills Earned:</div>
              <div style={styles.skillsTags}>
                {cert.metadata.skillsEarned.map((skill, index) => (
                  <span key={index} style={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={styles.actions}>
              {cert.status === 'pending' && (
                <button style={{...styles.actionButton, ...styles.generateButton}}>
                  <Zap size={16} />
                  Generate
                </button>
              )}
              {cert.status === 'generated' && (
                <button style={{...styles.actionButton, ...styles.sendButton}}>
                  <Mail size={16} />
                  Send
                </button>
              )}
              {(cert.status === 'sent' || cert.status === 'downloaded') && (
                <button style={{...styles.actionButton, ...styles.downloadButton}}>
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesComponent;