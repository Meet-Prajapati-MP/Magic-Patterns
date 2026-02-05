import React, { useState } from 'react';
import { Eye, ArrowUpCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
interface Subscription {
  id: string;
  seller: string;
  plan: string;
  status: string;
  renewal: string;
  amount: string;
  billing: string;
}

export function AdminSubscriptionsPage() {
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [subscriptions, setSubscriptions] = useState([
  {
    id: 'SUB-001',
    seller: 'Rajesh Kumar',
    plan: 'Pro Plan',
    status: 'active',
    renewal: '15 Mar 2025',
    amount: '₹499',
    billing: 'Yearly'
  },
  {
    id: 'SUB-002',
    seller: 'Amit Patel',
    plan: 'Basic Plan',
    status: 'expired',
    renewal: '10 Jan 2024',
    amount: '₹0',
    billing: 'Free'
  },
  {
    id: 'SUB-003',
    seller: 'Priya Sharma',
    plan: 'Enterprise',
    status: 'active',
    renewal: '22 Feb 2025',
    amount: '₹2,999',
    billing: 'Monthly'
  },
  {
    id: 'SUB-004',
    seller: 'TechStart Inc',
    plan: 'Pro Plan',
    status: 'cancelled',
    renewal: '-',
    amount: '₹499',
    billing: 'Yearly'
  },
  {
    id: 'SUB-005',
    seller: 'Design Studio',
    plan: 'Pro Plan',
    status: 'active',
    renewal: '01 Apr 2025',
    amount: '₹499',
    billing: 'Yearly'
  },
  {
    id: 'SUB-006',
    seller: 'Global Services',
    plan: 'Enterprise',
    status: 'active',
    renewal: '12 May 2025',
    amount: '₹2,999',
    billing: 'Monthly'
  },
  {
    id: 'SUB-007',
    seller: 'Alpha Wave',
    plan: 'Basic Plan',
    status: 'active',
    renewal: '-',
    amount: '₹0',
    billing: 'Free'
  },
  {
    id: 'SUB-008',
    seller: 'Beta Corp',
    plan: 'Pro Plan',
    status: 'past_due',
    renewal: '20 Jan 2024',
    amount: '₹499',
    billing: 'Yearly'
  }]
  );
  const handleAction = (action: string, id: string) => {
    if (action === 'cancel') {
      setCancelId(id);
    } else {
      setShowToast({
        message: `Subscription ${action} successfully`,
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const confirmCancel = () => {
    if (cancelId) {
      setSubscriptions(
        subscriptions.map((s) =>
        s.id === cancelId ?
        {
          ...s,
          status: 'cancelled'
        } :
        s
        )
      );
      setCancelId(null);
      setShowToast({
        message: 'Subscription cancelled successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const openDetail = (sub: Subscription) => {
    setSelectedSub(sub);
    setIsDetailModalOpen(true);
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

        <h1 className="text-2xl font-bold text-slate-900">
          Subscription Management
        </h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Renewal Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((sub) =>
                <tr key={sub.id} className="hover:bg-slate-50">
                    <td
                    className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openDetail(sub)}>

                      {sub.seller}
                    </td>
                    <td className="px-6 py-4">{sub.plan}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      sub.status === 'active' ?
                      'success' :
                      sub.status === 'cancelled' ||
                      sub.status === 'expired' ?
                      'neutral' :
                      'error'
                      }>

                        {sub.status.replace('_', ' ').toUpperCase()}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4">{sub.renewal}</td>
                    <td className="px-6 py-4">{sub.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => openDetail(sub)
                      },
                      {
                        label: 'Extend Subscription',
                        icon: <Clock className="h-4 w-4" />,
                        onClick: () => handleAction('extended', sub.id)
                      },
                      {
                        label: 'Upgrade Plan',
                        icon: <ArrowUpCircle className="h-4 w-4" />,
                        onClick: () => handleAction('upgraded', sub.id)
                      },
                      {
                        label: 'Refund',
                        icon: <RefreshCw className="h-4 w-4" />,
                        onClick: () => handleAction('refunded', sub.id)
                      },
                      {
                        label: 'Cancel Subscription',
                        icon: <XCircle className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('cancel', sub.id)
                      }]
                      } />

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Subscription Details #${selectedSub?.id}`}>

          {selectedSub &&
          <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Seller</p>
                  <p className="font-medium">{selectedSub.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Plan</p>
                  <p className="font-medium">{selectedSub.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Billing Cycle</p>
                  <p className="font-medium">{selectedSub.billing}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-medium">{selectedSub.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <StatusPill
                  status={
                  selectedSub.status === 'active' ?
                  'success' :
                  selectedSub.status === 'cancelled' ||
                  selectedSub.status === 'expired' ?
                  'neutral' :
                  'error'
                  }>

                    {selectedSub.status.replace('_', ' ').toUpperCase()}
                  </StatusPill>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Next Renewal</p>
                  <p className="font-medium">{selectedSub.renewal}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Billing History
                </h4>
                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
                  <div className="flex justify-between mb-2">
                    <span>15 Mar 2024</span>
                    <span>Payment Received - {selectedSub.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15 Mar 2023</span>
                    <span>Payment Received - {selectedSub.amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <Button
                variant="outline"
                onClick={() => setIsDetailModalOpen(false)}>

                  Close
                </Button>
                <Button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  // Navigate to user details or edit
                }}>

                  Edit Subscription
                </Button>
              </div>
            </div>
          }
        </Modal>

        {/* Cancel Confirmation */}
        <ConfirmDialog
          isOpen={!!cancelId}
          onClose={() => setCancelId(null)}
          onConfirm={confirmCancel}
          title="Cancel Subscription"
          message="Are you sure you want to cancel this subscription? The user will lose access to premium features immediately."
          confirmText="Cancel Subscription"
          cancelText="Keep Active"
          variant="danger" />

      </div>
    </AdminLayout>);

}