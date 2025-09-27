import React, { useState, useEffect } from 'react';
import { Users, Star, MapPin, Phone, Mail, Brain, TrendingUp, CheckCircle, AlertTriangle, Plus } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  status: 'confirmed' | 'pending' | 'declined';
  aiCompatibilityScore: number;
  aiInsights: {
    reliability: number;
    costEfficiency: number;
    pastPerformance: string;
    recommendations: string[];
  };
  services: string[];
  estimatedCost: number;
}

const VendorsComponent = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'SoundWave Audio Pro',
      category: 'Audio/Visual',
      rating: 4.8,
      location: 'Bengaluru, Karnataka',
      contact: {
        phone: '+91 98765 43210',
        email: 'contact@soundwavepro.com'
      },
      status: 'confirmed',
      aiCompatibilityScore: 96,
      aiInsights: {
        reliability: 95,
        costEfficiency: 88,
        pastPerformance: 'Excellent track record with 15+ events',
        recommendations: ['Perfect match for your event type', 'Previous clients highly satisfied', 'Equipment quality exceeds requirements']
      },
      services: ['Sound Systems', 'Lighting', 'Stage Setup'],
      estimatedCost: 45000
    },
    {
      id: '2',
      name: 'Gourmet Delights Catering',
      category: 'Food & Beverage',
      rating: 4.6,
      location: 'Bengaluru, Karnataka',
      contact: {
        phone: '+91 98765 43211',
        email: 'info@gourmetdelights.com'
      },
      status: 'pending',
      aiCompatibilityScore: 82,
      aiInsights: {
        reliability: 78,
        costEfficiency: 92,
        pastPerformance: 'Good performance with some delays',
        recommendations: ['Cost-effective option', 'Menu variety excellent', 'Consider backup for timing']
      },
      services: ['Catering', 'Beverages', 'Service Staff'],
      estimatedCost: 32000
    },
    {
      id: '3',
      name: 'EventFlow Logistics',
      category: 'Logistics',
      rating: 4.3,
      location: 'Bengaluru, Karnataka',
      contact: {
        phone: '+91 98765 43212',
        email: 'ops@eventflow.com'
      },
      status: 'confirmed',
      aiCompatibilityScore: 74,
      aiInsights: {
        reliability: 85,
        costEfficiency: 75,
        pastPerformance: 'Average performance, room for improvement',
        recommendations: ['Reliable for basic logistics', 'Monitor setup timeline', 'Good backup vendor available']
      },
      services: ['Transportation', 'Setup', 'Coordination'],
      estimatedCost: 28000
    }
  ]);

  const [aiMetrics, setAiMetrics] = useState({
    totalVendors: vendors.length,
    confirmedVendors: vendors.filter(v => v.status === 'confirmed').length,
    avgCompatibility: Math.round(vendors.reduce((sum, v) => sum + v.aiCompatibilityScore, 0) / vendors.length),
    totalEstimatedCost: vendors.reduce((sum, v) => sum + v.estimatedCost, 0)
  });

  useEffect(() => {
    setAiMetrics({
      totalVendors: vendors.length,
      confirmedVendors: vendors.filter(v => v.status === 'confirmed').length,
      avgCompatibility: Math.round(vendors.reduce((sum, v) => sum + v.aiCompatibilityScore, 0) / vendors.length),
      totalEstimatedCost: vendors.reduce((sum, v) => sum + v.estimatedCost, 0)
    });
  }, [vendors]);

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
      border: '1px solid #374151'
    },
    metricCardBlue: {
      background: 'linear-gradient(135deg, #1e3a8a, #1e40af)'
    },
    metricCardGreen: {
      background: 'linear-gradient(135deg, #166534, #059669)'
    },
    metricCardPurple: {
      background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)'
    },
    metricCardOrange: {
      background: 'linear-gradient(135deg, #ea580c, #dc2626)'
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
    vendorsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px'
    },
    vendorCard: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '24px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    vendorHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    vendorName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '4px'
    },
    vendorCategory: {
      fontSize: '14px',
      color: '#60a5fa',
      marginBottom: '8px'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginBottom: '8px'
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#9ca3af',
      fontSize: '14px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    statusConfirmed: {
      backgroundColor: '#059669',
      color: 'white'
    },
    statusPending: {
      backgroundColor: '#d97706',
      color: 'white'
    },
    statusDeclined: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    aiSection: {
      marginTop: '16px',
      padding: '16px',
      backgroundColor: '#1e3a8a',
      borderRadius: '8px',
      border: '1px solid #3b82f6'
    },
    aiHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    },
    aiScore: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#60a5fa'
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
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#93c5fd'
    },
    aiMetricLabel: {
      fontSize: '12px',
      color: '#dbeafe'
    },
    aiRecommendations: {
      marginTop: '12px'
    },
    recommendationTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#93c5fd',
      marginBottom: '8px'
    },
    recommendationList: {
      fontSize: '12px',
      color: '#dbeafe'
    },
    contactInfo: {
      marginTop: '16px',
      padding: '12px',
      backgroundColor: '#374151',
      borderRadius: '8px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px',
      fontSize: '14px',
      color: '#d1d5db'
    },
    services: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginTop: '12px'
    },
    serviceTag: {
      padding: '4px 8px',
      backgroundColor: '#4b5563',
      borderRadius: '4px',
      fontSize: '12px',
      color: 'white'
    },
    cost: {
      marginTop: '12px',
      textAlign: 'right' as const,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#10b981'
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'confirmed': return styles.statusConfirmed;
      case 'pending': return styles.statusPending;
      case 'declined': return styles.statusDeclined;
      default: return styles.statusPending;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#f59e0b';
    return '#ef4444';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Vendor AI</h1>
          <p style={{ color: '#9ca3af', marginTop: '4px' }}>AI-powered vendor matching and management</p>
        </div>
        <button 
          style={styles.addButton}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <Plus size={20} />
          Add Vendor
        </button>
      </div>

      {/* AI Metrics */}
      <div style={styles.metricsGrid}>
        <div style={{...styles.metricCard, ...styles.metricCardBlue}}>
          <div style={styles.metricValue}>{aiMetrics.totalVendors}</div>
          <div style={styles.metricLabel}>Total Vendors</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardGreen}}>
          <div style={styles.metricValue}>{aiMetrics.confirmedVendors}</div>
          <div style={styles.metricLabel}>Confirmed</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardPurple}}>
          <div style={styles.metricValue}>{aiMetrics.avgCompatibility}%</div>
          <div style={styles.metricLabel}>Avg AI Match</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardOrange}}>
          <div style={styles.metricValue}>{formatCurrency(aiMetrics.totalEstimatedCost)}</div>
          <div style={styles.metricLabel}>Total Cost</div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div style={styles.vendorsGrid}>
        {vendors.map((vendor) => (
          <div 
            key={vendor.id} 
            style={styles.vendorCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.vendorHeader}>
              <div>
                <h3 style={styles.vendorName}>{vendor.name}</h3>
                <div style={styles.vendorCategory}>{vendor.category}</div>
                <div style={styles.rating}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <span>{vendor.rating}</span>
                </div>
                <div style={styles.location}>
                  <MapPin size={14} />
                  {vendor.location}
                </div>
              </div>
              <div>
                <span style={{...styles.statusBadge, ...getStatusStyle(vendor.status)}}>
                  {vendor.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* AI Compatibility Section */}
            <div style={styles.aiSection}>
              <div style={styles.aiHeader}>
                <Brain size={20} color="#60a5fa" />
                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>AI Analysis</span>
                <div style={{
                  ...styles.aiScore,
                  color: getCompatibilityColor(vendor.aiCompatibilityScore)
                }}>
                  {vendor.aiCompatibilityScore}%
                </div>
              </div>

              <div style={styles.aiMetrics}>
                <div style={styles.aiMetric}>
                  <div style={styles.aiMetricValue}>{vendor.aiInsights.reliability}%</div>
                  <div style={styles.aiMetricLabel}>Reliability</div>
                </div>
                <div style={styles.aiMetric}>
                  <div style={styles.aiMetricValue}>{vendor.aiInsights.costEfficiency}%</div>
                  <div style={styles.aiMetricLabel}>Cost Efficiency</div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#dbeafe', marginBottom: '8px' }}>
                {vendor.aiInsights.pastPerformance}
              </div>

              {vendor.aiInsights.recommendations.length > 0 && (
                <div style={styles.aiRecommendations}>
                  <div style={styles.recommendationTitle}>AI Recommendations:</div>
                  <div style={styles.recommendationList}>
                    {vendor.aiInsights.recommendations.map((rec, index) => (
                      <div key={index}>• {rec}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div style={styles.services}>
              {vendor.services.map((service, index) => (
                <span key={index} style={styles.serviceTag}>{service}</span>
              ))}
            </div>

            {/* Contact Information */}
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <Phone size={14} />
                {vendor.contact.phone}
              </div>
              <div style={styles.contactItem}>
                <Mail size={14} />
                {vendor.contact.email}
              </div>
            </div>

            {/* Cost */}
            <div style={styles.cost}>
              {formatCurrency(vendor.estimatedCost)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsComponent;