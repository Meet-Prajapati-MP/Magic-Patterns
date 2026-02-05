import React, { useState } from 'react';
import { Eye, Download, Flag, RefreshCw } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';
import { Timeline } from '../../components/shared/Timeline';
interface AdminTransaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: string;
  payer: string;
  payee: string;
  method: string;
}

export function AdminTransactionsPage() {
  const [selectedTxn, setSelectedTxn] = useState<AdminTransaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [transactions] = useState([
  {
    id: 'TXN123456',
    date: '25 Jan 2025',
    type: 'Payment',
    amount: '₹29,550',
    status: 'success',
    payer: 'Acme Corp',
    payee: 'Rajesh Kumar',
    method: 'UPI'
  },
  {
    id: 'TXN123457',
    date: '25 Jan 2025',
    type: 'Payout',
    amount: '₹25,000',
    status: 'pending',
    payer: 'Trustpay',
    payee: 'Rajesh Kumar',
    method: 'IMPS'
  },
  {
    id: 'TXN123458',
    date: '24 Jan 2025',
    type: 'Payment',
    amount: '₹1,200',
    status: 'failed',
    payer: 'John Doe',
    payee: 'Priya Sharma',
    method: 'Card'
  },
  {
    id: 'TXN123459',
    date: '24 Jan 2025',
    type: 'Refund',
    amount: '₹5,000',
    status: 'success',
    payer: 'Trustpay',
    payee: 'TechStart Inc',
    method: 'Wallet'
  },
  {
    id: 'TXN123460',
    date: '23 Jan 2025',
    type: 'Payment',
    amount: '₹15,000',
    status: 'success',
    payer: 'Design Studio',
    payee: 'Global Services',
    method: 'Net Banking'
  },
  {
    id: 'TXN123461',
    date: '23 Jan 2025',
    type: 'Payment',
    amount: '₹499',
    status: 'success',
    payer: 'Rajesh Kumar',
    payee: 'Trustpay (Sub)',
    method: 'Card'
  },
  {
    id: 'TXN123462',
    date: '22 Jan 2025',
    type: 'Payout',
    amount: '₹12,000',
    status: 'success',
    payer: 'Trustpay',
    payee: 'Priya Sharma',
    method: 'IMPS'
  },
  {
    id: 'TXN123463',
    date: '22 Jan 2025',
    type: 'Payment',
    amount: '₹8,500',
    status: 'success',
    payer: 'Alpha Wave',
    payee: 'Beta Corp',
    method: 'UPI'
  },
  {
    id: 'TXN123464',
    date: '21 Jan 2025',
    type: 'Payment',
    amount: '₹45,000',
    status: 'flagged',
    payer: 'Unknown',
    payee: 'Rajesh Kumar',
    method: 'Card'
  },
  {
    id: 'TXN123465',
    date: '20 Jan 2025',
    type: 'Payment',
    amount: '₹2,500',
    status: 'success',
    payer: 'Client A',
    payee: 'Seller B',
    method: 'UPI'
  }]
  );
  const handleAction = (action: string) => {
    setShowToast({
      message: `Transaction ${action} successfully`,
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
  };
  const openDetail = (txn: AdminTransaction) => {
    setSelectedTxn(txn);
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
          Transaction Monitoring
        </h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Txn ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn) =>
                <tr key={txn.id} className="hover:bg-slate-50">
                    <td
                    className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openDetail(txn)}>

                      {txn.id}
                    </td>
                    <td className="px-6 py-4">{txn.date}</td>
                    <td className="px-6 py-4">{txn.type}</td>
                    <td className="px-6 py-4 font-medium">{txn.amount}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      txn.status === 'success' ?
                      'success' :
                      txn.status === 'pending' ?
                      'warning' :
                      txn.status === 'failed' ?
                      'error' :
                      'neutral'
                      }>

                        {txn.status.toUpperCase()}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => openDetail(txn)
                      },
                      {
                        label: 'Download Receipt',
                        icon: <Download className="h-4 w-4" />,
                        onClick: () => handleAction('receipt downloaded')
                      },
                      {
                        label: 'Refund',
                        icon: <RefreshCw className="h-4 w-4" />,
                        onClick: () => handleAction('refund initiated')
                      },
                      {
                        label: 'Flag Transaction',
                        icon: <Flag className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => handleAction('flagged')
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
          title={`Transaction Details #${selectedTxn?.id}`}
          size="lg">

          {selectedTxn &&
          <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium">{selectedTxn.date}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-medium text-lg">{selectedTxn.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Type</p>
                  <p className="font-medium">{selectedTxn.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <StatusPill
                  status={
                  selectedTxn.status === 'success' ?
                  'success' :
                  selectedTxn.status === 'pending' ?
                  'warning' :
                  selectedTxn.status === 'failed' ?
                  'error' :
                  'neutral'
                  }>

                    {selectedTxn.status.toUpperCase()}
                  </StatusPill>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payer</p>
                  <p className="font-medium">{selectedTxn.payer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payee</p>
                  <p className="font-medium">{selectedTxn.payee}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payment Method</p>
                  <p className="font-medium">{selectedTxn.method}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-4">
                  Transaction Timeline
                </p>
                <Timeline
                items={[
                {
                  id: '1',
                  type: 'created',
                  title: 'Transaction Initiated',
                  date: selectedTxn.date,
                  time: '10:00 AM'
                },
                {
                  id: '2',
                  type: 'payment',
                  title: 'Payment Processing',
                  date: selectedTxn.date,
                  time: '10:01 AM'
                },
                ...(selectedTxn.status === 'success' ?
                [
                {
                  id: '3',
                  type: 'payment',
                  title: 'Payment Successful',
                  date: selectedTxn.date,
                  time: '10:02 AM'
                }] :

                []),
                ...(selectedTxn.status === 'failed' ?
                [
                {
                  id: '3',
                  type: 'reminder',
                  title: 'Payment Failed',
                  date: selectedTxn.date,
                  time: '10:02 AM',
                  description: 'Insufficient funds'
                }] :

                [])]
                } />

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
                  handleAction('receipt downloaded');
                }}>

                  Download Receipt
                </Button>
              </div>
            </div>
          }
        </Modal>
      </div>
    </AdminLayout>);

}