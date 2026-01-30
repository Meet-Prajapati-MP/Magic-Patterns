import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Paperclip, Send } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Timeline } from '../../components/shared/Timeline';
export function DisputeDetailPage() {
  const { id } = useParams();
  const timelineItems = [
  {
    id: '1',
    type: 'created',
    title: 'Dispute Raised',
    date: '25 Jan 2025',
    time: '10:00 AM',
    description: 'Item not received as described'
  },
  {
    id: '2',
    type: 'viewed',
    title: 'Seller Responded',
    date: '25 Jan 2025',
    time: '2:30 PM',
    description: 'Provided shipping proof'
  },
  {
    id: '3',
    type: 'viewed',
    title: 'Under Review',
    date: '26 Jan 2025',
    time: '9:00 AM',
    description: 'Trustpay team is reviewing evidence'
  }];

  return (
    <BuyerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/buyer/disputes"
            className="p-2 hover:bg-slate-100 rounded-full">

            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dispute #{id || 'DSP-001'}
            </h1>
            <div className="flex items-center space-x-3 mt-1">
              <StatusPill status="warning">Under Review</StatusPill>
              <span className="text-sm text-slate-500">Invoice #INV-001</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                      You
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-700">
                      <p>
                        The deliverables were incomplete. Missing the mobile
                        responsive designs.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Yesterday, 10:00 AM
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 justify-end">
                    <div className="bg-slate-50 p-3 rounded-lg rounded-tr-none text-sm text-slate-700 text-right">
                      <p>
                        Hi, I've attached the mobile designs in the second zip
                        file. Please check.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Yesterday, 2:30 PM
                      </p>
                    </div>
                    <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                      S
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <textarea
                    className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
                    rows={3}
                    placeholder="Type your reply..." />

                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Paperclip className="h-4 w-4" />}>

                      Attach Evidence
                    </Button>
                    <Button size="sm" leftIcon={<Send className="h-4 w-4" />}>
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline items={timelineItems} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    Reason
                  </p>
                  <p className="text-sm text-slate-900">
                    Service not as described
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    Amount in Dispute
                  </p>
                  <p className="text-sm font-bold text-slate-900">₹15,000</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                    Seller
                  </p>
                  <p className="text-sm text-slate-900">Rajesh Design Studio</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BuyerLayout>);

}