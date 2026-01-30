import React, { useState } from 'react';
import {
  Plus,
  Search,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock } from
'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { StatusPill } from '../../components/ui/StatusPill';
export function BuyerSupportPage() {
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [tickets, setTickets] = useState([
  {
    id: 'T-101',
    subject: 'Payment failed for INV-007',
    type: 'Payment Issue',
    status: 'open',
    date: 'Today',
    lastUpdate: '2h ago'
  },
  {
    id: 'T-102',
    subject: 'Incorrect invoice amount',
    type: 'Invoice Issue',
    status: 'in_progress',
    date: 'Yesterday',
    lastUpdate: '1d ago'
  },
  {
    id: 'T-103',
    subject: 'How to update profile?',
    type: 'General Query',
    status: 'closed',
    date: '20 Jan',
    lastUpdate: '5d ago'
  }]
  );
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewTicketModalOpen(false);
    setShowToast({
      message: 'Ticket created successfully',
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
    // Add new ticket to list (mock)
    setTickets([
    {
      id: `T-${100 + tickets.length + 1}`,
      subject: 'New Support Request',
      type: 'General Query',
      status: 'open',
      date: 'Just now',
      lastUpdate: 'Just now'
    },
    ...tickets]
    );
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
          <h1 className="text-2xl font-bold text-slate-900">Support & Help</h1>
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsNewTicketModalOpen(true)}>

            Raise New Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Open Tickets</p>
                <p className="text-2xl font-bold text-slate-900">1</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">In Progress</p>
                <p className="text-2xl font-bold text-slate-900">1</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Closed</p>
                <p className="text-2xl font-bold text-slate-900">1</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Recent Tickets</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {tickets.map((ticket) =>
            <div
              key={ticket.id}
              className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">

                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {ticket.subject}
                    </p>
                    <p className="text-xs text-slate-500">
                      {ticket.id} • {ticket.type} • Updated {ticket.lastUpdate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <StatusPill
                  status={
                  ticket.status === 'open' ?
                  'error' :
                  ticket.status === 'in_progress' ?
                  'warning' :
                  'success'
                  }>

                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </StatusPill>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* New Ticket Modal */}
        <Modal
          isOpen={isNewTicketModalOpen}
          onClose={() => setIsNewTicketModalOpen(false)}
          title="Raise Support Ticket">

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <Select
              label="Issue Type"
              options={[
              {
                value: 'invoice',
                label: 'Invoice Issue'
              },
              {
                value: 'payment',
                label: 'Payment Issue'
              },
              {
                value: 'account',
                label: 'Account Issue'
              },
              {
                value: 'general',
                label: 'General Query'
              }]
              } />

            <Input
              label="Subject"
              placeholder="Brief description of the issue"
              required />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                placeholder="Please provide details about your issue..."
                required />

            </div>
            <Button type="submit" className="w-full">
              Submit Ticket
            </Button>
          </form>
        </Modal>
      </div>
    </BuyerLayout>);

}