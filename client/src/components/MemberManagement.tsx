import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit, Trash2, Search, Filter, 
  UserPlus, Mail, Phone, Calendar, Award, 
  CheckCircle, XCircle, Eye, MoreHorizontal 
} from 'lucide-react';
import axios from 'axios';

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'member' | 'admin';
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  beltLevel?: string;
  totalClasses: number;
  attendanceRate: number;
  lastClass?: string;
}

interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  role: 'member' | 'admin';
  beltLevel: string;
  status: 'active' | 'inactive' | 'suspended';
}

type MemberManagementProps = {
  addMemberTrigger?: number;
};

const MemberManagement = ({ addMemberTrigger }: MemberManagementProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'member',
    beltLevel: 'White',
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Sample data for demonstration
  const sampleMembers: Member[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      role: 'member',
      joinDate: '2024-01-15',
      status: 'active',
      beltLevel: 'Blue',
      totalClasses: 45,
      attendanceRate: 85,
      lastClass: '2024-06-25'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      role: 'member',
      joinDate: '2024-02-20',
      status: 'active',
      beltLevel: 'Purple',
      totalClasses: 32,
      attendanceRate: 92,
      lastClass: '2024-06-26'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 345-6789',
      role: 'member',
      joinDate: '2024-03-10',
      status: 'inactive',
      beltLevel: 'White',
      totalClasses: 8,
      attendanceRate: 45,
      lastClass: '2024-05-15'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 (555) 456-7890',
      role: 'admin',
      joinDate: '2023-11-05',
      status: 'active',
      beltLevel: 'Black',
      totalClasses: 120,
      attendanceRate: 95,
      lastClass: '2024-06-27'
    }
  ];

  useEffect(() => {
    // Fetch real data from API
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/users');
      setMembers(response.data);
      setFilteredMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Fallback to sample data if API fails
      setMembers(sampleMembers);
      setFilteredMembers(sampleMembers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, statusFilter]);

  const filterMembers = () => {
    let filtered = members;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone?.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    setFilteredMembers(filtered);
  };

  const handleAddMember = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'member',
      beltLevel: 'White',
      status: 'active'
    });
    setFormErrors({});
    setApiError(null);
    setSuccessMessage(null);
    setShowAddModal(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      role: member.role,
      beltLevel: member.beltLevel || 'White',
      status: member.status
    });
    setShowEditModal(true);
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/admin/users/${memberId}`);
        setMembers(members.filter(member => member.id !== memberId));
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Failed to delete member. Please try again.');
      }
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.role) errors.role = 'Role is required';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    try {
      if (showAddModal) {
        // Add new member via API
        const response = await axios.post('/api/admin/users', formData);
        setMembers([...members, response.data]);
        setShowAddModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: 'member',
          beltLevel: 'White',
          status: 'active'
        });
        setSuccessMessage('Member added successfully!');
      } else if (showEditModal && selectedMember) {
        // Edit existing member via API
        const response = await axios.put(`/api/admin/users/${selectedMember.id}`, formData);
        const updatedMembers = members.map(member =>
          member.id === selectedMember.id ? response.data : member
        );
        setMembers(updatedMembers);
        setShowEditModal(false);
        setSelectedMember(null);
        setSuccessMessage('Member updated successfully!');
      }
    } catch (error: any) {
      console.error('Error saving member:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError('Failed to save member. Please try again.');
      }
    }
    setSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBeltColor = (beltLevel: string) => {
    switch (beltLevel) {
      case 'White': return 'bg-white border border-gray-300 text-gray-800';
      case 'Yellow': return 'bg-yellow-100 text-yellow-800';
      case 'Orange': return 'bg-orange-100 text-orange-800';
      case 'Green': return 'bg-green-100 text-green-800';
      case 'Blue': return 'bg-blue-100 text-blue-800';
      case 'Purple': return 'bg-indigo-100 text-indigo-800';
      case 'Brown': return 'bg-amber-100 text-amber-800';
      case 'Black': return 'bg-gray-900 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Open add modal when trigger changes
  useEffect(() => {
    if (addMemberTrigger !== undefined && addMemberTrigger > 0) {
      handleAddMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMemberTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-1">Manage your martial arts club members</p>
        </div>
        <button
          onClick={handleAddMember}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{members.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {members.filter(m => m.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Black Belts</p>
              <p className="text-2xl font-bold text-gray-900">
                {members.filter(m => m.beltLevel === 'Black').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {members.filter(m => {
                  const joinDate = new Date(m.joinDate);
                  const now = new Date();
                  return joinDate.getMonth() === now.getMonth() && 
                         joinDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Belt Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                        {member.phone && (
                          <div className="text-sm text-gray-500">{member.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getBeltColor(member.beltLevel || 'White')}`}>
                      {member.beltLevel || 'White'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>{member.totalClasses} classes</span>
                      <span className="text-gray-500">•</span>
                      <span className={member.attendanceRate >= 80 ? 'text-green-600' : member.attendanceRate >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                        {member.attendanceRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastClass ? new Date(member.lastClass).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewMember(member)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Edit Member"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Member Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {showAddModal ? 'Add New Member' : 'Edit Member'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setFormErrors({});
                    setApiError(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {apiError && (
                <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">
                  {apiError}
                </div>
              )}
              {successMessage && (
                <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                    aria-invalid={!!formErrors.name}
                  />
                  {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    aria-invalid={!!formErrors.email}
                  />
                  {formErrors.email && <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Belt Level
                    </label>
                    <select
                      value={formData.beltLevel}
                      onChange={(e) => setFormData({ ...formData, beltLevel: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Orange">Orange</option>
                      <option value="Green">Green</option>
                      <option value="Blue">Blue</option>
                      <option value="Purple">Purple</option>
                      <option value="Brown">Brown</option>
                      <option value="Black">Black</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormErrors({});
                      setApiError(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-60"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : showAddModal ? 'Add Member' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Member Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedMember.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedMember.name}</h4>
                    <p className="text-gray-600">{selectedMember.email}</p>
                    {selectedMember.phone && (
                      <p className="text-gray-600">{selectedMember.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Belt Level</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedMember.beltLevel}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Join Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(selectedMember.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Total Classes</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedMember.totalClasses}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Attendance Rate</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          selectedMember.attendanceRate >= 80 ? 'bg-green-500' : 
                          selectedMember.attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedMember.attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{selectedMember.attendanceRate}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditMember(selectedMember);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Edit Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement; 