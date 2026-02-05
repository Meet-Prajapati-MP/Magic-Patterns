import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Plus,
  FileText,
  Clock } from
'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function ClientDetailPage() {
  const { id } = useParams();
  // Mock Data
  const client = {
    id: id || '1',
    name: 'Acme Corp',
    email: 'billing@acme.com',
    phone: '+91 98765 43210',
    address: '123 Business Park, Tech City, Bangalore 560103',
    gstin: '29AAAAA0000A1Z5',
    stats: {
      totalInvoiced: '₹4,50,000',
      paid: '₹3,20,000',
      outstanding: '₹1,30,000'
    }
  };
  const invoices = [
  {
    id: 'INV-001',
    date: '24 Jan 2025',
    amount: '₹45,000',
    status: 'paid',
    due: '31 Jan 2025'
  },
  {
    id: 'INV-002',
    date: '15 Jan 2025',
    amount: '₹1,20,000',
    status: 'pending',
    due: '22 Jan 2025'
  },
  {
    id: 'INV-003',
    date: '01 Jan 2025',
    amount: '₹10,000',
    status: 'overdue',
    due: '08 Jan 2025'
  }];

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/seller/clients"
              className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {client.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                <span className="flex items-center">
                  <Mail className="h-3 w-3 mr-1" /> {client.email}
                </span>
                <span className="flex items-center">
                  <Phone className="h-3 w-3 mr-1" /> {client.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Edit Details</Button>
            <Link to="/seller/invoices/create">
              <Button variant="outline" className="bg-white text-blue-700 border-[#DBEAFE] hover:bg-[#F0F9FF]" leftIcon={<Plus className="h-4 w-4" />}>
                Create Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">
                Total Invoiced
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {client.stats.totalInvoiced}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {client.stats.paid}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500">Outstanding</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {client.stats.outstanding}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Invoice</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) =>
                    <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-blue-600">
                          <Link to={`/seller/invoices/${inv.id}`}>
                            {inv.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                        <td className="px-6 py-4 font-medium">{inv.amount}</td>
                        <td className="px-6 py-4">
                          <StatusPill
                          status={
                          inv.status === 'paid' ?
                          'success' :
                          inv.status === 'pending' ?
                          'warning' :
                          'error'
                          }>

                            {inv.status.charAt(0).toUpperCase() +
                          inv.status.slice(1)}
                          </StatusPill>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                          to={`/seller/invoices/${inv.id}`}
                          className="text-blue-600 hover:underline">

                            View
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Client Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    Address
                  </p>
                  <div className="flex items-start text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    {client.address}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    GSTIN
                  </p>
                  <p className="text-sm text-slate-600 font-mono">
                    {client.gstin}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Add private notes about this client..."
                  defaultValue="Prefer email communication. Usually pays within 7 days." />

                <Button size="sm" className="mt-2 w-full" variant="outline">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SellerLayout>);

}