import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, FileText, Download } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { Input } from '../../components/ui/Input';
interface KYCApplication {
  id: string;
  name: string;
  role: string;
  business: string;
  submitted: string;
  status: string;
  docs: number;
}

export function KYCReviewPage() {
  const [selectedApp, setSelectedApp] = useState<KYCApplication | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [actionType, setActionType] = useState<
    'approve' | 'reject' | 'request_info' | null>(
    null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [applications, setApplications] = useState([
  {
    id: 'KYC-001',
    name: 'Priya Sharma',
    role: 'Seller',
    business: 'Design Studio',
    submitted: '2h ago',
    status: 'pending',
    docs: 4
  },
  {
    id: 'KYC-002',
    name: 'Amit Patel',
    role: 'Buyer',
    business: 'TechStart Inc',
    submitted: '5h ago',
    status: 'pending',
    docs: 3
  },
  {
    id: 'KYC-003',
    name: 'Rahul Singh',
    role: 'Seller',
    business: 'Singh Traders',
    submitted: '1d ago',
    status: 'pending',
    docs: 5
  },
  {
    id: 'KYC-004',
    name: 'Sneha Gupta',
    role: 'Seller',
    business: 'Creative Works',
    submitted: '2d ago',
    status: 'pending',
    docs: 4
  }]
  );
  const openReview = (app: KYCApplication) => {
    setSelectedApp(app);
    setIsReviewModalOpen(true);
  };
  const handleAction = (type: 'approve' | 'reject' | 'request_info') => {
    setActionType(type);
  };
  const confirmAction = () => {
    if (selectedApp && actionType) {
      setApplications(applications.filter((app) => app.id !== selectedApp.id));
      setIsReviewModalOpen(false);
      setActionType(null);
      const messages = {
        approve: 'KYC Approved successfully',
        reject: 'KYC Rejected successfully',
        request_info: 'Information requested successfully'
      };
      setShowToast({
        message: messages[actionType],
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
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

        <h1 className="text-2xl font-bold text-slate-900">KYC Review Queue</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) =>
          <Card key={app.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{app.name}</h3>
                    <p className="text-sm text-slate-500">
                      {app.role} • Submitted {app.submitted}
                    </p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                    Pending
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Documents</span>
                    <span className="font-medium">{app.docs} Uploaded</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Business</span>
                    <span className="font-medium">{app.business}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => openReview(app)}>
                  Review Application
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {applications.length === 0 &&
        <div className="text-center py-12">
            <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">
              All caught up!
            </h3>
            <p className="text-slate-500">
              No pending KYC applications to review.
            </p>
          </div>
        }

        {/* Review Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title={`Review KYC Application - ${selectedApp?.name}`}
          size="lg">

          {selectedApp &&
          <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">
                  Applicant Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Name:</span> {selectedApp.name}
                  </div>
                  <div>
                    <span className="text-blue-700">Role:</span> {selectedApp.role}
                  </div>
                  <div>
                    <span className="text-blue-700">Business:</span> {selectedApp.business}
                  </div>
                  <div>
                    <span className="text-blue-700">Email:</span> user@example.com
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">Documents</h4>
                <div className="space-y-2">
                  {[
                'PAN Card',
                'Aadhaar Card',
                'Business Registration',
                'Bank Statement'].
                map((doc, i) =>
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">

                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-slate-400 mr-3" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Download className="h-3 w-3" />}>

                        View
                      </Button>
                    </div>
                )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900">
                  Verification Checklist
                </h4>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm">
                    Identity documents match applicant details
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm">
                    Business registration is valid
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm">Bank account details verified</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                leftIcon={<CheckCircle className="h-4 w-4" />}
                onClick={() => handleAction('approve')}>

                  Approve
                </Button>
                <Button
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                leftIcon={<FileText className="h-4 w-4" />}
                onClick={() => handleAction('request_info')}>

                  Request Info
                </Button>
                <Button
                className="flex-1"
                variant="danger"
                leftIcon={<XCircle className="h-4 w-4" />}
                onClick={() => handleAction('reject')}>

                  Reject
                </Button>
              </div>
            </div>
          }
        </Modal>

        {/* Action Confirmation */}
        <ConfirmDialog
          isOpen={!!actionType}
          onClose={() => setActionType(null)}
          onConfirm={confirmAction}
          title={
          actionType === 'approve' ?
          'Approve KYC' :
          actionType === 'reject' ?
          'Reject KYC' :
          'Request Information'
          }
          message={
          actionType === 'approve' ?
          'Are you sure you want to approve this application? The user will get full access.' :
          actionType === 'reject' ?
          'Are you sure you want to reject this application? The user will be notified.' :
          'Request additional information from the user?'
          }
          confirmText="Confirm"
          cancelText="Cancel"
          variant={actionType === 'reject' ? 'danger' : 'primary'} />

      </div>
    </AdminLayout>);

}