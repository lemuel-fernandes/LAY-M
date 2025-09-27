import React, { useState, useEffect } from 'react';
import { Users, MapPin, Clock, Award, Star, Activity, CheckCircle, AlertCircle, Calendar, MessageSquare, Zap, Brain, TrendingUp, UserCheck } from 'lucide-react';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  experience: 'Newcomer' | 'Experienced' | 'Veteran';
  skills: string[];
  languages: string[];
  availability: {
    date: string;
    timeSlots: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  }[];
  assignments: {
    id: string;
    task: string;
    location: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
  }[];
  performance: {
    rating: number;
    completedTasks: number;
    totalAssigned: number;
    punctuality: number;
    teamwork: number;
    communication: number;
    reliability: number;
    feedback: string[];
  };
  aiInsights: {
    efficiencyScore: number;
    workloadBalance: number;
    skillMatch: number;
    burnoutRisk: number;
    teamFit: number;
    recommendations: string[];
    optimalShifts: string[];
    strengths: string[];
    improvementAreas: string[];
  };
  realTimeStatus: {
    currentTask?: string;
    location?: string;
    lastCheckIn?: string;
    isActive: boolean;
    nextTask?: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

const VolunteersComponent = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: '1',
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1-555-0123',
      avatar: '/api/placeholder/80/80',
      role: 'Registration Lead',
      department: 'Check-in & Registration',
      experience: 'Veteran',
      skills: ['Customer Service', 'Problem Solving', 'Multi-language', 'Leadership'],
      languages: ['English', 'Mandarin', 'Spanish'],
      availability: [
        {
          date: '2025-01-10',
          timeSlots: { morning: true, afternoon: true, evening: false }
        },
        {
          date: '2025-01-11',
          timeSlots: { morning: true, afternoon: true, evening: true }
        }
      ],
      assignments: [
        {
          id: 'a1',
          task: 'Welcome Desk Management',
          location: 'Main Entrance',
          startTime: '2025-01-10T08:00:00Z',
          endTime: '2025-01-10T12:00:00Z',
          status: 'in-progress',
          priority: 'high'
        },
        {
          id: 'a2',
          task: 'Speaker Check-in Coordination',
          location: 'Green Room',
          startTime: '2025-01-10T13:00:00Z',
          endTime: '2025-01-10T15:00:00Z',
          status: 'scheduled',
          priority: 'high'
        }
      ],
      performance: {
        rating: 4.8,
        completedTasks: 23,
        totalAssigned: 25,
        punctuality: 98,
        teamwork: 4.9,
        communication: 4.7,
        reliability: 4.8,
        feedback: ['Exceptional leadership', 'Always goes above and beyond', 'Great with difficult situations']
      },
      aiInsights: {
        efficiencyScore: 94,
        workloadBalance: 85,
        skillMatch: 96,
        burnoutRisk: 25,
        teamFit: 92,
        recommendations: ['Consider for team lead role', 'Delegate more routine tasks', 'Perfect for VIP interactions'],
        optimalShifts: ['Morning', 'Peak Hours'],
        strengths: ['Leadership', 'Multilingual', 'Crisis Management'],
        improvementAreas: ['Work-life balance', 'Delegation skills']
      },
      realTimeStatus: {
        currentTask: 'Welcome Desk Management',
        location: 'Main Entrance',
        lastCheckIn: '2025-01-10T10:30:00Z',
        isActive: true,
        nextTask: 'Speaker Check-in Coordination'
      },
      emergencyContact: {
        name: 'David Chen',
        relationship: 'Spouse',
        phone: '+1-555-0124'
      }
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+1-555-0234',
      avatar: '/api/placeholder/80/80',
      role: 'Tech Support',
      department: 'Technical Operations',
      experience: 'Experienced',
      skills: ['AV Equipment', 'Troubleshooting', 'Network Setup', 'Live Streaming'],
      languages: ['English', 'French'],
      availability: [
        {
          date: '2025-01-10',
          timeSlots: { morning: true, afternoon: true, evening: true }
        }
      ],
      assignments: [
        {
          id: 'a3',
          task: 'Main Stage AV Setup',
          location: 'Main Auditorium',
          startTime: '2025-01-10T07:00:00Z',
          endTime: '2025-01-10T09:00:00Z',
          status: 'completed',
          priority: 'high'
        },
        {
          id: 'a4',
          task: 'Live Stream Monitoring',
          location: 'Control Room',
          startTime: '2025-01-10T09:30:00Z',
          endTime: '2025-01-10T17:30:00Z',
          status: 'in-progress',
          priority: 'medium'
        }
      ],
      performance: {
        rating: 4.6,
        completedTasks: 18,
        totalAssigned: 20,
        punctuality: 95,
        teamwork: 4.5,
        communication: 4.3,
        reliability: 4.7,
        feedback: ['Technical expert', 'Quick problem solver', 'Could improve communication']
      },
      aiInsights: {
        efficiencyScore: 88,
        workloadBalance: 78,
        skillMatch: 94,
        burnoutRisk: 35,
        teamFit: 82,
        recommendations: ['Assign complex technical tasks', 'Pair with communication-strong volunteers', 'Schedule adequate breaks'],
        optimalShifts: ['All day shifts', 'Critical technical periods'],
        strengths: ['Technical expertise', 'Problem solving', 'Equipment handling'],
        improvementAreas: ['Communication', 'Team collaboration']
      },
      realTimeStatus: {
        currentTask: 'Live Stream Monitoring',
        location: 'Control Room',
        lastCheckIn: '2025-01-10T11:15:00Z',
        isActive: true,
        nextTask: undefined
      },
      emergencyContact: {
        name: 'Sarah Johnson',
        relationship: 'Sister',
        phone: '+1-555-0235'
      }
    },
    {
      id: '3',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+1-555-0345',
      avatar: '/api/placeholder/80/80',
      role: 'Workshop Assistant',
      department: 'Education & Workshops',
      experience: 'Newcomer',
      skills: ['Organization', 'Note Taking', 'Student Support', 'Material Prep'],
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: [
        {
          date: '2025-01-10',
          timeSlots: { morning: false, afternoon: true, evening: true }
        }
      ],
      assignments: [
        {
          id: 'a5',
          task: 'Workshop Material Setup',
          location: 'Workshop Room 1',
          startTime: '2025-01-10T13:00:00Z',
          endTime: '2025-01-10T14:00:00Z',
          status: 'scheduled',
          priority: 'medium'
        },
        {
          id: 'a6',
          task: 'Participant Registration',
          location: 'Workshop Hall Entrance',
          startTime: '2025-01-10T14:00:00Z',
          endTime: '2025-01-10T18:00:00Z',
          status: 'scheduled',
          priority: 'medium'
        }
      ],
      performance: {
        rating: 4.2,
        completedTasks: 8,
        totalAssigned: 10,
        punctuality: 90,
        teamwork: 4.4,
        communication: 4.1,
        reliability: 4.0,
        feedback: ['Eager to learn', 'Good attention to detail', 'Needs more confidence']
      },
      aiInsights: {
        efficiencyScore: 76,
        workloadBalance: 92,
        skillMatch: 78,
        burnoutRisk: 15,
        teamFit: 85,
        recommendations: ['Pair with experienced volunteer', 'Provide additional training', 'Focus on confidence building'],
        optimalShifts: ['Afternoon', 'Evening'],
        strengths: ['Enthusiasm', 'Multilingual', 'Detail-oriented'],
        improvementAreas: ['Confidence', 'Experience', 'Independent decision making']
      },
      realTimeStatus: {
        currentTask: undefined,
        location: undefined,
        lastCheckIn: '2025-01-10T08:45:00Z',
        isActive: false,
        nextTask: 'Workshop Material Setup'
      },
      emergencyContact: {
        name: 'Raj Patel',
        relationship: 'Father',
        phone: '+1-555-0346'
      }
    },
    {
      id: '4',
      name: 'Alex Rivera',
      email: 'alex.rivera@email.com',
      phone: '+1-555-0456',
      avatar: '/api/placeholder/80/80',
      role: 'Logistics Coordinator',
      department: 'Operations & Logistics',
      experience: 'Experienced',
      skills: ['Project Management', 'Resource Planning', 'Team Coordination', 'Crisis Management'],
      languages: ['English', 'Spanish'],
      availability: [
        {
          date: '2025-01-10',
          timeSlots: { morning: true, afternoon: true, evening: false }
        }
      ],
      assignments: [
        {
          id: 'a7',
          task: 'Vendor Coordination',
          location: 'Exhibition Hall',
          startTime: '2025-01-10T08:30:00Z',
          endTime: '2025-01-10T12:30:00Z',
          status: 'completed',
          priority: 'medium'
        },
        {
          id: 'a8',
          task: 'Lunch Service Oversight',
          location: 'Catering Area',
          startTime: '2025-01-10T11:30:00Z',
          endTime: '2025-01-10T14:30:00Z',
          status: 'in-progress',
          priority: 'high'
        }
      ],
      performance: {
        rating: 4.7,
        completedTasks: 15,
        totalAssigned: 16,
        punctuality: 100,
        teamwork: 4.8,
        communication: 4.6,
        reliability: 4.9,
        feedback: ['Excellent coordinator', 'Great under pressure', 'Natural leader']
      },
      aiInsights: {
        efficiencyScore: 92,
        workloadBalance: 88,
        skillMatch: 91,
        burnoutRisk: 30,
        teamFit: 94,
        recommendations: ['Consider for senior coordinator role', 'Manage complex multi-team tasks', 'Mentor newcomers'],
        optimalShifts: ['Peak coordination periods', 'Crisis situations'],
        strengths: ['Leadership', 'Organization', 'Crisis management'],
        improvementAreas: ['Stress management', 'Workload distribution']
      },
      realTimeStatus: {
        currentTask: 'Lunch Service Oversight',
        location: 'Catering Area',
        lastCheckIn: '2025-01-10T12:00:00Z',
        isActive: true,
        nextTask: undefined
      },
      emergencyContact: {
        name: 'Maria Rivera',
        relationship: 'Mother',
        phone: '+1-555-0457'
      }
    }
  ]);

  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'efficiency'>('efficiency');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVolunteers(prev => prev.map(volunteer => {
        if (volunteer.realTimeStatus.isActive) {
          return {
            ...volunteer,
            realTimeStatus: {
              ...volunteer.realTimeStatus,
              lastCheckIn: new Date().toISOString()
            }
          };
        }
        return volunteer;
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getDepartments = () => {
    const departments = new Set<string>();
    volunteers.forEach(volunteer => departments.add(volunteer.department));
    return Array.from(departments);
  };

  const filteredAndSortedVolunteers = volunteers
    .filter(volunteer => {
      const deptMatch = filterDepartment === 'all' || volunteer.department === filterDepartment;
      const statusMatch = filterStatus === 'all' || 
        (filterStatus === 'active' && volunteer.realTimeStatus.isActive) ||
        (filterStatus === 'inactive' && !volunteer.realTimeStatus.isActive);
      return deptMatch && statusMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.performance.rating - a.performance.rating;
        case 'efficiency':
          return b.aiInsights.efficiencyScore - a.aiInsights.efficiencyScore;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#3b82f6';
      case 'scheduled': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Veteran': return '#8b5cf6';
      case 'Experienced': return '#3b82f6';
      case 'Newcomer': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSinceCheckIn = (lastCheckIn: string) => {
    const now = new Date();
    const checkIn = new Date(lastCheckIn);
    const diffMinutes = Math.floor((now.getTime() - checkIn.getTime()) / 60000);
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div style={{ color: 'white', minHeight: '600px' }}>
      {/* Volunteer Intelligence Dashboard */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Brain size={24} color="#60a5fa" style={{ marginRight: '12px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Volunteer Intelligence Center</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>
              {volunteers.length}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Volunteers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {volunteers.filter(v => v.realTimeStatus.isActive).length}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Currently Active</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {Math.round(volunteers.reduce((sum, v) => sum + v.performance.rating, 0) / volunteers.length * 10) / 10}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Rating</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>
              {volunteers.reduce((sum, v) => sum + v.assignments.length, 0)}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Total Tasks</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ec4899' }}>
              {Math.round(volunteers.reduce((sum, v) => sum + v.aiInsights.efficiencyScore, 0) / volunteers.length)}%
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Efficiency</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4' }}>
              {volunteers.filter(v => v.aiInsights.burnoutRisk < 30).length}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Low Burnout Risk</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#9ca3af' }}>Department:</span>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              style={{
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="all">All Departments</option>
              {getDepartments().map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#9ca3af' }}>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                backgroundColor: '#374151',
                border: '1px solid #4b5563',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '14px'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            <option value="efficiency">Efficiency</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Volunteers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {filteredAndSortedVolunteers.map(volunteer => (
          <div
            key={volunteer.id}
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
            onClick={() => setSelectedVolunteer(volunteer)}
          >
            {/* Status Indicator */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: volunteer.realTimeStatus.isActive ? '#10b981' : '#6b7280',
                animation: volunteer.realTimeStatus.isActive ? 'pulse 2s infinite' : 'none'
              }} />
              <span style={{
                fontSize: '12px',
                color: volunteer.realTimeStatus.isActive ? '#10b981' : '#6b7280',
                fontWeight: 'bold'
              }}>
                {volunteer.realTimeStatus.isActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>

            {/* Header */}
            <div style={{ padding: '20px 20px 0 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img
                  src={volunteer.avatar}
                  alt={volunteer.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginRight: '16px',
                    border: `3px solid ${volunteer.realTimeStatus.isActive ? '#10b981' : '#374151'}`
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>
                    {volunteer.name}
                  </h3>
                  <p style={{ margin: '0 0 4px 0', color: '#60a5fa', fontSize: '14px' }}>
                    {volunteer.role}
                  </p>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '13px' }}>
                    {volunteer.department}
                  </p>
                </div>
                <span style={{
                  backgroundColor: getExperienceColor(volunteer.experience),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {volunteer.experience}
                </span>
              </div>

              {/* AI Efficiency Score */}
              <div style={{
                backgroundColor: '#374151',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="#60a5fa" />
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>AI Efficiency Score</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>
                    {volunteer.aiInsights.efficiencyScore}/100
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
                    width: `${volunteer.aiInsights.efficiencyScore}%`,
                    height: '100%',
                    background: 'linear-gradient(to right, #3b82f6, #10b981)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Current Status */}
              {volunteer.realTimeStatus.isActive && volunteer.realTimeStatus.currentTask ? (
                <div style={{
                  backgroundColor: '#065f46',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  border: '1px solid #10b981'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Activity size={16} color="#10b981" style={{ marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
                      Currently Active
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>
                    Task: {volunteer.realTimeStatus.currentTask}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>
                    Location: {volunteer.realTimeStatus.location}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Last check-in: {getTimeSinceCheckIn(volunteer.realTimeStatus.lastCheckIn!)}
                  </div>
                </div>
              ) : (
                <div style={{
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Clock size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>Next Assignment</span>
                  </div>
                  {volunteer.realTimeStatus.nextTask ? (
                    <div style={{ fontSize: '13px', color: '#60a5fa' }}>
                      {volunteer.realTimeStatus.nextTask}
                    </div>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      No upcoming tasks
                    </div>
                  )}
                </div>
              )}

              {/* Performance Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>
                    {volunteer.performance.rating.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Rating</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                    {volunteer.performance.completedTasks}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Completed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                    {volunteer.performance.punctuality}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Punctuality</div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>
                  Top Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {volunteer.skills.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      style={{
                        backgroundColor: '#374151',
                        color: '#60a5fa',
                        fontSize: '12px',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Assignments */}
            <div style={{ padding: '0 20px 16px 20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#9ca3af' }}>
                Today's Assignments ({volunteer.assignments.length})
              </h4>
              {volunteer.assignments.slice(0, 2).map(assignment => (
                <div
                  key={assignment.id}
                  style={{
                    backgroundColor: '#374151',
                    borderRadius: '6px',
                    padding: '10px',
                    marginBottom: '8px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                    <span
                      style={{
                        backgroundColor: getStatusColor(assignment.status),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        marginRight: '8px'
                      }}
                    >
                      {assignment.status}
                    </span>
                    <span
                      style={{
                        backgroundColor: getPriorityColor(assignment.priority),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        marginRight: '8px'
                      }}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {assignment.task}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '12px' }}>
                    <span>📍 {assignment.location}</span>
                    <span>{formatTime(assignment.startTime)} - {formatTime(assignment.endTime)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Risk Assessment */}
            <div style={{
              backgroundColor: '#111827',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Brain size={14} color="#8b5cf6" />
                  <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold' }}>
                    Burnout Risk
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: volunteer.aiInsights.burnoutRisk < 30 ? '#10b981' : volunteer.aiInsights.burnoutRisk < 60 ? '#f59e0b' : '#ef4444' }}>
                  {volunteer.aiInsights.burnoutRisk}% {volunteer.aiInsights.burnoutRisk < 30 ? 'Low' : volunteer.aiInsights.burnoutRisk < 60 ? 'Medium' : 'High'}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <UserCheck size={14} color="#60a5fa" />
                  <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 'bold' }}>
                    Team Fit
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
                  {volunteer.aiInsights.teamFit}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Volunteer Modal */}
      {selectedVolunteer && (
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
        }} onClick={() => setSelectedVolunteer(null)}>
          <div style={{
            backgroundColor: '#1f2937',
            borderRadius: '16px',
            maxWidth: '1000px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid #374151'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={selectedVolunteer.avatar}
                    alt={selectedVolunteer.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: `3px solid ${selectedVolunteer.realTimeStatus.isActive ? '#10b981' : '#374151'}`
                    }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 'bold' }}>
                      {selectedVolunteer.name}
                    </h2>
                    <p style={{ margin: '0 0 4px 0', color: '#60a5fa', fontSize: '16px' }}>
                      {selectedVolunteer.role}
                    </p>
                    <p style={{ margin: '0 0 8px 0', color: '#9ca3af' }}>
                      {selectedVolunteer.department}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        backgroundColor: getExperienceColor(selectedVolunteer.experience),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {selectedVolunteer.experience}
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: selectedVolunteer.realTimeStatus.isActive ? '#10b981' : '#6b7280'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: selectedVolunteer.realTimeStatus.isActive ? '#10b981' : '#6b7280'
                        }} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          {selectedVolunteer.realTimeStatus.isActive ? 'ACTIVE' : 'OFFLINE'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVolunteer(null)}
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
                  {/* Contact Information */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#60a5fa' }}>Contact Information</h4>
                    <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
                      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                        <span style={{ color: '#9ca3af' }}>Email: </span>
                        <span>{selectedVolunteer.email}</span>
                      </div>
                      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                        <span style={{ color: '#9ca3af' }}>Phone: </span>
                        <span>{selectedVolunteer.phone}</span>
                      </div>
                      <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                        <span style={{ color: '#9ca3af' }}>Emergency Contact: </span>
                        <span>{selectedVolunteer.emergencyContact.name} ({selectedVolunteer.emergencyContact.relationship})</span>
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        <span style={{ color: '#9ca3af' }}>Emergency Phone: </span>
                        <span>{selectedVolunteer.emergencyContact.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills and Languages */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#60a5fa' }}>Skills & Languages</h4>
                    <div style={{ marginBottom: '12px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>Skills</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedVolunteer.skills.map(skill => (
                          <span
                            key={skill}
                            style={{
                              backgroundColor: '#374151',
                              color: '#60a5fa',
                              fontSize: '12px',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af' }}>Languages</h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {selectedVolunteer.languages.map(lang => (
                          <span
                            key={lang}
                            style={{
                              backgroundColor: '#374151',
                              color: '#10b981',
                              fontSize: '12px',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* All Assignments */}
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', color: '#60a5fa' }}>All Assignments</h4>
                    {selectedVolunteer.assignments.map(assignment => (
                      <div
                        key={assignment.id}
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
                              backgroundColor: getStatusColor(assignment.status),
                              color: 'white',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              marginRight: '8px'
                            }}
                          >
                            {assignment.status}
                          </span>
                          <span
                            style={{
                              backgroundColor: getPriorityColor(assignment.priority),
                              color: 'white',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {assignment.priority}
                          </span>
                        </div>
                        <h5 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{assignment.task}</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', color: '#9ca3af' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} />
                            {assignment.location}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {formatTime(assignment.startTime)} - {formatTime(assignment.endTime)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* AI Insights */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>AI Performance Analysis</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                      {[
                        { label: 'Efficiency', value: selectedVolunteer.aiInsights.efficiencyScore, color: '#10b981' },
                        { label: 'Workload Balance', value: selectedVolunteer.aiInsights.workloadBalance, color: '#3b82f6' },
                        { label: 'Skill Match', value: selectedVolunteer.aiInsights.skillMatch, color: '#8b5cf6' },
                        { label: 'Team Fit', value: selectedVolunteer.aiInsights.teamFit, color: '#f59e0b' }
                      ].map(metric => (
                        <div key={metric.label} style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: metric.color }}>
                            {metric.value}%
                          </div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Burnout Risk Assessment</h5>
                      <div style={{
                        backgroundColor: selectedVolunteer.aiInsights.burnoutRisk < 30 ? '#065f46' : selectedVolunteer.aiInsights.burnoutRisk < 60 ? '#92400e' : '#7f1d1d',
                        borderRadius: '8px',
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                          {selectedVolunteer.aiInsights.burnoutRisk}%
                        </div>
                        <div style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                          {selectedVolunteer.aiInsights.burnoutRisk < 30 ? 'Low Risk' : selectedVolunteer.aiInsights.burnoutRisk < 60 ? 'Medium Risk' : 'High Risk'}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>AI Recommendations</h5>
                      {selectedVolunteer.aiInsights.recommendations.map((rec, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '6px',
                          fontSize: '13px'
                        }}>
                          <Zap size={12} color="#60a5fa" />
                          <span style={{ color: '#9ca3af' }}>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Ratings */}
                  <div>
                    <h4 style={{ margin: '0 0 16px 0', color: '#60a5fa' }}>Performance Metrics</h4>
                    
                    {[
                      { label: 'Overall Rating', value: selectedVolunteer.performance.rating, max: 5 },
                      { label: 'Teamwork', value: selectedVolunteer.performance.teamwork, max: 5 },
                      { label: 'Communication', value: selectedVolunteer.performance.communication, max: 5 },
                      { label: 'Reliability', value: selectedVolunteer.performance.reliability, max: 5 }
                    ].map(rating => (
                      <div key={rating.label} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px' }}>{rating.label}</span>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{rating.value.toFixed(1)}/{rating.max}</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#374151',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(rating.value / rating.max) * 100}%`,
                            height: '100%',
                            backgroundColor: rating.value >= 4.5 ? '#10b981' : rating.value >= 4 ? '#3b82f6' : '#f59e0b',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    ))}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                          {selectedVolunteer.performance.completedTasks}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Tasks Completed</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                          {selectedVolunteer.performance.punctuality}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Punctuality</div>
                      </div>
                    </div>

                    {/* Recent Feedback */}
                    <div style={{ marginTop: '20px' }}>
                      <h5 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Recent Feedback</h5>
                      {selectedVolunteer.performance.feedback.slice(0, 3).map((feedback, index) => (
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
                          "{feedback}"
                        </div>
                      ))}
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

export default VolunteersComponent;