import React, { useState, useEffect } from 'react';
import { BarChart3, MessageSquare, TrendingUp, Brain, Heart, Frown, Smile, Meh, Plus, Filter } from 'lucide-react';

interface Feedback {
  id: string;
  content: string;
  rating: number;
  timestamp: string;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  keywords: string[];
  aiSummary: string;
  source: 'survey' | 'social' | 'email' | 'onsite';
}

const FeedbackComponent = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      content: 'Amazing event! The speakers were incredibly insightful and the organization was flawless. Really loved the networking opportunities.',
      rating: 5,
      timestamp: '2025-01-10T14:30:00Z',
      category: 'Overall Experience',
      sentiment: 'positive',
      sentimentScore: 0.92,
      keywords: ['amazing', 'insightful', 'flawless', 'networking'],
      aiSummary: 'Highly satisfied attendee praising speakers and organization',
      source: 'survey'
    },
    {
      id: '2',
      content: 'The registration process was a bit confusing and took longer than expected. Otherwise, good content.',
      rating: 3,
      timestamp: '2025-01-10T16:15:00Z',
      category: 'Registration',
      sentiment: 'neutral',
      sentimentScore: -0.2,
      keywords: ['confusing', 'longer', 'good content'],
      aiSummary: 'Mixed feedback highlighting registration issues but appreciating content',
      source: 'email'
    },
    {
      id: '3',
      content: 'Food quality was disappointing and the venue was too crowded. Hard to move around.',
      rating: 2,
      timestamp: '2025-01-10T18:45:00Z',
      category: 'Catering',
      sentiment: 'negative',
      sentimentScore: -0.75,
      keywords: ['disappointing', 'crowded', 'hard'],
      aiSummary: 'Negative feedback about food quality and venue capacity issues',
      source: 'social'
    },
    {
      id: '4',
      content: 'Excellent use of technology! The mobile app worked perfectly and the live polling was engaging.',
      rating: 5,
      timestamp: '2025-01-10T20:00:00Z',
      category: 'Technology',
      sentiment: 'positive',
      sentimentScore: 0.88,
      keywords: ['excellent', 'perfectly', 'engaging'],
      aiSummary: 'Positive feedback praising technology integration and mobile experience',
      source: 'onsite'
    }
  ]);

  const [nlpInsights, setNlpInsights] = useState({
    totalFeedback: feedbacks.length,
    avgSentiment: 0,
    positivePercentage: 0,
    negativePercentage: 0,
    neutralPercentage: 0,
    avgRating: 0,
    topKeywords: [] as {word: string, count: number}[]
  });

  useEffect(() => {
    const totalSentiment = feedbacks.reduce((sum, f) => sum + f.sentimentScore, 0);
    const avgSentiment = totalSentiment / feedbacks.length;
    
    const positive = feedbacks.filter(f => f.sentiment === 'positive').length;
    const negative = feedbacks.filter(f => f.sentiment === 'negative').length;
    const neutral = feedbacks.filter(f => f.sentiment === 'neutral').length;
    
    const avgRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;
    
    // Calculate top keywords
    const keywordCount: {[key: string]: number} = {};
    feedbacks.forEach(f => {
      f.keywords.forEach(keyword => {
        keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
      });
    });
    
    const topKeywords = Object.entries(keywordCount)
      .map(([word, count]) => ({word, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setNlpInsights({
      totalFeedback: feedbacks.length,
      avgSentiment: Math.round(avgSentiment * 100) / 100,
      positivePercentage: Math.round((positive / feedbacks.length) * 100),
      negativePercentage: Math.round((negative / feedbacks.length) * 100),
      neutralPercentage: Math.round((neutral / feedbacks.length) * 100),
      avgRating: Math.round(avgRating * 10) / 10,
      topKeywords
    });
  }, [feedbacks]);

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
    metricCardRed: {
      background: 'linear-gradient(135deg, #dc2626, #b91c1c)'
    },
    metricCardYellow: {
      background: 'linear-gradient(135deg, #d97706, #b45309)'
    },
    metricCardPurple: {
      background: 'linear-gradient(135deg, #7c3aed, #6b21a8)'
    },
    metricValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    metricLabel: {
      fontSize: '14px',
      opacity: 0.9
    },
    analyticsSection: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      marginBottom: '32px'
    },
    sentimentChart: {
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #374151'
    },
    chartTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    sentimentBars: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    sentimentBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    sentimentIcon: {
      width: '24px'
    },
    sentimentLabel: {
      minWidth: '80px',
      fontSize: '14px'
    },
    barContainer: {
      flex: 1,
      height: '20px',
      backgroundColor: '#374151',
      borderRadius: '10px',
      overflow: 'hidden'
    },
    barFill: {
      height: '100%',
      borderRadius: '10px',
      transition: 'width 0.3s ease'
    },
    barFillGreen: {
      backgroundColor: '#10b981'
    },
    barFillYellow: {
      backgroundColor: '#f59e0b'
    },
    barFillRed: {
      backgroundColor: '#ef4444'
    },
    percentage: {
      minWidth: '40px',
      textAlign: 'right' as const,
      fontSize: '14px',
      fontWeight: 'bold'
    },
    keywordsPanel: {
      backgroundColor: '#1f2937',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #374151'
    },
    keywordCloud: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px'
    },
    keywordItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      backgroundColor: '#374151',
      borderRadius: '6px'
    },
    keywordText: {
      fontWeight: '500'
    },
    keywordCount: {
      fontSize: '12px',
      backgroundColor: '#4b5563',
      padding: '2px 6px',
      borderRadius: '4px'
    },
    feedbackList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    feedbackCard: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '20px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    feedbackHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    feedbackMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '12px',
      color: '#9ca3af'
    },
    sourceBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: '#4b5563',
      color: 'white'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    feedbackContent: {
      fontSize: '16px',
      lineHeight: '1.5',
      marginBottom: '16px',
      color: '#e5e7eb'
    },
    aiAnalysis: {
      backgroundColor: '#1e3a8a',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #3b82f6'
    },
    aiAnalysisHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#93c5fd'
    },
    aiSummary: {
      fontSize: '14px',
      color: '#dbeafe',
      marginBottom: '8px'
    },
    keywords: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '6px'
    },
    keywordTag: {
      padding: '2px 6px',
      backgroundColor: '#3b82f6',
      borderRadius: '4px',
      fontSize: '12px',
      color: 'white'
    },
    sentimentIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '8px'
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      case 'neutral': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive': return <Smile size={20} color="#10b981" />;
      case 'negative': return <Frown size={20} color="#ef4444" />;
      case 'neutral': return <Meh size={20} color="#f59e0b" />;
      default: return <Meh size={20} color="#6b7280" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>NLP Analytics</h1>
          <p style={{ color: '#9ca3af', marginTop: '4px' }}>AI-powered sentiment analysis and feedback insights</p>
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
            <Plus size={16} />
            Add Feedback
          </button>
        </div>
      </div>

      {/* NLP Metrics */}
      <div style={styles.metricsGrid}>
        <div style={{...styles.metricCard, ...styles.metricCardBlue}}>
          <div style={styles.metricValue}>{nlpInsights.totalFeedback}</div>
          <div style={styles.metricLabel}>Total Feedback</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardGreen}}>
          <div style={styles.metricValue}>{nlpInsights.positivePercentage}%</div>
          <div style={styles.metricLabel}>Positive Sentiment</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardRed}}>
          <div style={styles.metricValue}>{nlpInsights.negativePercentage}%</div>
          <div style={styles.metricLabel}>Negative Sentiment</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardPurple}}>
          <div style={styles.metricValue}>{nlpInsights.avgRating}</div>
          <div style={styles.metricLabel}>Average Rating</div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={styles.analyticsSection}>
        <div style={styles.sentimentChart}>
          <h3 style={styles.chartTitle}>
            <BarChart3 size={24} color="#60a5fa" />
            Sentiment Distribution
          </h3>
          <div style={styles.sentimentBars}>
            <div style={styles.sentimentBar}>
              <div style={styles.sentimentIcon}>
                <Smile size={20} color="#10b981" />
              </div>
              <div style={styles.sentimentLabel}>Positive</div>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barFillGreen,
                    width: `${nlpInsights.positivePercentage}%`
                  }}
                />
              </div>
              <div style={styles.percentage}>{nlpInsights.positivePercentage}%</div>
            </div>
            <div style={styles.sentimentBar}>
              <div style={styles.sentimentIcon}>
                <Meh size={20} color="#f59e0b" />
              </div>
              <div style={styles.sentimentLabel}>Neutral</div>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barFillYellow,
                    width: `${nlpInsights.neutralPercentage}%`
                  }}
                />
              </div>
              <div style={styles.percentage}>{nlpInsights.neutralPercentage}%</div>
            </div>
            <div style={styles.sentimentBar}>
              <div style={styles.sentimentIcon}>
                <Frown size={20} color="#ef4444" />
              </div>
              <div style={styles.sentimentLabel}>Negative</div>
              <div style={styles.barContainer}>
                <div 
                  style={{
                    ...styles.barFill,
                    ...styles.barFillRed,
                    width: `${nlpInsights.negativePercentage}%`
                  }}
                />
              </div>
              <div style={styles.percentage}>{nlpInsights.negativePercentage}%</div>
            </div>
          </div>
        </div>

        <div style={styles.keywordsPanel}>
          <h3 style={styles.chartTitle}>
            <Brain size={24} color="#a78bfa" />
            Top Keywords
          </h3>
          <div style={styles.keywordCloud}>
            {nlpInsights.topKeywords.map((keyword, index) => (
              <div key={index} style={styles.keywordItem}>
                <span style={styles.keywordText}>{keyword.word}</span>
                <span style={styles.keywordCount}>{keyword.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div style={styles.feedbackList}>
        {feedbacks.map((feedback) => (
          <div 
            key={feedback.id}
            style={styles.feedbackCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.feedbackHeader}>
              <div style={styles.feedbackMeta}>
                <div 
                  style={{
                    ...styles.sentimentIndicator,
                    backgroundColor: getSentimentColor(feedback.sentiment)
                  }}
                />
                <span>{feedback.category}</span>
                <span>•</span>
                <span>{formatDate(feedback.timestamp)}</span>
                <span style={styles.sourceBadge}>{feedback.source.toUpperCase()}</span>
              </div>
              <div style={styles.rating}>
                <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>{feedback.rating}/5</span>
                {getSentimentIcon(feedback.sentiment)}
              </div>
            </div>
            
            <div style={styles.feedbackContent}>
              "{feedback.content}"
            </div>
            
            <div style={styles.aiAnalysis}>
              <div style={styles.aiAnalysisHeader}>
                <Brain size={16} />
                AI Analysis (Sentiment: {Math.round(feedback.sentimentScore * 100)}/100)
              </div>
              <div style={styles.aiSummary}>{feedback.aiSummary}</div>
              <div style={styles.keywords}>
                {feedback.keywords.map((keyword, index) => (
                  <span key={index} style={styles.keywordTag}>{keyword}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackComponent;