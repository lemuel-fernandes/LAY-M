import React, { useState, useEffect } from 'react';
import { Zap, Plus, CheckCircle, Clock, AlertTriangle, Brain, TrendingUp, Users } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: string;
  aiRiskScore: number;
  aiSuggestions: string[];
}

const TasksComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Setup Stage Audio System',
      description: 'Configure main stage audio equipment and sound check',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Audio Team',
      dueDate: '2025-01-15',
      aiRiskScore: 25,
      aiSuggestions: ['Weather backup plan needed', 'Extra microphones recommended']
    },
    {
      id: '2', 
      title: 'Vendor Coordination Meeting',
      description: 'Align with all vendors on logistics and timing',
      priority: 'medium',
      status: 'pending',
      assignee: 'Event Manager',
      dueDate: '2025-01-12',
      aiRiskScore: 15,
      aiSuggestions: ['Schedule buffer time', 'Backup vendor contacts ready']
    },
    {
      id: '3',
      title: 'Registration System Test',
      description: 'Test online registration and check-in process',
      priority: 'high',
      status: 'completed',
      assignee: 'Tech Team',
      dueDate: '2025-01-10',
      aiRiskScore: 5,
      aiSuggestions: ['System performing optimally']
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [aiInsights, setAiInsights] = useState({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    highRiskTasks: tasks.filter(t => t.aiRiskScore > 20).length,
    avgRiskScore: Math.round(tasks.reduce((sum, t) => sum + t.aiRiskScore, 0) / tasks.length)
  });

  useEffect(() => {
    setAiInsights({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      highRiskTasks: tasks.filter(t => t.aiRiskScore > 20).length,
      avgRiskScore: Math.round(tasks.reduce((sum, t) => sum + t.aiRiskScore, 0) / tasks.length)
    });
  }, [tasks]);

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
    metricCardOrange: {
      background: 'linear-gradient(135deg, #ea580c, #dc2626)'
    },
    metricCardPurple: {
      background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)'
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
    tasksGrid: {
      display: 'grid',
      gap: '16px'
    },
    taskCard: {
      backgroundColor: '#1f2937',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '20px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    taskTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '4px'
    },
    taskDescription: {
      color: '#9ca3af',
      fontSize: '14px',
      marginBottom: '16px'
    },
    taskFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    taskMeta: {
      display: 'flex',
      gap: '16px',
      fontSize: '12px',
      color: '#6b7280'
    },
    priorityBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    priorityHigh: {
      backgroundColor: '#dc2626',
      color: 'white'
    },
    priorityMedium: {
      backgroundColor: '#d97706',
      color: 'white'
    },
    priorityLow: {
      backgroundColor: '#059669',
      color: 'white'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    statusCompleted: {
      backgroundColor: '#059669',
      color: 'white'
    },
    statusInProgress: {
      backgroundColor: '#d97706',
      color: 'white'
    },
    statusPending: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    riskIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '12px',
      padding: '8px',
      borderRadius: '6px',
      backgroundColor: '#374151'
    },
    riskScore: {
      fontWeight: 'bold'
    },
    aiSuggestions: {
      marginTop: '12px',
      padding: '12px',
      backgroundColor: '#1e40af',
      borderRadius: '8px',
      border: '1px solid #3b82f6'
    },
    suggestionsTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#93c5fd',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    suggestionsList: {
      fontSize: '12px',
      color: '#dbeafe'
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      case 'low': return styles.priorityLow;
      default: return styles.priorityLow;
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'completed': return styles.statusCompleted;
      case 'in-progress': return styles.statusInProgress;
      case 'pending': return styles.statusPending;
      default: return styles.statusPending;
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 20) return '#ef4444';
    if (score > 10) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Smart Tasks</h1>
          <p style={{ color: '#9ca3af', marginTop: '4px' }}>AI-powered task management and risk assessment</p>
        </div>
        <button 
          style={styles.addButton}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* AI Metrics */}
      <div style={styles.metricsGrid}>
        <div style={{...styles.metricCard, ...styles.metricCardBlue}}>
          <div style={styles.metricValue}>{aiInsights.totalTasks}</div>
          <div style={styles.metricLabel}>Total Tasks</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardGreen}}>
          <div style={styles.metricValue}>{aiInsights.completedTasks}</div>
          <div style={styles.metricLabel}>Completed</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardOrange}}>
          <div style={styles.metricValue}>{aiInsights.highRiskTasks}</div>
          <div style={styles.metricLabel}>High Risk</div>
        </div>
        <div style={{...styles.metricCard, ...styles.metricCardPurple}}>
          <div style={styles.metricValue}>{aiInsights.avgRiskScore}%</div>
          <div style={styles.metricLabel}>Avg Risk Score</div>
        </div>
      </div>

      {/* Tasks List */}
      <div style={styles.tasksGrid}>
        {tasks.map((task) => (
          <div 
            key={task.id} 
            style={styles.taskCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.taskHeader}>
              <div>
                <h3 style={styles.taskTitle}>{task.title}</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{...styles.priorityBadge, ...getPriorityStyle(task.priority)}}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span style={{...styles.statusBadge, ...getStatusStyle(task.status)}}>
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: getRiskColor(task.aiRiskScore), fontWeight: 'bold' }}>
                  {task.aiRiskScore}% Risk
                </div>
              </div>
            </div>
            
            <p style={styles.taskDescription}>{task.description}</p>
            
            <div style={styles.taskFooter}>
              <div style={styles.taskMeta}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} />
                  {task.assignee}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {task.dueDate}
                </div>
              </div>
            </div>

            {/* AI Risk Assessment */}
            <div style={styles.riskIndicator}>
              <TrendingUp size={16} color={getRiskColor(task.aiRiskScore)} />
              <span style={{...styles.riskScore, color: getRiskColor(task.aiRiskScore)}}>
                Risk Score: {task.aiRiskScore}%
              </span>
            </div>

            {/* AI Suggestions */}
            {task.aiSuggestions.length > 0 && (
              <div style={styles.aiSuggestions}>
                <div style={styles.suggestionsTitle}>
                  <Brain size={14} />
                  AI Suggestions
                </div>
                <div style={styles.suggestionsList}>
                  {task.aiSuggestions.map((suggestion, index) => (
                    <div key={index}>• {suggestion}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksComponent;