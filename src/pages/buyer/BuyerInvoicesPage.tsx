import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CreditCard,
  AlertTriangle,
  XCircle,
  FileText } from
'lucide-react';
import { Link } from 'react-router-dom';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/StatusPill';
import { Card } from '../../components/ui/Card';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { getBuyerInvoices, formatAmount, formatDate } from '../../services/invoiceService';
import { supabaseClient } from '../../supabase-client';
export function BuyerInvoicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [discardId, setDiscardId] = useState<string | null>(null);
  const [disputeId, setDisputeId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const tabs = [
  {
    id: 'all',
    label: 'All Invoices'
  },
  {
    id: 'pending',
    label: 'Pending'
  },
  {
    id: 'paid',
    label: 'Paid'
  },
  {
    id: 'overdue',
    label: 'Overdue'
  },
  {
    id: 'disputed',
    label: 'Disputed'
  }];

  // Invoice data from Supabase
  const [invoices, setInvoices] = useState<Array<{
    id: string;
    seller: string;
    date: string;
    due: string;
    amount: string;
    status: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch invoices from Supabase
  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      
      // For buyer invoices, we need to get invoices where buyer_id matches
      // Since we're bypassing auth, we'll get all invoices for now
      // In production, this should filter by buyer_id
      const { data, error } = await getBuyerInvoices();
      
      if (error) {
        console.error('❌ Error fetching invoices:', error);
        setShowToast({
          message: `Failed to load invoices: ${error}`,
          type: 'error'
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ Fetched buyer invoices:', data?.length || 0, 'invoices');

      if (data && data.length > 0) {
        // Get seller names from profiles
        const sellerIds = [...new Set(data.map(inv => inv.seller_id))];
        const { data: profiles } = await supabaseClient
          .from('profiles')
          .select('id, name, business_name')
          .in('id', sellerIds);

        const sellerMap = new Map();
        profiles?.forEach(profile => {
          sellerMap.set(profile.id, profile.business_name || profile.name || 'Seller');
        });

        // Transform Supabase data to UI format
        const transformedInvoices = data.map(invoice => {
          const sellerName = sellerMap.get(invoice.seller_id) || 'Seller';
          const dueDate = invoice.due_date ? formatDate(invoice.due_date) : '-';
          
          return {
            id: invoice.invoice_number,
            seller: sellerName,
            date: formatDate(invoice.invoice_date),
            due: dueDate,
            amount: formatAmount(invoice.total_amount),
            status: invoice.status === 'pending' ? 'pending' : 
                   invoice.status === 'paid' ? 'paid' :
                   invoice.status === 'overdue' ? 'overdue' :
                   invoice.status === 'disputed' ? 'disputed' : 'pending'
          };
        });
        setInvoices(transformedInvoices);
      }
      
      setIsLoading(false);
    };

    fetchInvoices();
  }, []);
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      if (activeTab !== 'all' && invoice.status !== activeTab) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          invoice.seller.toLowerCase().includes(query) ||
          invoice.id.toLowerCase().includes(query));

      }
      return true;
    });
  }, [invoices, activeTab, searchQuery]);
  
  // Add loading state display in the component
  const handleDiscard = () => {
    if (discardId) {
      setInvoices(invoices.filter((inv) => inv.id !== discardId));
      setDiscardId(null);
      setShowToast({
        message: 'Invoice discarded successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const handleDispute = () => {
    if (disputeId) {
      setInvoices(
        invoices.map((inv) =>
        inv.id === disputeId ?
        {
          ...inv,
          status: 'disputed'
        } :
        inv
        )
      );
      setDisputeId(null);
      setShowToast({
        message: 'Dispute raised successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const handleExport = () => {
    setShowToast({
      message: 'Exporting invoices to CSV...',
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
  };
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
          <h2 className="text-2xl font-bold text-slate-900">My Invoices</h2>
          <Link to="/buyer/create-invoice">
            <Button variant="outline" className="bg-white text-blue-700 border-[#DBEAFE] hover:bg-[#F0F9FF]">Create Invoice</Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {tabs.map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>

                  {tab.label}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search seller or invoice #"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Filter className="h-4 w-4" />}
                onClick={() => setIsFilterModalOpen(true)}>

                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={handleExport}>

                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Invoice #
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Seller
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Due Date
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No invoices found matching your criteria.
                    </td>
                  </tr>
                ) : (
                filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors">

                    <td className="py-4 px-6 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      <Link to={`/buyer/invoice/${invoice.id}`}>
                        {invoice.id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-900 font-medium">
                      {invoice.seller}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500">
                      {invoice.date}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500">
                      {invoice.due}
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-slate-900">
                      {invoice.amount}
                    </td>
                    <td className="py-4 px-6">
                      <StatusPill
                      status={
                      invoice.status === 'paid' ?
                      'success' :
                      invoice.status === 'pending' ?
                      'warning' :
                      invoice.status === 'overdue' ?
                      'error' :
                      invoice.status === 'disputed' ?
                      'error' :
                      'neutral'
                      }>

                        {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                      </StatusPill>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Dropdown
                      items={[
                      {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => {}
                      },
                      {
                        label: 'Pay Now',
                        icon: <CreditCard className="h-4 w-4" />,
                        onClick: () => {}
                      },
                      {
                        label: 'Download PDF',
                        icon: <FileText className="h-4 w-4" />,
                        onClick: () =>
                        setShowToast({
                          message: 'Downloading PDF...',
                          type: 'success'
                        })
                      },
                      {
                        label: 'Raise Dispute',
                        icon: <AlertTriangle className="h-4 w-4" />,
                        onClick: () => setDisputeId(invoice.id)
                      },
                      {
                        label: 'Discard Invoice',
                        icon: <XCircle className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => setDiscardId(invoice.id)
                      }]
                      } />

                      </td>
                    </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Filter Modal */}
        <Modal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          title="Filter Invoices">

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm" />

                <input
                  type="date"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm" />

              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => setIsFilterModalOpen(false)}>

              Apply Filters
            </Button>
          </div>
        </Modal>

        {/* Discard Confirmation */}
        <ConfirmDialog
          isOpen={!!discardId}
          onClose={() => setDiscardId(null)}
          onConfirm={handleDiscard}
          title="Discard Invoice"
          message="Are you sure you want to discard this invoice? This action cannot be undone."
          confirmText="Discard"
          cancelText="Cancel"
          variant="danger" />


        {/* Dispute Confirmation */}
        <ConfirmDialog
          isOpen={!!disputeId}
          onClose={() => setDisputeId(null)}
          onConfirm={handleDispute}
          title="Raise Dispute"
          message="Are you sure you want to raise a dispute for this invoice? The seller will be notified."
          confirmText="Raise Dispute"
          cancelText="Cancel"
          variant="primary" />

      </div>
    </BuyerLayout>);

}