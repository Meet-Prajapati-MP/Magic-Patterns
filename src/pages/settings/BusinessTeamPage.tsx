import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Mail,
  Phone,
  Shield,
  User,
  Trash2 } from
'lucide-react';
import { UnifiedLayout } from '../../components/layout/UnifiedLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { useProfile } from '../../components/context/ProfileContext';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { StatusPill } from '../../components/ui/StatusPill';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
export function BusinessTeamPage() {
  const navigate = useNavigate();
  const {
    currentProfile,
    isBusinessAdmin,
    teamMembers,
    inviteTeamMember,
    removeTeamMember
  } = useProfile();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  // Redirect if not business or not admin
  if (currentProfile.type !== 'business') {
    navigate('/dashboard');
    return null;
  }
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const role = formData.get('role') as 'admin' | 'member';
    inviteTeamMember(email, phone, role);
    setIsInviteModalOpen(false);
    setShowToast({
      message: 'Invitation sent successfully',
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
  };
  const handleRemove = () => {
    if (memberToRemove) {
      removeTeamMember(memberToRemove);
      setMemberToRemove(null);
      setShowToast({
        message: 'Team member removed',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  return (
    <UnifiedLayout>
      {showToast &&
      <div className="fixed top-4 right-4 z-50">
          <Toast
          type={showToast.type}
          message={showToast.message}
          onClose={() => setShowToast(null)} />

        </div>
      }

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Team Members
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage access for {currentProfile.businessName}
              </p>
            </div>
          </div>
          {isBusinessAdmin() &&
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsInviteModalOpen(true)}>

              Invite Member
            </Button>
          }
        </div>

        {/* Access Levels Info */}
        <Card>
          <CardHeader>
            <CardTitle>Access Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">
                    Admin (Owner)
                  </h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Can manage team members</li>
                  <li>• Can edit business settings</li>
                  <li>• Can manage bank details</li>
                </ul>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-slate-600" />
                  <h3 className="font-semibold text-slate-900">Member</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Can create and send invoices</li>
                  <li>• Can view all business invoices</li>
                  <li>• Can view payments</li>
                  <li>• Cannot edit business settings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({teamMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) =>
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">

                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {member.name}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-slate-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {member.email}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusPill
                    status={
                    member.status === 'active' ? 'success' : 'warning'
                    }>

                      {member.status === 'active' ? 'Active' : 'Pending'}
                    </StatusPill>
                    <div className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-sm font-medium">
                      {member.role === 'admin' ? 'Admin' : 'Member'}
                    </div>
                    {isBusinessAdmin() && member.role !== 'admin' &&
                  <button
                    onClick={() => setMemberToRemove(member.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors">

                        <Trash2 className="h-4 w-4" />
                      </button>
                  }
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Invite Modal */}
        <Modal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          title="Invite Team Member">

          <form onSubmit={handleInvite} className="space-y-4">
            <Input
              name="email"
              label="Email Address"
              type="email"
              placeholder="member@example.com"
              required />

            <Input
              name="phone"
              label="Phone Number"
              placeholder="+91 98765 43210"
              required />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Access Level
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="role"
                    value="member"
                    defaultChecked
                    className="h-4 w-4 text-blue-600" />

                  <div className="ml-3">
                    <span className="block font-medium text-slate-900">
                      Member
                    </span>
                    <span className="block text-xs text-slate-500">
                      Can create invoices and view payments
                    </span>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    className="h-4 w-4 text-blue-600" />

                  <div className="ml-3">
                    <span className="block font-medium text-slate-900">
                      Admin
                    </span>
                    <span className="block text-xs text-slate-500">
                      Full access including team and settings management
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1">

                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Send Invitation
              </Button>
            </div>
          </form>
        </Modal>

        {/* Remove Confirmation */}
        <ConfirmDialog
          isOpen={!!memberToRemove}
          onClose={() => setMemberToRemove(null)}
          onConfirm={handleRemove}
          title="Remove Team Member"
          message="Are you sure you want to remove this team member? They will lose access to all business invoices and data."
          confirmText="Remove"
          cancelText="Cancel"
          variant="danger" />

      </div>
    </UnifiedLayout>);

}