import React, { useState } from 'react';
import { Eye, Download, Flag, XCircle, Mail } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
export function AdminInvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [voidId, setVoidId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [invoices, setInvoices] = useState([
  {
    id: 'INV-007',
    seller: 'Rajesh Kumar',
    buyer: 'Amit Patel',
    amount: '₹29,500',
    status: 'paid',
    flagged: false,
    date: '25 Jan 2025'
  },
  {
    id: 'INV-008',
    seller: 'Priya Sharma',
    buyer: 'TechStart',
    amount: '₹1,20,000',
    status: 'pending',
    flagged: false,
    date: '24 Jan 2025'
  },
  {
    id: 'INV-009',
    seller: 'Global Services',
    buyer: 'Acme Corp',
    amount: '₹45,000',
    status: 'overdue',
    flagged: true,
    date: '10 Jan 2025'
  },
  {
    id: 'INV-010',
    seller: 'Design Studio',
    buyer: 'Client A',
    amount: '₹15,000',
    status: 'voided',
    flagged: false,
    date: '05 Jan 2025'
  },
  {
    id: 'INV-011',
    seller: 'Rajesh Kumar',
    buyer: 'Client B',
    amount: '₹5,000',
    status: 'paid',
    flagged: false,
    date: '23 Jan 2025'
  },
  {
    id: 'INV-012',
    seller: 'Alpha Wave',
    buyer: 'Beta Corp',
    amount: '₹8,500',
    status: 'pending',
    flagged: false,
    date: '22 Jan 2025'
  },
  {
    id: 'INV-013',
    seller: 'TechStart Inc',
    buyer: 'Gamma Ltd',
    amount: '₹2,50,000',
    status: 'paid',
    flagged: false,
    date: '21 Jan 2025'
  },
  {
    id: 'INV-014',
    seller: 'Priya Sharma',
    buyer: 'Delta Co',
    amount: '₹12,000',
    status: 'overdue',
    flagged: false,
    date: '15 Jan 2025'
  },
  {
    id: 'INV-015',
    seller: 'Rajesh Kumar',
    buyer: 'Epsilon',
    amount: '₹3,500',
    status: 'paid',
    flagged: false,
    date: '20 Jan 2025'
  },
  {
    id: 'INV-016',
    seller: 'Global Services',
    buyer: 'Zeta Inc',
    amount: '₹95,000',
    status: 'pending',
    flagged: true,
    date: '19 Jan 2025'
  }]
  );
  const handleAction = (action: string, id: string) => {
    if (action === 'void') {
      setVoidId(id);
    } else {
      setShowToast({
        message: `Invoice ${action} successfully`,
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const confirmVoid = () => {
    if (voidId) {
      setInvoices(
        invoices.map((inv) =>
        inv.id === voidId ?
        {
          ...inv,
          status: 'voided'
        } :
        inv
        )
      );
      setVoidId(null);
      setShowToast({
        message: 'Invoice voided successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const openDetail = (inv: any) => {
    setSelectedInvoice(inv);
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

        <h1 className="text-2xl font-bold text-slate-900">Invoice Oversight</h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Invoice #</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Buyer</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Flagged</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) =>
                <tr key={inv.id} className="hover:bg-slate-50">
                    <td
                    className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openDetail(inv)}>

                      {inv.id}
                    </td>
                    <td className="px-6 py-4">{inv.seller}</td>
                    <td className="px-6 py-4">{inv.buyer}</td>
                    <td className="px-6 py-4 font-medium">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      inv.status === 'paid' ?
                      'success' :
                      inv.status === 'pending' ?
                      'warning' :
                      inv.status === 'overdue' ?
                      'error' :
                      'neutral'
                      }>

                        {inv.status.toUpperCase()}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4">
                      {inv.flagged ?
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Flagged
                        </span> :

                    '-'
                    }
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => openDetail(inv)
                      },
                      {
                        label: 'Download PDF',
                        icon: <Download className="h-4 w-4" />,
                        onClick: () => handleAction('downloaded', inv.id)
                      },
                      {
                        label: 'Contact Seller',
                        icon: <Mail className="h-4 w-4" />,
                        onClick: () => handleAction('contacted', inv.id)
                      },
                      {
                        label: 'Flag Invoice',
                        icon: <Flag className="h-4 w-4" />,
                        onClick: () => handleAction('flagged', inv.id)
                      },
                      {
                        label: 'Void Invoice',
                        icon: <XCircle className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('void', inv.id)
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
          title={`Invoice Details #${selectedInvoice?.id}`}>

          {selectedInvoice &&
          <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Seller</p>
                  <p className="font-medium">{selectedInvoice.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Buyer</p>
                  <p className="font-medium">{selectedInvoice.buyer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-medium text-lg">
                    {selectedInvoice.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <StatusPill
                  status={
                  selectedInvoice.status === 'paid' ?
                  'success' :
                  selectedInvoice.status === 'pending' ?
                  'warning' :
                  selectedInvoice.status === 'overdue' ?
                  'error' :
                  'neutral'
                  }>

                    {selectedInvoice.status.toUpperCase()}
                  </StatusPill>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Invoice Items
                </h4>
                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Web Design Services</span>
                    <span>{selectedInvoice.amount}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span>{selectedInvoice.amount}</span>
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
                  handleAction('downloaded', selectedInvoice.id);
                }}>

                  Download PDF
                </Button>
              </div>
            </div>
          }
        </Modal>

        {/* Void Confirmation */}
        <ConfirmDialog
          isOpen={!!voidId}
          onClose={() => setVoidId(null)}
          onConfirm={confirmVoid}
          title="Void Invoice"
          message="Are you sure you want to void this invoice? This action cannot be undone."
          confirmText="Void Invoice"
          cancelText="Cancel"
          variant="danger" />

      </div>
    </AdminLayout>);

}