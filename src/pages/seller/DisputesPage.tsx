import React, { useState } from 'react';
import { MessageSquare, Plus, Paperclip, Send } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
export function DisputesPage() {
  const [isRaiseOpen, setIsRaiseOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<string | null>(null);
  const tickets = [
  {
    id: 'TKT-2025-001',
    subject: 'Payment failed for Invoice #INV-003',
    status: 'open',
    created: '2 hours ago',
    type: 'Payment Issue',
    messages: [
    {
      sender: 'user',
      text: 'Hi, my client tried to pay invoice INV-003 but got a failure message.',
      time: '10:30 AM'
    },
    {
      sender: 'support',
      text: 'Hello! I can help with that. Do you know which payment method they used?',
      time: '10:35 AM'
    }]

  }];

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Disputes & Support
          </h2>
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsRaiseOpen(true)}>

            Raise Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Ticket List */}
          <Card className="lg:col-span-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <Input placeholder="Search tickets..." className="bg-white" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {tickets.map((ticket) =>
              <div
                key={ticket.id}
                onClick={() => setActiveTicket(ticket.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${activeTicket === ticket.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>

                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-slate-500">
                      {ticket.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {ticket.created}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 line-clamp-1">
                    {ticket.subject}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {ticket.type}
                    </span>
                    <StatusPill
                    status={ticket.status === 'open' ? 'warning' : 'success'}>

                      {ticket.status.toUpperCase()}
                    </StatusPill>
                  </div>
                </div>
              )}
              {tickets.length === 0 &&
              <div className="p-8 text-center">
                  <p className="text-slate-500 text-sm">No tickets found.</p>
                </div>
              }
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {activeTicket ?
            <>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {tickets.find((t) => t.id === activeTicket)?.subject}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ticket {activeTicket}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Close Ticket
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {tickets.
                find((t) => t.id === activeTicket)?.
                messages.map((msg, i) =>
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                        <div
                    className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>

                          <p className="text-sm">{msg.text}</p>
                          <p
                      className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>

                            {msg.time}
                          </p>
                        </div>
                      </div>
                )}
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border-0 focus:ring-0 text-sm" />

                    <Button size="sm" rightIcon={<Send className="h-4 w-4" />}>
                      Send
                    </Button>
                  </div>
                </div>
              </> :

            <EmptyState
              icon={MessageSquare}
              title="Select a ticket"
              description="Choose a ticket from the list to view the conversation."
              className="h-full flex items-center justify-center" />

            }
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isRaiseOpen}
        onClose={() => setIsRaiseOpen(false)}
        title="Raise a Ticket">

        <div className="space-y-4">
          <Select
            label="Issue Type"
            options={[
            {
              value: 'payment',
              label: 'Payment Issue'
            },
            {
              value: 'invoice',
              label: 'Invoice Dispute'
            },
            {
              value: 'tech',
              label: 'Technical Issue'
            },
            {
              value: 'other',
              label: 'Other'
            }]
            } />

          <Input label="Subject" placeholder="Brief summary of the issue" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              placeholder="Please describe the issue in detail..." />

          </div>
          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => {
                setIsRaiseOpen(false);
                setActiveTicket('TKT-2025-001'); // Demo
              }}>

              Submit Ticket
            </Button>
          </div>
        </div>
      </Modal>
    </SellerLayout>);

}