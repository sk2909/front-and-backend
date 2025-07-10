import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockExams, mockUsers } from '../utils/mockData';

const AdminDashboard = () => {
  const [stats] = useState({
    totalExams: mockExams.length,
    totalUsers: mockUsers.length,
    activeExams: mockExams.filter(exam => exam.status === 'active').length,
    totalQuestions: 45
  });
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  const recentExams = mockExams.slice(0, 3);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8090/api/admin/exams', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text || res.statusText); });
        }
        return res.json();
      })
      .then(data => {
        setExams(data);
        setFilteredExams(data);
      })
      .catch(err => {
        console.error('Fetch error:', err.message);
        // Optionally show an error message to the user
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your exam portal efficiently</p>
        </div>
        <Button onClick={() => navigate('/admin/exams')}>Create New Exam</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{stats.totalExams}</div>
          <div className="text-sm text-gray-600">Total Exams</div>
          <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">{stats.activeExams}</div>
          <div className="text-sm text-gray-600">Active Exams</div>
          <div className="w-full bg-green-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="w-full bg-purple-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </Card>
        
        <Card variant="floating" className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">{stats.totalQuestions}</div>
          <div className="text-sm text-gray-600">Questions</div>
          <div className="w-full bg-orange-100 rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </Card>
      </div>

      {/* Recent Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="floating">
          <h2 className="text-xl font-semibold mb-6 gradient-text">Recent Exams</h2>
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div>
                  <p className="font-medium text-gray-900">{exam.title}</p>
                  <p className="text-sm text-gray-600">{exam.category} • {exam.duration} min</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  exam.status === 'active' 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800'
                }`}>
                  {exam.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="floating">
          <h2 className="text-xl font-semibold mb-6 gradient-text">Quick Actions</h2>
          <div className="space-y-4">
            <Button className="w-full justify-start text-left" variant="outline">
              <span className="mr-3">📝</span>
              Create New Exam
            </Button>
            <Button className="w-full justify-start text-left" variant="outline">
              <span className="mr-3">❓</span>
              Add Questions
            </Button>
            <Button className="w-full justify-start text-left" variant="outline">
              <span className="mr-3">👥</span>
              Manage Users
            </Button>
            <Button className="w-full justify-start text-left" variant="outline">
              <span className="mr-3">📊</span>
              View Reports
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card variant="floating">
        <h2 className="text-xl font-semibold mb-6 gradient-text">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New user registered', user: 'John Doe', time: '2 minutes ago', icon: '👤', color: 'blue' },
            { action: 'Exam completed', user: 'Jane Smith', time: '1 hour ago', icon: '✅', color: 'green' },
            { action: 'New exam created', user: 'Admin', time: '3 hours ago', icon: '📝', color: 'purple' },
            { action: 'Question added', user: 'Admin', time: '5 hours ago', icon: '❓', color: 'orange' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${
                  activity.color === 'blue' ? 'from-blue-100 to-indigo-100' :
                  activity.color === 'green' ? 'from-green-100 to-emerald-100' :
                  activity.color === 'purple' ? 'from-purple-100 to-pink-100' :
                  'from-orange-100 to-red-100'
                }`}>
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;