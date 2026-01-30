import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Shield,
  Ban,
  Trash2,
  RefreshCw } from
'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
export function UserManagementPage() {
  const [actionUser, setActionUser] = useState<{
    id: string;
    action: 'block' | 'unblock' | 'delete';
  } | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [users, setUsers] = useState([
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'Seller',
    kyc: 'Verified',
    status: 'Active',
    joined: '15 Jan 2024'
  },
  {
    id: '2',
    name: 'Amit Patel',
    email: 'amit@example.com',
    role: 'Buyer',
    kyc: 'Pending',
    status: 'Active',
    joined: '20 Jan 2024'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'Seller',
    kyc: 'Rejected',
    status: 'Blocked',
    joined: '10 Dec 2023'
  },
  {
    id: '4',
    name: 'TechStart Inc',
    email: 'admin@techstart.io',
    role: 'Buyer',
    kyc: 'Verified',
    status: 'Active',
    joined: '05 Jan 2024'
  },
  {
    id: '5',
    name: 'Design Studio',
    email: 'hello@design.studio',
    role: 'Seller',
    kyc: 'Verified',
    status: 'Active',
    joined: '12 Jan 2024'
  },
  {
    id: '6',
    name: 'Global Services',
    email: 'info@global.com',
    role: 'Seller',
    kyc: 'Pending',
    status: 'Active',
    joined: '22 Jan 2024'
  },
  {
    id: '7',
    name: 'Alpha Wave',
    email: 'contact@alpha.com',
    role: 'Buyer',
    kyc: 'Verified',
    status: 'Active',
    joined: '18 Jan 2024'
  },
  {
    id: '8',
    name: 'Beta Corp',
    email: 'support@beta.com',
    role: 'Buyer',
    kyc: 'Verified',
    status: 'Blocked',
    joined: '15 Dec 2023'
  },
  {
    id: '9',
    name: 'Gamma Ltd',
    email: 'sales@gamma.com',
    role: 'Seller',
    kyc: 'Verified',
    status: 'Active',
    joined: '01 Jan 2024'
  },
  {
    id: '10',
    name: 'Delta Co',
    email: 'admin@delta.com',
    role: 'Buyer',
    kyc: 'Pending',
    status: 'Active',
    joined: '25 Jan 2024'
  }]
  );
  const handleAction = (action: 'block' | 'unblock' | 'delete', id: string) => {
    setActionUser({
      id,
      action
    });
  };
  const handleOtherAction = (action: string) => {
    setShowToast({
      message: `${action} successfully`,
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
  };
  const confirmAction = () => {
    if (actionUser) {
      if (actionUser.action === 'delete') {
        setUsers(users.filter((u) => u.id !== actionUser.id));
      } else {
        setUsers(
          users.map((u) => {
            if (u.id === actionUser.id) {
              return {
                ...u,
                status: actionUser.action === 'block' ? 'Blocked' : 'Active'
              };
            }
            return u;
          })
        );
      }
      const messages = {
        block: 'User blocked successfully',
        unblock: 'User unblocked successfully',
        delete: 'User deleted successfully'
      };
      setShowToast({
        message: messages[actionUser.action],
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
      setActionUser(null);
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        {showToast &&
        <div className="fixed top-4 right-4 z-50">
            <Toast
            type={showToast.type}
            message={showToast.message}
            onClose={() => setShowToast(null)} />

          </div>
        }

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md" />

            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">KYC Status</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Joined</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) =>
                <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      user.kyc === 'Verified' ?
                      'success' :
                      user.kyc === 'Pending' ?
                      'warning' :
                      'error'
                      }>

                        {user.kyc}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={user.status === 'Active' ? 'success' : 'error'}>

                        {user.status}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Profile',
                        icon: <User className="h-4 w-4" />,
                        onClick: () => {}
                      },
                      {
                        label: 'Reset Password',
                        icon: <RefreshCw className="h-4 w-4" />,
                        onClick: () =>
                        handleOtherAction('Password reset email sent')
                      },
                      user.status === 'Active' ?
                      {
                        label: 'Block User',
                        icon: <Ban className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('block', user.id)
                      } :
                      {
                        label: 'Unblock User',
                        icon: <Shield className="h-4 w-4" />,
                        onClick: () => handleAction('unblock', user.id)
                      },
                      {
                        label: 'Delete Account',
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('delete', user.id)
                      }]
                      } />

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={!!actionUser}
          onClose={() => setActionUser(null)}
          onConfirm={confirmAction}
          title={
          actionUser?.action === 'block' ?
          'Block User' :
          actionUser?.action === 'unblock' ?
          'Unblock User' :
          'Delete User'
          }
          message={
          actionUser?.action === 'block' ?
          'Are you sure you want to block this user? They will lose access immediately.' :
          actionUser?.action === 'unblock' ?
          'Are you sure you want to unblock this user? They will regain access.' :
          'Are you sure you want to permanently delete this user account? This action cannot be undone.'
          }
          confirmText={
          actionUser?.action === 'block' ?
          'Block' :
          actionUser?.action === 'unblock' ?
          'Unblock' :
          'Delete'
          }
          cancelText="Cancel"
          variant={actionUser?.action === 'unblock' ? 'primary' : 'danger'} />

      </div>
    </AdminLayout>);

}