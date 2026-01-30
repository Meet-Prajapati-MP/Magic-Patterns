import React, { useMemo, useState } from 'react';
import {
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  FileText,
  Upload } from
'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { Dropdown } from '../../components/ui/Dropdown';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Toast } from '../../components/ui/Toast';
export function ClientsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [clients, setClients] = useState([
  {
    id: 1,
    name: 'Acme Corp',
    email: 'billing@acme.com',
    phone: '+91 98765 43210',
    invoiced: '₹4,50,000',
    collected: '₹3,20,000',
    overdue: '₹0'
  },
  {
    id: 2,
    name: 'TechStart Inc',
    email: 'finance@techstart.io',
    phone: '+91 98765 43211',
    invoiced: '₹1,20,000',
    collected: '₹0',
    overdue: '₹1,20,000'
  }]
  );
  const filteredClients = useMemo(() => {
    if (!searchQuery) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.phone.includes(query)
    );
  }, [clients, searchQuery]);
  const handleDelete = () => {
    if (deleteId) {
      setClients(clients.filter((c) => c.id !== deleteId));
      setDeleteId(null);
      setShowToast({
        message: 'Client deleted successfully',
        type: 'success'
      });
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  const handleImport = () => {
    setIsImportModalOpen(false);
    setShowToast({
      message: 'Contacts imported successfully',
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
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsImportModalOpen(true)}>

              Import Contacts
            </Button>
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setIsAddModalOpen(true)}>

              Add Client
            </Button>
          </div>
        </div>

        <Card>
          <div className="p-4 border-b border-slate-200 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            </div>
          </div>

          {filteredClients.length > 0 ?
          <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Name
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Contact
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Total Invoiced
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Collected
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Overdue
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClients.map((client) =>
                <tr
                  key={client.id}
                  className="hover:bg-slate-50 transition-colors">

                      <td className="py-4 px-6">
                        <p className="font-medium text-slate-900">
                          {client.name}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {client.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {client.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-slate-900">
                        {client.invoiced}
                      </td>
                      <td className="py-4 px-6 text-right text-green-600 font-medium">
                        {client.collected}
                      </td>
                      <td className="py-4 px-6 text-right text-red-600 font-medium">
                        {client.overdue}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Dropdown
                      items={[
                      {
                        label: 'View Invoices',
                        icon: <FileText className="h-4 w-4" />,
                        onClick: () => {}
                      },
                      {
                        label: 'Edit Client',
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => setIsAddModalOpen(true) // Mock edit
                      },
                      {
                        label: 'Delete',
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: 'danger',
                        onClick: () => setDeleteId(client.id)
                      }]
                      } />

                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div> :

          <EmptyState
            icon={Plus}
            title="No clients found"
            description={
            searchQuery ?
            'Try adjusting your search terms.' :
            'Add your first client to start sending invoices.'
            }
            actionLabel="Add Client"
            onAction={() => setIsAddModalOpen(true)} />

          }
        </Card>

        {/* Add/Edit Client Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Client">

          <div className="space-y-4">
            <Input label="Client / Company Name" placeholder="e.g. Acme Corp" />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="billing@acme.com" />

              <Input label="Phone" placeholder="+91" />
            </div>
            <Input label="GSTIN (Optional)" placeholder="22AAAAA0000A1Z5" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Address
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-2 text-sm"
                rows={3} />

            </div>
            <Button
              className="w-full"
              onClick={() => {
                setIsAddModalOpen(false);
                setShowToast({
                  message: 'Client saved successfully',
                  type: 'success'
                });
                setTimeout(() => setShowToast(null), 3000);
              }}>

              Save Client
            </Button>
          </div>
        </Modal>

        {/* Import Modal */}
        <Modal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          title="Import Contacts">

          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-900">
                Click to upload CSV
              </p>
              <p className="text-xs text-slate-500 mt-1">
                or drag and drop file here
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-4">
                Supported formats: .csv, .xls, .xlsx
              </p>
              <Button className="w-full" onClick={handleImport}>
                Import Contacts
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          title="Delete Client"
          message="Are you sure you want to delete this client? All associated invoices will remain but client details will be removed."
          confirmText="Delete Client"
          cancelText="Cancel"
          variant="danger" />

      </div>
    </SellerLayout>);

}