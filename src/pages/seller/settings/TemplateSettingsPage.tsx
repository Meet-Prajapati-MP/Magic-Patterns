import React, { useState } from 'react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
import { Tabs } from '../../../components/ui/Tabs';
export function TemplateSettingsPage() {
  const [activeTab, setActiveTab] = useState('reminder');
  const tabs = [
  {
    id: 'reminder',
    label: 'Payment Reminder'
  },
  {
    id: 'overdue',
    label: 'Overdue Notice'
  },
  {
    id: 'thankyou',
    label: 'Thank You Note'
  }];

  return (
    <SellerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Message Templates</h1>
        <p className="text-slate-600">
          Customize the messages sent to your clients.
        </p>

        <Card>
          <CardContent className="p-6">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
              className="mb-6" />


            {activeTab === 'reminder' &&
            <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Subject
                  </label>
                  <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                  defaultValue="Reminder: Invoice #{invoice_number} from {business_name}" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message Body
                  </label>
                  <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono"
                  rows={8}
                  defaultValue={`Hi {client_name},

This is a gentle reminder that invoice #{invoice_number} for {amount} is due on {due_date}.

You can view and pay the invoice here: {invoice_link}

If you have already paid, please ignore this message.

Thanks,
{business_name}`} />

                </div>
              </div>
            }

            {activeTab === 'overdue' &&
            <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Subject
                  </label>
                  <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                  defaultValue="OVERDUE: Invoice #{invoice_number} is past due" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message Body
                  </label>
                  <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono"
                  rows={8}
                  defaultValue={`Hi {client_name},

We noticed that payment for invoice #{invoice_number} ({amount}) was due on {due_date} and hasn't been received yet.

Please make the payment as soon as possible: {invoice_link}

Let us know if there are any issues.

Regards,
{business_name}`} />

                </div>
              </div>
            }

            {activeTab === 'thankyou' &&
            <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Subject
                  </label>
                  <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm"
                  defaultValue="Payment Received: Invoice #{invoice_number}" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message Body
                  </label>
                  <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono"
                  rows={8}
                  defaultValue={`Hi {client_name},

Thank you for your payment of {amount} for invoice #{invoice_number}. We have received it successfully.

You can download your receipt here: {receipt_link}

We appreciate your business!

Best,
{business_name}`} />

                </div>
              </div>
            }

            <div className="bg-slate-50 p-4 rounded-md mt-6 text-xs text-slate-500">
              <p className="font-bold mb-2">Available Variables:</p>
              <div className="flex flex-wrap gap-2">
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{client_name}`}</code>
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{invoice_number}`}</code>
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{amount}`}</code>
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{due_date}`}</code>
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{invoice_link}`}</code>
                <code className="bg-white px-1 py-0.5 rounded border border-slate-200">{`{business_name}`}</code>
              </div>
            </div>

            <div className="mt-6">
              <Button>Save Templates</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}