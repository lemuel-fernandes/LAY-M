import React, { useState, useEffect } from 'react';
import { MessageSquare, TrendingUp, Users, Award, Brain, Mic, Star, Calendar, Clock, MapPin, BarChart3, Activity, Zap } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  bio: string;
  expertise: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessions: {
    id: string;
    title: string;
    type: 'keynote' | 'workshop' | 'panel' | 'presentation';
    date: string;
    duration: number;
    venue: string;
    attendees: number;
    maxCapacity: number;
  }[];
  aiInsights: {
    speakingScore: number;
    engagementPrediction: number;
    audienceMatch: number;
    topicRelevance: number;
    experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
    recommendedAudience: string[];
    speakingStyle: string;
    keyTopics: string[];
  };
  feedback: {
    overall: number;
    clarity: number;
    engagement: number;
    expertise: number;
    delivery: number;
    totalRatings: number;
    comments: string[];
  };
  realTimeMetrics: {
    currentSession?: string;
    liveAttendees?: number;
    engagementScore?: number;
    questionCount?: number;
  };
}

const SpeakersComponent = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      title: 'Chief AI Officer',
      company: 'TechVision AI',
      avatar: '/api/placeholder/100/100',
      bio: 'Leading expert in machine learning and neural networks with 15+ years of experience in AI research and development.',
      expertise: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'AI Ethics'],
      socialLinks: {
        twitter: '@priya_ai',
        linkedin: 'priya-sharma-ai',
        website: 'priyasharma.ai'
      },
      sessions: [
        {
          id: 's1',
          title: 'The Future of AI: Beyond Human Intelligence',
          type: 'keynote',
          date: '2025-01-10T09:30:00Z',
          duration: 60,
          venue: 'Main Auditorium',
          attendees: 850,
          maxCapacity: 1000
        }
      ],
      aiInsights: {
        speakingScore: 95,
        engagementPrediction: 92,
        audienceMatch: 88,
        topicRelevance: 96,
        experienceLevel: 'Expert',
        recommendedAudience: ['AI Researchers', 'Tech Leaders', 'Graduate Students'],
        speakingStyle: 'Inspirational and Technical',
        keyTopics: ['Future of AI', 'Ethical AI', 'Neural Networks', 'AI Research']
      },
      feedback: {
        overall: 4.8,
        clarity: 4.9,
        engagement: 4.7,
        expertise: 4.9,
        delivery: 4.8,
        totalRatings: 156,
        comments: ['Exceptional insights into AI future', 'Clear explanations of complex topics', 'Inspiring presentation']
      },
      realTimeMetrics: {
        currentSession: 'The Future of AI: Beyond Human Intelligence',
        liveAttendees: 850,
        engagementScore: 94,
        questionCount: 23
      }
    },
    {
      id: '2',
      name: 'Marcus Chen',
      title: 'Senior Data Scientist',
      company: 'DeepMind Technologies',
      avatar: '/api/placeholder/100/100',
      bio: 'Specializes in reinforcement learning and autonomous systems with groundbreaking research in AI safety.',
      expertise: ['Reinforcement Learning', 'AI Safety', 'Autonomous Systems', 'Deep Learning'],
      socialLinks: {
        twitter: '@marcus_deepai',
        linkedin: 'marcus-chen-deepmind',
        website: 'marcuschen.tech'
      },
      sessions: [
        {
          id: 's2',
          title: 'Building Safe and Reliable AI Systems',
          type: 'presentation',
          date: '2025-01-10T11:00:00Z',
          duration: 45,
          venue: 'Tech Hall A',
          attendees: 420,
          maxCapacity: 500
        },
        {
          id: 's3',
          title: 'Hands-on: Reinforcement Learning Workshop',
          type: 'workshop',
          date: '2025-01-10T14:30:00Z',
          duration: 120,
          venue: 'Workshop Room 1',
          attendees: 45,
          maxCapacity: 50
        }
      ],
      aiInsights: {
        speakingScore: 89,
        engagementPrediction: 85,
        audienceMatch: 92,
        topicRelevance: 94,
        experienceLevel: 'Expert',
        recommendedAudience: ['ML Engineers', 'AI Researchers', 'Safety Engineers'],
        speakingStyle: 'Technical and Methodical',
        keyTopics: ['AI Safety', 'Reinforcement Learning', 'System Design', 'Risk Assessment']
      },
      feedback: {
        overall: 4.6,
        clarity: 4.7,
        engagement: 4.4,
        expertise: 4.8,
        delivery: 4.5,
        totalRatings: 89,
        comments: ['Deep technical knowledge', 'Great practical examples', 'Could be more engaging']
      },
      realTimeMetrics: {}
    },
    {
      id: '3',
      name: 'Sarah Rodriguez',
      title: 'VP of AI Product Strategy',
      company: 'Microsoft AI',
      avatar: '/api/placeholder/100/100',
      bio: 'Product strategist with expertise in bringing AI solutions to market and scaling enterprise AI applications.',
      expertise: ['Product Strategy', 'Enterprise AI', 'AI Ethics', 'Business Intelligence'],
      socialLinks: {
        twitter: '@sarah_ai_strategy',
        linkedin: 'sarah-rodriguez-ai',
        website: 'sarahrodriguez.com'
      },
      sessions: [
        {
          id: 's4',
          title: 'AI in Enterprise: Lessons from the Trenches',
          type: 'panel',
          date: '2025-01-10T16:00:00Z',
          duration: 75,
          venue: 'Innovation Theater',
          attendees: 320,
          maxCapacity: 400
        }
      ],
      aiInsights: {
        speakingScore: 92,
        engagementPrediction: 88,
        audienceMatch: 85,
        topicRelevance: 87,
        experienceLevel: 'Expert',
        recommendedAudience: ['Product Managers', 'Business Leaders', 'Enterprise Architects'],
        speakingStyle: 'Business-focused and Pragmatic',
        keyTopics: ['Enterprise AI', 'Product Strategy', 'Market Adoption', 'ROI Analysis']
      },
      feedback: {
        overall: 4.5,
        clarity: 4.6,
        engagement: 4.7,
        expertise: 4.4,
        delivery: 4.5,
        totalRatings: 67,
        comments: ['Practical insights', 'Great business perspective', 'Engaging speaker']
      },
      realTimeMetrics: {}
    },
    {
      id: '4',
      name: 'Dr. Alex Kim',
      title: 'Research Director',
      company: 'OpenAI',
      avatar: '/api/placeholder/100/100',
      bio: 'Leading researcher in natural language processing and large language models with 50+ publications.',
      expertise: ['Natural Language Processing', 'Large Language Models', 'AI Research', 'Computational Linguistics'],
      socialLinks: {
        twitter: '@alex_nlp_research',
        linkedin: 'alex-kim-openai',
        website: 'alexkim.research'
      },
      sessions: [
        {
          id: 's5',
          title: 'The Evolution of Language Models',
          type: 'presentation',
          date: '2025-01-10T13:15:00Z',
          duration: 50,
          venue: 'Research Theater',
          attendees: 280,
          maxCapacity: 350
        }
      ],
      aiInsights: {
        speakingScore: 91,
        engagementPrediction: 89,
        audienceMatch: 94,
        topicRelevance: 98,
        experienceLevel: 'Expert',
        recommendedAudience: ['NLP Researchers', 'AI Engineers', 'Linguistics Students'],
        speakingStyle: 'Research-oriented and Detailed',
        keyTopics: ['Language Models', 'NLP Research', 'Model Architecture', 'Training Methods']
      },
      feedback: {
        overall: 4.7,
        clarity: 4.8,
        engagement: 4.5,
        expertise: 4.9,
        delivery: 4.6,
        totalRatings: 94,
        comments: ['Cutting-edge research', 'Very knowledgeable', 'Could simplify complex concepts']
      },
      realTimeMetrics: {}
    },
    {
      id: '5',
      name: 'Jennifer Wu',
      title: 'AI Ethics Researcher',
      company: 'Stanford AI Lab',
      avatar: '/api/placeholder/100/100',
      bio: 'Pioneering research in AI ethics and responsible AI development with focus on fairness and bias mitigation.',
      expertise: ['AI Ethics', 'Bias Detection', 'Responsible AI', 'Policy Development'],
      socialLinks: {
        twitter: '@jen_ai_ethics',
        linkedin: 'jennifer-wu-stanford',
        website: 'jenniferwu.ai'
      },
      sessions: [
        {
          id: 's6',
          title: 'Building Ethical AI Systems',
          type: 'workshop',
          date: '2025-01-10T10:30:00Z',
          duration: 90,
          venue: 'Ethics Lab',
          attendees: 35,
          maxCapacity: 40
        }
      ],
      aiInsights: {
        speakingScore: 88,
        engagementPrediction: 91,
        audienceMatch: 89,
        topicRelevance: 95,
        experienceLevel: 'Expert',
        recommendedAudience: ['AI Developers', 'Policy Makers', 'Ethics Researchers'],
        speakingStyle: 'Thoughtful and Interactive',
        keyTopics: ['AI Ethics', 'Bias Mitigation', 'Responsible Development', 'Policy Framework']
      },
      feedback: {
        overall: 4.9,
        clarity: 4.8,
        engagement: 4.9,
        expertise: 4.7,
        delivery: 4.9,
        totalRatings: 42,
        comments: ['Incredibly thoughtful approach', 'Interactive and engaging', 'Essential topic well presented']
      },
      realTimeMetrics: {}
    }
  ]);

  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [filterExpertise, setFilterExpertise] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'sessions'>('rating');

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeakers(prev => prev.map(speaker => {
        if (speaker.realTimeMetrics.currentSession) {
          return {
            ...speaker,
            realTimeMetrics: {
              ...speaker.realTimeMetrics,
              engagementScore: Math.floor(Math.random() * 10) + 85,
              questionCount: speaker.realTimeMetrics.questionCount! + Math.floor(Math.random() * 2)
            }
          };
        }
        return speaker;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAllExpertise = () => {
    const expertise = new Set<string>();
    speakers.forEach(speaker => {
      speaker.expertise.forEach(exp => expertise.add(exp));
    });
    return Array.from(expertise);
  };

  const filteredAndSortedSpeakers = speakers
    .filter(speaker => 
      filterExpertise === 'all' || speaker.expertise.includes(filterExpertise)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.feedback.overall - a.feedback.overall;
        case 'sessions':
          return b.sessions.length - a.sessions.length;
        default:
          return 0;
      }
    });

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return '#8b5cf6';
      case 'workshop': return '#10b981';
      case 'panel': return '#f59e0b';
      case 'presentation': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Beginner': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ color: 'white', minHeight: '600px' }}>
      {/* AI Overview Dashboard */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Brain size={24} color="#60a5fa" style={{ marginRight: '12px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Speaker Intelligence Dashboard</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>{speakers.length}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Speakers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {speakers.reduce((sum, s) => sum + s.sessions.length, 0)}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Sessions</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {(speakers.reduce((sum, s) => sum + s.feedback.overall, 0) / speakers.length).toFixed(1)}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Rating</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>
              {speakers.filter(s => s.realTimeMetrics.currentSession).length}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Live Sessions</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#9ca3af' }}>Filter by expertise:</span>
          <select
            value={filterExpertise}
            onChange={(e) => setFilterExpertise(e.target.value)}
            style={{
              backgroundColor: '#374151',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '14px'
            }}
          >
            <option value="all">All Expertise</option>
            {getAllExpertise().map(exp => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#9ca3af' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              backgroundColor: '#374151',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '14px'
            }}
          >
            <option value="rating">Rating</option>
            <option value="name">Name</option>
            <option value="sessions">Sessions</option>
          </select>
        </div>
      </div>

      {/* Speakers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '20px'
      }}>
        {filteredAndSortedSpeakers.map(speaker => (
          <div
            key={speaker.id}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '12px',
              border: '1px solid #374151',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => setSelectedSpeaker(speaker)}
          >
            {/* Live Indicator */}
            {speaker.realTimeMetrics.currentSession && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 1
              }}>
                <Activity size={12} />
                LIVE
              </div>
            )}

            {/* Header with Avatar and Basic Info */}
            <div style={{ padding: '20px 20px 0 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginRight: '16px',
                    border: '2px solid #374151'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>
                    {speaker.name}
                  </h3>
                  <p style={{ margin: '0 0 4px 0', color: '#60a5fa', fontSize: '14px' }}>
                    {speaker.title}
                  </p>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>
                    {speaker.company}
                  </p>
                </div>
              </div>

              {/* AI Insights Bar */}
              <div style={{
                backgroundColor: '#374151',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Zap size={16} color="#60a5fa" style={{ marginRight: '8px' }} />
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>AI Score: {speaker.aiInsights.speakingScore}/100</span>
                  <span style={{
                    marginLeft: 'auto',
                    backgroundColor: getExperienceLevelColor(speaker.aiInsights.experienceLevel),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {speaker.aiInsights.experienceLevel}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#1f2937',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${speaker.aiInsights.speakingScore}%`,
                    height: '100%',
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Real-time Metrics (if live) */}
              {speaker.realTimeMetrics.currentSession && (
                <div style={{
                  backgroundColor: '#065f46',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  border: '1px solid #10b981'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#10b981' }}>
                    Live Session Metrics
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div>
                      <Users size={14} style={{ marginBottom: '2px' }} />
                      <div>{speaker.realTimeMetrics.liveAttendees} attendees</div>
                    </div>
                    <div>
                      <TrendingUp size={14} style={{ marginBottom: '2px' }} />
                      <div>{speaker.realTimeMetrics.engagementScore}% engaged</div>
                    </div>
                    <div>
                      <MessageSquare size={14} style={{ marginBottom: '2px' }} />
                      <div>{speaker.realTimeMetrics.questionCount} questions</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Expertise Tags */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {speaker.expertise.slice(0, 4).map(exp => (
                    <span
                      key={exp}
                      style={{
                        backgroundColor: '#374151',
                        color: '#9ca3af',
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div style={{ padding: '0 20px 16px 20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#9ca3af' }}>
                Sessions ({speaker.sessions.length})
              </h4>
              {speaker.sessions.slice(0, 2).map(session => (
                <div
                  key={session.id}
                  style={{
                    backgroundColor: '#374151',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    marginBottom: '8px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <span
                      style={{
                        backgroundColor: getSessionTypeColor(session.type),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        marginRight: '8px'
                      }}
                    >
                      {session.type}
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{session.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '12px' }}>
                    <span>{formatDate(session.date)}</span>
                    <span>{session.attendees}/{session.maxCapacity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Rating and Stats */}
            <div style={{
              backgroundColor: '#111827',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontWeight: 'bold' }}>{speaker.feedback.overall.toFixed(1)}</span>
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                  ({speaker.feedback.totalRatings} reviews)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#9ca3af' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mic size={14} />
                  <span>{speaker.sessions.length}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BarChart3 size={14} />
                  <span>{speaker.aiInsights.engagementPrediction}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Speaker Modal */}
      {selectedSpeaker && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setSelectedSpeaker(null)}>
          <div style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid #374151'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{selectedSpeaker.name}</h2>
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '24px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Left Column */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <img
                      src={selectedSpeaker.avatar}
                      alt={selectedSpeaker.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        marginRight: '16px',
                        border: '3px solid #374151'
                      }}
                    />
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{selectedSpeaker.title}</h3>
                      <p style={{ margin: '0 0 8px 0', color: '#60a5fa' }}>{selectedSpeaker.company}</p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {selectedSpeaker.socialLinks.twitter && (
                          <span style={{ color: '#9ca3af', fontSize: '14px' }}>@{selectedSpeaker.socialLinks.twitter}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p style={{ color: '#9ca3af', marginBottom: '20px', lineHeight: '1.5' }}>
                    {selectedSpeaker.bio}
                  </p>

                  <h4 style={{ margin: '0 0 12px 0', color: '#60a5fa' }}>All Sessions</h4>
                  {selectedSpeaker.sessions.map(session => (
                    <div
                      key={session.id}
                      style={{
                        backgroundColor: '#374151',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span
                          style={{
                            backgroundColor: getSessionTypeColor(session.type),
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            marginRight: '12px'
                          }}
                        >
                          {session.type}
                        </span>
                        <h5 style={{ margin: 0, fontSize: '16px' }}>{session.title}</h5>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', color: '#9ca3af' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} />
                          {formatDate(session.date)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} />
                          {session.duration} min
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={14} />
                          {session.venue}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={14} />
                          {session.attendees}/{session.maxCapacity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div>
                  {/* AI Insights */}
                  <h4 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>AI Analysis</h4>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                          {selectedSpeaker.aiInsights.speakingScore}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Speaking Score</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
                          {selectedSpeaker.aiInsights.engagementPrediction}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Engagement</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8b5cf6' }}>
                          {selectedSpeaker.aiInsights.audienceMatch}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Audience Match</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
                          {selectedSpeaker.aiInsights.topicRelevance}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Topic Relevance</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Speaking Style</h5>
                      <span style={{
                        backgroundColor: '#374151',
                        color: '#60a5fa',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}>
                        {selectedSpeaker.aiInsights.speakingStyle}
                      </span>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Recommended Audience</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedSpeaker.aiInsights.recommendedAudience.map(audience => (
                          <span
                            key={audience}
                            style={{
                              backgroundColor: '#374151',
                              color: '#9ca3af',
                              fontSize: '12px',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {audience}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Key Topics</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedSpeaker.aiInsights.keyTopics.map(topic => (
                          <span
                            key={topic}
                            style={{
                              backgroundColor: '#374151',
                              color: '#60a5fa',
                              fontSize: '12px',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feedback Ratings */}
                  <h4 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>Feedback Analysis</h4>
                  <div style={{ marginBottom: '20px' }}>
                    {[
                      { label: 'Overall', value: selectedSpeaker.feedback.overall, key: 'overall' },
                      { label: 'Clarity', value: selectedSpeaker.feedback.clarity, key: 'clarity' },
                      { label: 'Engagement', value: selectedSpeaker.feedback.engagement, key: 'engagement' },
                      { label: 'Expertise', value: selectedSpeaker.feedback.expertise, key: 'expertise' },
                      { label: 'Delivery', value: selectedSpeaker.feedback.delivery, key: 'delivery' }
                    ].map(rating => (
                      <div key={rating.key} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px' }}>{rating.label}</span>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{rating.value.toFixed(1)}/5.0</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#374151',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(rating.value / 5) * 100}%`,
                            height: '100%',
                            backgroundColor: rating.value >= 4.5 ? '#10b981' : rating.value >= 4 ? '#3b82f6' : '#f59e0b',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    ))}
                    
                    <div style={{ marginTop: '16px', fontSize: '14px', color: '#9ca3af' }}>
                      Based on {selectedSpeaker.feedback.totalRatings} ratings
                    </div>
                  </div>

                  {/* Recent Comments */}
                  <h4 style={{ margin: '0 0 12px 0', color: '#60a5fa' }}>Recent Comments</h4>
                  <div>
                    {selectedSpeaker.feedback.comments.slice(0, 3).map((comment, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#374151',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          marginBottom: '8px',
                          fontSize: '13px',
                          color: '#9ca3af',
                          fontStyle: 'italic'
                        }}
                      >
                        "{comment}"
                      </div>
                    ))}
                  </div>

                  {/* Live Session Metrics (if applicable) */}
                  {selectedSpeaker.realTimeMetrics.currentSession && (
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#10b981' }}>Live Session Data</h4>
                      <div style={{
                        backgroundColor: '#065f46',
                        borderRadius: '8px',
                        padding: '16px',
                        border: '1px solid #10b981'
                      }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#10b981' }}>
                          {selectedSpeaker.realTimeMetrics.currentSession}
                        </h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '14px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <Users size={20} color="#10b981" style={{ marginBottom: '4px' }} />
                            <div style={{ fontWeight: 'bold' }}>{selectedSpeaker.realTimeMetrics.liveAttendees}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Live Attendees</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <TrendingUp size={20} color="#10b981" style={{ marginBottom: '4px' }} />
                            <div style={{ fontWeight: 'bold' }}>{selectedSpeaker.realTimeMetrics.engagementScore}%</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Engagement</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <MessageSquare size={20} color="#10b981" style={{ marginBottom: '4px' }} />
                            <div style={{ fontWeight: 'bold' }}>{selectedSpeaker.realTimeMetrics.questionCount}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Questions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakersComponent;