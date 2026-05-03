import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  BookOpen, 
  Award, 
  Clock, 
  Edit2, 
  Camera,
  LogOut,
  Settings,
  GraduationCap,
  TrendingUp,
  Target,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    class: '10',
    school: 'Delhi Public School',
    phone: '+91 98765 43210',
    dateOfBirth: '2008-05-15',
    avatar: ''
  });

  const [editForm, setEditForm] = useState(profileData);

  const handleSaveProfile = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    onBack();
  };

  // Mock learning stats
  const stats = {
    totalCourses: 6,
    completedChapters: 45,
    studyHours: 127,
    achievements: 12
  };

  const recentActivity = [
    { id: 1, subject: 'Mathematics', chapter: 'Introduction to Trigonometry', date: '2 hours ago', completed: true },
    { id: 2, subject: 'Science', chapter: 'Chemical Reactions', date: '1 day ago', completed: true },
    { id: 3, subject: 'English', chapter: 'From the Diary of Anne Frank', date: '2 days ago', completed: false },
    { id: 4, subject: 'Social Science', chapter: 'Nationalism in India', date: '3 days ago', completed: true },
  ];

  const enrolledSubjects = [
    { name: 'Mathematics', progress: 75, chapters: 10, completed: 8 },
    { name: 'Science', progress: 60, chapters: 8, completed: 5 },
    { name: 'English', progress: 85, chapters: 6, completed: 5 },
    { name: 'Social Science', progress: 50, chapters: 5, completed: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 transition-colors text-sm font-medium"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and track your learning progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {profileData.name.charAt(0).toUpperCase() || 'S'}
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-600 transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Name & Class */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                  <p className="text-gray-600 mb-1">Class {profileData.class}</p>
                  <p className="text-sm text-gray-500 mb-4">{profileData.school}</p>

                  {/* Edit Profile Button */}
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-md border-0 bg-gradient-to-br from-blue-500 to-blue-600">
                <CardContent className="p-4 text-center text-white">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  <p className="text-xs text-blue-100">Courses</p>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0 bg-gradient-to-br from-green-500 to-green-600">
                <CardContent className="p-4 text-center text-white">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.completedChapters}</p>
                  <p className="text-xs text-green-100">Completed</p>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0 bg-gradient-to-br from-orange-500 to-orange-600">
                <CardContent className="p-4 text-center text-white">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.studyHours}</p>
                  <p className="text-xs text-orange-100">Study Hours</p>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0 bg-gradient-to-br from-purple-500 to-purple-600">
                <CardContent className="p-4 text-center text-white">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.achievements}</p>
                  <p className="text-xs text-purple-100">Achievements</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <Card className="shadow-md border-0">
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Subjects */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Enrolled Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {enrolledSubjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                        <span className="text-sm font-medium text-blue-600">{subject.progress}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        {subject.completed} of {subject.chapters} chapters completed
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Target className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{activity.chapter}</p>
                        <p className="text-xs text-gray-600">{activity.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {activity.completed && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Complete Mathematics Chapter 10</p>
                      <p className="text-sm text-gray-600">Due in 3 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">80%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Science Project Submission</p>
                      <p className="text-sm text-gray-600">Due in 5 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">45%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">English Essay Review</p>
                      <p className="text-sm text-gray-600">Due in 1 week</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">100%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Edit2 className="w-6 h-6" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="h-11"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-class">Class</Label>
                  <select
                    id="edit-class"
                    value={editForm.class}
                    onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                    className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
                      <option key={cls} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-school">School</Label>
                  <Input
                    id="edit-school"
                    value={editForm.school}
                    onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-dob">Date of Birth</Label>
                  <Input
                    id="edit-dob"
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setEditForm(profileData);
                    setIsEditing(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
