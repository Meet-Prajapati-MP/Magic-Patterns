import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Edit, Ban, Download, Share2, Zap } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { InvoicePreview } from '../../components/shared/InvoicePreview';
import { Timeline } from '../../components/shared/Timeline';
import { Modal } from '../../components/ui/Modal';
export function InvoiceDetailPage() {
  const { id } = useParams();
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  // Mock Data
  const invoiceData = {
    id: id || 'INV-001',
    date: '24 Jan 2025',
    dueDate: '31 Jan 2025',
    status: 'pending',
    seller: {
      name: 'Rajesh Kumar',
      address: '123 Freelance Hub, Bangalore',
      email: 'rajesh@example.com'
    },
    buyer: {
      name: 'Acme Corp',
      address: '456 Business Park, Mumbai',
      gstin: '27AAAAA0000A1Z5',
      email: 'billing@acme.com'
    },
    items: [
    {
      desc: 'Web Design Services',
      qty: 1,
      rate: 25000
    },
    {
      desc: 'Logo Design',
      qty: 1,
      rate: 15000
    }],

    subtotal: 40000,
    tax: 7200,
    total: 47200,
    paidAmount: 0,
    notes: 'Thank you for your business!'
  };
  const timelineItems = [
  {
    id: '1',
    type: 'created',
    title: 'Invoice Created',
    date: '24 Jan 2025',
    time: '10:00 AM'
  },
  {
    id: '2',
    type: 'sent',
    title: 'Sent to Client',
    description: 'Via Email to billing@acme.com',
    date: '24 Jan 2025',
    time: '10:05 AM'
  },
  {
    id: '3',
    type: 'viewed',
    title: 'Viewed by Client',
    date: '24 Jan 2025',
    time: '11:30 AM'
  }];

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/seller/invoices"
              className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                {invoiceData.id}
                <StatusPill status="warning">Pending</StatusPill>
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
              Edit
            </Button>
            <Button
              onClick={() => setIsReminderOpen(true)}
              leftIcon={<Send className="h-4 w-4" />}>

              Send Reminder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-sm text-slate-500">Payment Status</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{invoiceData.paidAmount.toLocaleString()}{' '}
                      <span className="text-sm text-slate-400 font-normal">
                        {' '}of ₹{invoiceData.total.toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-600">
                      Due in 7 days
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: '0%'
                    }}>
                  </div>
                </div>
              </CardContent>
            </Card>

            <InvoicePreview data={invoiceData} />
          </div>

          {/* Sidebar - Actions & Timeline */}
          <div className="space-y-6">
            {/* Get Paid Early CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Get Paid Early</h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Unlock up to 90% of this invoice value today.
                  </p>
                </div>
                <Zap className="h-6 w-6 text-yellow-300" />
              </div>
              <Link to={`/seller/financing/request?invoice=${invoiceData.id}`}>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none">
                  Check Eligibility
                </Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Download className="h-4 w-4" />}>

                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Share2 className="h-4 w-4" />}>

                  Share Link
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  leftIcon={<Ban className="h-4 w-4" />}>

                  Cancel Invoice
                </Button>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline items={timelineItems} />
              </CardContent>
            </Card>

            {/* Buyer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {invoiceData.buyer.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {invoiceData.buyer.email}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    Address
                  </p>
                  <p className="text-sm text-slate-600">
                    {invoiceData.buyer.address}
                  </p>
                </div>
                {invoiceData.buyer.gstin &&
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      GSTIN
                    </p>
                    <p className="text-sm text-slate-600">
                      {invoiceData.buyer.gstin}
                    </p>
                  </div>
                }
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reminder Modal */}
        <Modal
          isOpen={isReminderOpen}
          onClose={() => setIsReminderOpen(false)}
          title="Send Payment Reminder">

          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Send a friendly reminder to <strong>{invoiceData.buyer.name}</strong> about the pending
              payment of <strong>₹{invoiceData.total.toLocaleString()}</strong>.
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                defaultValue={`Hi ${invoiceData.buyer.name}, just a gentle reminder that invoice #${invoiceData.id} for ₹${invoiceData.total.toLocaleString()} is due on ${invoiceData.dueDate}. Please pay at your earliest convenience.`} />

            </div>
            <div className="flex space-x-3">
              <Button
                className="flex-1"
                onClick={() => setIsReminderOpen(false)}>

                Send via Email
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsReminderOpen(false)}>

                Send via WhatsApp
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </SellerLayout>);

}