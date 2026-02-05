import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText } from
'lucide-react';
import { Link } from 'react-router-dom';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import { StatusPill } from '../../components/ui/StatusPill';
import { Card } from '../../components/ui/Card';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
import { getSellerInvoices, formatAmount, formatDate } from '../../services/invoiceService';
export function InvoiceListPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
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
    id: 'draft',
    label: 'Draft'
  },
  {
    id: 'sent',
    label: 'Sent'
  },
  {
    id: 'paid',
    label: 'Paid'
  },
  {
    id: 'overdue',
    label: 'Overdue'
  }];

  // Invoice data from Supabase
  const [invoices, setInvoices] = useState<Array<{
    id: string;
    client: string;
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
      console.log('📋 Fetching invoices...');
      
      const { data, error } = await getSellerInvoices();
      
      if (error) {
        console.error('❌ Error fetching invoices:', error);
        setShowToast({
          message: `Failed to load invoices: ${error}`,
          type: 'error'
        });
        setIsLoading(false);
        return;
      }

      console.log('✅ Fetched invoices:', data?.length || 0, 'invoices');
      console.log('Invoice data:', data);
      
      if (data && data.length > 0) {
        // Transform Supabase data to UI format
        const transformedInvoices = data.map(invoice => ({
          id: invoice.invoice_number,
          client: invoice.client_name,
          date: formatDate(invoice.invoice_date),
          due: invoice.due_date ? formatDate(invoice.due_date) : '-',
          amount: formatAmount(invoice.total_amount),
          status: invoice.status
        }));
        setInvoices(transformedInvoices);
        console.log('✅ Transformed invoices:', transformedInvoices.length, 'invoices');
      } else {
        console.log('ℹ️ No invoices found. This is normal if you haven\'t created any invoices yet.');
        setInvoices([]);
        // Don't show error toast for empty data - it's normal
      }
      
      setIsLoading(false);
    };

    fetchInvoices();
  }, []);
  // Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      // Tab Filter
      if (
      activeTab !== 'all' &&
      activeTab !== 'sent' &&
      invoice.status !== activeTab)
      {
        if (activeTab === 'sent' && invoice.status !== 'pending') return true; // 'sent' usually maps to pending in this context or we need a sent status
        if (activeTab === 'sent' && invoice.status === 'pending') return false; // keep pending for sent
        return false;
      }
      if (activeTab === 'sent' && invoice.status !== 'pending') return false;
      // Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          invoice.client.toLowerCase().includes(query) ||
          invoice.id.toLowerCase().includes(query));

      }
      return true;
    });
  }, [invoices, activeTab, searchQuery]);
  const handleDelete = () => {
    if (deleteId) {
      setInvoices(invoices.filter((inv) => inv.id !== deleteId));
      setDeleteId(null);
      setShowToast({
        message: 'Invoice deleted successfully',
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
    <SellerLayout>
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
          <h2 className="text-2xl font-bold text-slate-900">Invoices</h2>
          <Link to="/seller/invoices/create">
            <Button variant="outline" className="text-blue-700 border-[#DBEAFE] bg-white hover:bg-[#F0F9FF] transition-colors duration-200" leftIcon={<Plus className="h-4 w-4" />}>
              Create Invoice
            </Button>
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
                  placeholder="Search client or invoice #"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

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
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Invoice #
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Client
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Due Date
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) =>
                <tr
                  key={invoice.id}
                  className="hover:bg-slate-50 transition-colors">

                      <td className="py-4 px-6 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                        <Link to={`/seller/invoices/${invoice.id}`}>
                          {invoice.id}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-900 font-medium">
                        {invoice.client}
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
                        onClick: () => {} // Navigate to details
                      },
                      {
                        label: 'Edit Invoice',
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => {} // Navigate to edit
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
                        label: 'Delete',
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => setDeleteId(invoice.id)
                      }]
                      } />

                      </td>
                    </tr>
                ) :

                <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No invoices found matching your criteria.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {filteredInvoices.length} results
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Amount Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm" />

                <input
                  type="number"
                  placeholder="Max"
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

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          title="Delete Invoice"
          message="Are you sure you want to delete this invoice? This action cannot be undone."
          confirmText="Delete Invoice"
          cancelText="Cancel"
          variant="danger" />

      </div>
    </SellerLayout>);

}