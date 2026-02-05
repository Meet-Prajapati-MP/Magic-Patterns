import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  RefreshCw } from
'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { Timeline } from '../../components/shared/Timeline';
interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: string;
  to: string;
  method: string;
}

export function BuyerTransactionsPage() {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions] = useState([
  {
    id: 'TXN123456',
    date: '25 Jan 2025',
    type: 'Payment',
    amount: '₹29,550',
    status: 'success',
    to: 'Rajesh Design Studio',
    method: 'UPI'
  },
  {
    id: 'TXN123457',
    date: '20 Jan 2025',
    type: 'Payment',
    amount: '₹5,000',
    status: 'success',
    to: 'Design Studio',
    method: 'Card'
  },
  {
    id: 'TXN123458',
    date: '15 Jan 2025',
    type: 'Payment',
    amount: '₹45,000',
    status: 'success',
    to: 'TechStart',
    method: 'Net Banking'
  },
  {
    id: 'TXN123459',
    date: '10 Jan 2025',
    type: 'Refund',
    amount: '₹2,500',
    status: 'success',
    to: 'Trustpay',
    method: 'Wallet'
  },
  {
    id: 'TXN123460',
    date: '05 Jan 2025',
    type: 'Payment',
    amount: '₹12,000',
    status: 'failed',
    to: 'Acme Corp',
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
  const openDetail = (txn: Transaction) => {
    setSelectedTxn(txn);
    setIsDetailModalOpen(true);
  };
  const filteredTxns = transactions.filter(
    (txn) =>
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.to.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <BuyerLayout>
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
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md" />

            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => handleAction('exported')}>

              Export
            </Button>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Txn ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">To/From</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTxns.map((txn) =>
                <tr key={txn.id} className="hover:bg-slate-50">
                    <td
                    className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => openDetail(txn)}>

                      {txn.id}
                    </td>
                    <td className="px-6 py-4">{txn.date}</td>
                    <td className="px-6 py-4">{txn.type}</td>
                    <td className="px-6 py-4">{txn.to}</td>
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
                        label: 'Raise Dispute',
                        icon: <AlertTriangle className="h-4 w-4" />,
                        onClick: () => handleAction('dispute raised')
                      }]
                      } />

                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
                  <p className="text-sm text-slate-500">To/From</p>
                  <p className="font-medium">{selectedTxn.to}</p>
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
    </BuyerLayout>);

}