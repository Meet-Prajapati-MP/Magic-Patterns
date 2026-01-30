import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function TicketDetailPage() {
  const { id } = useParams();
  return (
    <BuyerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/buyer/tickets"
            className="p-2 hover:bg-slate-100 rounded-full">

            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Ticket #{id || 'TKT-123'}
            </h1>
            <div className="flex items-center space-x-3 mt-1">
              <StatusPill status="success">Open</StatusPill>
              <span className="text-sm text-slate-500">Payment Issue</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex space-x-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                  You
                </div>
                <div>
                  <div className="bg-slate-50 p-4 rounded-lg rounded-tl-none text-sm text-slate-700">
                    <p>
                      I tried to pay invoice #INV-005 using UPI but it failed
                      twice. The amount was deducted from my bank account.
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 ml-1">
                    Today, 10:30 AM
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  TP
                </div>
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg rounded-tl-none text-sm text-slate-700">
                    <p>
                      Hi there, sorry for the inconvenience. Can you please
                      share the transaction reference number (UTR) so we can
                      track this?
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 ml-1">
                    Today, 10:45 AM • Support Agent
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reply
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
                rows={4}
                placeholder="Type your message..." />

              <div className="flex justify-end">
                <Button leftIcon={<Send className="h-4 w-4" />}>
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>);

}