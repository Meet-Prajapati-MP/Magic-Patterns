import React, { useState } from 'react';
import { Eye, CheckCircle, AlertTriangle, XCircle, User } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { Timeline } from '../../components/shared/Timeline';

interface TimelineItem {
  id: string;
  type: string;
  title: string;
  date: string;
  time: string;
  description?: string;
}

interface Dispute {
  id: string;
  user: string;
  subject: string;
  status: string;
  priority: string;
  description: string;
  timeline: TimelineItem[];
}

export function AdminDisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [resolveId, setResolveId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [disputes, setDisputes] = useState([
  {
    id: 'D-001',
    user: 'Amit Patel',
    subject: 'Payment not received',
    status: 'open',
    priority: 'high',
    description:
    "I made a payment of ₹25,000 via UPI but the seller claims they haven't received it. Transaction ID: TXN123456.",
    timeline: [
    {
      id: '1',
      type: 'created',
      title: 'Dispute Created',
      date: '25 Jan 2024',
      time: '10:30 AM',
      description: 'User raised dispute for missing payment.'
    },
    {
      id: '2',
      type: 'viewed',
      title: 'Admin Viewed',
      date: '25 Jan 2024',
      time: '11:15 AM',
      description: 'Admin started reviewing the case.'
    }]

  },
  {
    id: 'D-002',
    user: 'TechStart Inc',
    subject: 'Invoice amount mismatch',
    status: 'in_progress',
    priority: 'medium',
    description:
    'The invoice amount is ₹1,20,000 but we agreed on ₹1,10,000. Please correct.',
    timeline: [
    {
      id: '1',
      type: 'created',
      title: 'Dispute Created',
      date: '24 Jan 2024',
      time: '02:00 PM'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Seller Contacted',
      date: '24 Jan 2024',
      time: '04:30 PM',
      description: 'Admin requested clarification from seller.'
    }]

  },
  {
    id: 'D-003',
    user: 'Design Studio',
    subject: 'Service not delivered',
    status: 'resolved',
    priority: 'low',
    description: 'Seller has not delivered the logo files as promised.',
    timeline: [
    {
      id: '1',
      type: 'created',
      title: 'Dispute Created',
      date: '20 Jan 2024',
      time: '09:00 AM'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Refund Processed',
      date: '22 Jan 2024',
      time: '11:00 AM',
      description: 'Full refund issued to buyer.'
    },
    {
      id: '3',
      type: 'created',
      title: 'Dispute Resolved',
      date: '22 Jan 2024',
      time: '11:05 AM'
    }]

  },
  {
    id: 'D-004',
    user: 'Global Services',
    subject: 'Duplicate payment',
    status: 'open',
    priority: 'high',
    description: 'Charged twice for the same invoice INV-009.',
    timeline: [
    {
      id: '1',
      type: 'created',
      title: 'Dispute Created',
      date: '26 Jan 2024',
      time: '08:45 AM'
    }]

  },
  {
    id: 'D-005',
    user: 'Alpha Wave',
    subject: 'Account access issue',
    status: 'closed',
    priority: 'medium',
    description: 'Cannot login to my account since yesterday.',
    timeline: [
    {
      id: '1',
      type: 'created',
      title: 'Dispute Created',
      date: '15 Jan 2024',
      time: '01:20 PM'
    },
    {
      id: '2',
      type: 'created',
      title: 'Dispute Closed',
      date: '16 Jan 2024',
      time: '10:00 AM',
      description: 'User resolved issue by password reset.'
    }]

  }]
  );
  const handleAction = (action: string, id: string) => {
    if (action === 'resolve') {
      setResolveId(id);
    } else {
      setShowToast({
        message: `Dispute ${action} successfully`,
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const confirmResolve = () => {
    if (resolveId) {
      setDisputes(
        disputes.map((d) =>
        d.id === resolveId ?
        {
          ...d,
          status: 'resolved'
        } :
        d
        )
      );
      setResolveId(null);
      setShowToast({
        message: 'Dispute resolved successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const openDetail = (dispute: Dispute) => {
    setSelectedDispute(dispute);
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
          Dispute Management
        </h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Ticket #</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {disputes.map((dispute) =>
                <tr key={dispute.id} className="hover:bg-slate-50">
                    <td
                    className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openDetail(dispute)}>

                      #{dispute.id}
                    </td>
                    <td className="px-6 py-4">{dispute.user}</td>
                    <td className="px-6 py-4">{dispute.subject}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      dispute.status === 'resolved' ?
                      'success' :
                      dispute.status === 'open' ?
                      'error' :
                      dispute.status === 'in_progress' ?
                      'warning' :
                      'neutral'
                      }>

                        {dispute.status.replace('_', ' ').toUpperCase()}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4">
                      <span
                      className={`font-medium ${dispute.priority === 'high' ? 'text-red-600' : dispute.priority === 'medium' ? 'text-amber-600' : 'text-green-600'}`}>

                        {dispute.priority.charAt(0).toUpperCase() +
                      dispute.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => openDetail(dispute)
                      },
                      {
                        label: 'Assign to Me',
                        icon: <User className="h-4 w-4" />,
                        onClick: () => handleAction('assigned', dispute.id)
                      },
                      {
                        label: 'Escalate',
                        icon: <AlertTriangle className="h-4 w-4" />,
                        onClick: () =>
                        handleAction('escalated', dispute.id)
                      },
                      {
                        label: 'Resolve',
                        icon: <CheckCircle className="h-4 w-4" />,
                        onClick: () => handleAction('resolve', dispute.id)
                      },
                      {
                        label: 'Close',
                        icon: <XCircle className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('closed', dispute.id)
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
          title={`Dispute Details #${selectedDispute?.id}`}
          size="lg">

          {selectedDispute &&
          <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">User</p>
                  <p className="font-medium">{selectedDispute.user}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Subject</p>
                  <p className="font-medium">{selectedDispute.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <StatusPill
                  status={
                  selectedDispute.status === 'resolved' ?
                  'success' :
                  selectedDispute.status === 'open' ?
                  'error' :
                  selectedDispute.status === 'in_progress' ?
                  'warning' :
                  'neutral'
                  }>

                    {selectedDispute.status.replace('_', ' ').toUpperCase()}
                  </StatusPill>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Priority</p>
                  <span
                  className={`font-medium ${selectedDispute.priority === 'high' ? 'text-red-600' : selectedDispute.priority === 'medium' ? 'text-amber-600' : 'text-green-600'}`}>

                    {selectedDispute.priority.charAt(0).toUpperCase() +
                  selectedDispute.priority.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-2">Description</p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
                  {selectedDispute.description}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-4">Timeline</p>
                <Timeline items={selectedDispute.timeline} />
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
                  handleAction('resolve', selectedDispute.id);
                }}>

                  Resolve Dispute
                </Button>
              </div>
            </div>
          }
        </Modal>

        {/* Resolve Confirmation */}
        <ConfirmDialog
          isOpen={!!resolveId}
          onClose={() => setResolveId(null)}
          onConfirm={confirmResolve}
          title="Resolve Dispute"
          message="Are you sure you want to mark this dispute as resolved? This will notify the user."
          confirmText="Resolve"
          cancelText="Cancel"
          variant="primary" />

      </div>
    </AdminLayout>);

}