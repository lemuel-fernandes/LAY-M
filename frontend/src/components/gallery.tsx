import React, { useState, useEffect } from 'react';
import { Camera, Image, Video, Eye, Heart, Share, Brain, TrendingUp, Users, Plus, Filter, Smile, Star } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  views: number;
  likes: number;
  tags: string[];
  aiAnalysis: {
    faceCount: number;
    smileDetection: number;
    engagementScore: number;
    emotionAnalysis: {
      happy: number;
      excited: number;
      focused: number;
      neutral: number;
    };
    objectsDetected: string[];
    qualityScore: number;
    recommendations: string[];
  };
  socialMetrics: {
    shares: number;
    comments: number;
    saveCount: number;
  };
}

const GalleryComponent = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: '/api/placeholder/800/600',
      thumbnail: '/api/placeholder/300/200',
      title: 'Opening Keynote Session',
      description: 'Dr. Priya Sharma delivering the opening keynote on Future of AI',
      uploadedBy: 'Event Photography Team',
      uploadDate: '2025-01-10T09:30:00Z',
      views: 1250,
      likes: 89,
      tags: ['keynote', 'speaker', 'ai', 'technology'],
      aiAnalysis: {
        faceCount: 1,
        smileDetection: 85,
        engagementScore: 92,
        emotionAnalysis: {
          happy: 70,
          excited: 15,
          focused: 85,
          neutral: 10
        },
        objectsDetected: ['microphone', 'podium', 'screen', 'audience'],
        qualityScore: 94,
        recommendations: ['Perfect lighting', 'High engagement captured', 'Great composition']
      },
      socialMetrics: {
        shares: 45,
        comments: 12,
        saveCount: 67
      }
    },
    {
      id: '2',
      type: 'video',
      url: '/api/placeholder/1920/1080',
      thumbnail: '/api/placeholder/300/200',
      title: 'Networking Session Highlights',
      description: 'Attendees connecting and sharing ideas during the networking break',
      uploadedBy: 'Social Media Team',
      uploadDate: '2025-01-10T11:15:00Z',
      views: 890,
      likes: 156,
      tags: ['networking', 'attendees', 'collaboration', 'social'],
      aiAnalysis: {
        faceCount: 28,
        smileDetection: 78,
        engagementScore: 86,
        emotionAnalysis: {
          happy: 65,
          excited: 45,
          focused: 35,
          neutral: 20
        },
        objectsDetected: ['people', 'drinks', 'badges', 'tables', 'phones'],
        qualityScore: 88,
        recommendations: ['High social activity', 'Good networking energy', 'Multiple conversations detected']
      },
      socialMetrics: {
        shares: 78,
        comments: 23,
        saveCount: 45
      }
    },
    {
      id: '3',
      type: 'image',
      url: '/api/placeholder/800/600',
      thumbnail: '/api/placeholder/300/200',
      title: 'Workshop in Progress',
      description: 'Participants engaged in hands-on machine learning workshop',
      uploadedBy: 'Workshop Facilitator',
      uploadDate: '2025-01-10T14:45:00Z',
      views: 634,
      likes: 73,
      tags: ['workshop', 'learning', 'hands-on', 'ml'],
      aiAnalysis: {
        faceCount: 15,
        smileDetection: 65,
        engagementScore: 91,
        emotionAnalysis: {
          happy: 40,
          excited: 30,
          focused: 90,
          neutral: 25
        },
        objectsDetected: ['laptops', 'notebooks', 'whiteboards', 'people'],
        qualityScore: 89,
        recommendations: ['High focus detected', 'Active learning environment', 'Great educational moment']
      },
      socialMetrics: {
        shares: 34,
        comments: 8,
        saveCount: 52
      }
    },
    {
      id: '4',
      type: 'video',
      url: '/api/placeholder/1920/1080',
      thumbnail: '/api/placeholder/300/200',
      title: 'Panel Discussion Highlights',
      description: 'Expert panel discussing ethics in AI development',
      uploadedBy: 'Content Team',
      uploadDate: '2025-01-10T16:20:00Z',
      views: 1100,
      likes: 142,
      tags: ['panel', 'discussion', 'ethics', 'experts'],
      aiAnalysis: {
        faceCount: 5,
        smileDetection: 72,
        engagementScore: 88,
        emotionAnalysis: {
          happy: 45,
          excited: 25,
          focused: 85,
          neutral: 30
        },
        objectsDetected: ['panel', 'microphones', 'audience', 'screens'],
        qualityScore: 92,
        recommendations: ['Balanced discussion captured', 'Good audience engagement', 'Professional setup']
      },
      socialMetrics: {
        shares: 91,
        comments: 34,
        saveCount: 78
      }
    },
    {
      id: '5',
      type: 'image',
      url: '/api/placeholder/800/600',
      thumbnail: '/api/placeholder/300/200',
      title: 'Award Ceremony',
      description: 'Innovation awards presented to outstanding AI projects',
      uploadedBy: 'Event Team',
      uploadDate: '2025-01-10T18:30:00Z',
      views: 980,
      likes: 201,
      tags: ['awards', 'innovation', 'projects', 'recognition'],
      aiAnalysis: {
        faceCount: 12,
        smileDetection: 92,
        engagementScore: 95,
        emotionAnalysis: {
          happy: 85,
          excited: 70,
          focused: 60,
          neutral: 5
        },
        objectsDetected: ['trophy', 'stage', 'winners', 'applause'],
        qualityScore: 96,
        recommendations: ['Exceptional joy captured', 'Perfect timing', 'Award moment preserved']
      },
      socialMetrics: {
        shares: 156,
        comments: 45,
        saveCount: 89
      }
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [aiInsights, setAiInsights] = useState({
    totalMedia: 0,
    totalViews: 0,
    avgEngagement: 0,
    highQualityItems: 0,
    faceDetections: 0,
    avgSmileScore: 0
  });

  useEffect(() => {
    const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);
    const avgEngagement = Math.round(mediaItems.reduce((sum, item) => sum + item.aiAnalysis.engagementScore, 0) / mediaItems.length);
    const highQualityItems = mediaItems.filter(item => item.aiAnalysis.qualityScore >= 90).length;
    const faceDetections = mediaItems.reduce((sum, item) => sum + item.aiAnalysis.faceCount, 0);
    const avgSmileScore = Math.round(mediaItems.reduce((sum, item) => sum + item.aiAnalysis.smileDetection, 0) / mediaItems.length);

    setAiInsights({
      totalMedia: mediaItems.length,
      totalViews,
      avgEngagement,
      highQualityItems,
      faceDetections,
      avgSmileScore
    });
  }, [mediaItems]);

  const filteredItems = mediaItems.filter(item => 
    selectedFilter === 'all' || item.type === selectedFilter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEmotionColor = (emotion: string, value: number) => {
    if (value >= 70) return '#10b981';
    if (value >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ color: 'white', minHeight: '600px' }}>
      {/* AI Insights Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Brain size={24} color="#60a5fa" style={{ marginRight: '12px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>AI Media Intelligence</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>{aiInsights.totalMedia}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Media</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{aiInsights.totalViews.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Views</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>{aiInsights.avgEngagement}%</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Engagement</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>{aiInsights.highQualityItems}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>High Quality</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ec4899' }}>{aiInsights.faceDetections}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Faces Detected</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4' }}>{aiInsights.avgSmileScore}%</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Smiles</div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Filter size={20} color="#9ca3af" />
        <span style={{ color: '#9ca3af', marginRight: '12px' }}>Filter by type:</span>
        {['all', 'image', 'video'].map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: selectedFilter === filter ? '#2563eb' : '#374151',
              color: 'white',
              fontSize: '14px',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #374151',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => setSelectedMedia(item)}
          >
            {/* Media Thumbnail */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '6px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {item.type === 'video' ? <Video size={16} /> : <Image size={16} />}
                <span style={{ fontSize: '12px', textTransform: 'uppercase' }}>{item.type}</span>
              </div>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {item.aiAnalysis.qualityScore}% Quality
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Users size={14} />
                  <span style={{ fontSize: '12px' }}>{item.aiAnalysis.faceCount}</span>
                </div>
                <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Smile size={14} />
                  <span style={{ fontSize: '12px' }}>{item.aiAnalysis.smileDetection}%</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>{item.title}</h4>
              <p style={{ 
                margin: '0 0 12px 0', 
                fontSize: '14px', 
                color: '#9ca3af',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {item.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: '#374151',
                      color: '#9ca3af',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderTop: '1px solid #374151',
                paddingTop: '12px',
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={14} />
                  <span>{item.views.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={14} />
                  <span>{item.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} />
                  <span>{item.aiAnalysis.engagementScore}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedMedia && (
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
        }} onClick={() => setSelectedMedia(null)}>
          <div style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid #374151'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{selectedMedia.title}</h3>
                <button
                  onClick={() => setSelectedMedia(null)}
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
                {/* Left Column - Media and Basic Info */}
                <div>
                  <img
                    src={selectedMedia.thumbnail}
                    alt={selectedMedia.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}
                  />
                  <p style={{ color: '#9ca3af', marginBottom: '16px' }}>{selectedMedia.description}</p>
                  <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px' }}>
                    <div>By: {selectedMedia.uploadedBy}</div>
                    <div>Date: {formatDate(selectedMedia.uploadDate)}</div>
                  </div>
                </div>

                {/* Right Column - AI Analysis */}
                <div>
                  <h4 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>AI Analysis</h4>
                  
                  {/* Emotion Analysis */}
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Emotion Analysis</h5>
                    {Object.entries(selectedMedia.aiAnalysis.emotionAnalysis).map(([emotion, value]) => (
                      <div key={emotion} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ textTransform: 'capitalize', fontSize: '14px' }}>{emotion}</span>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{value}%</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#374151',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${value}%`,
                            height: '100%',
                            backgroundColor: getEmotionColor(emotion, value),
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Objects Detected */}
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Objects Detected</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedMedia.aiAnalysis.objectsDetected.map(obj => (
                        <span key={obj} style={{
                          backgroundColor: '#374151',
                          color: '#60a5fa',
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>AI Recommendations</h5>
                    {selectedMedia.aiAnalysis.recommendations.map((rec, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <Star size={14} color="#10b981" />
                        <span style={{ fontSize: '14px', color: '#9ca3af' }}>{rec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social Metrics */}
                  <div>
                    <h5 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Social Metrics</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <Share size={20} color="#60a5fa" style={{ marginBottom: '4px' }} />
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedMedia.socialMetrics.shares}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Shares</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedMedia.socialMetrics.comments}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Comments</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedMedia.socialMetrics.saveCount}</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Saves</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;