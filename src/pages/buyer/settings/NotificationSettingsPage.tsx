import React from 'react';
import { BuyerLayout } from '../../../components/layout/BuyerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
export function BuyerNotificationSettingsPage() {
  const NotificationRow = ({
    title,
    desc



  }: {title: string;desc: string;}) =>
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div>
        <h4 className="text-sm font-medium text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
          type="checkbox"
          defaultChecked
          className="rounded text-blue-600 focus:ring-blue-500" />

          <span className="text-xs text-slate-600">Email</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
          type="checkbox"
          defaultChecked
          className="rounded text-blue-600 focus:ring-blue-500" />

          <span className="text-xs text-slate-600">SMS</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
          type="checkbox"
          className="rounded text-blue-600 focus:ring-blue-500" />

          <span className="text-xs text-slate-600">WhatsApp</span>
        </label>
      </div>
    </div>;

  return (
    <BuyerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Notification Settings
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationRow
              title="New Invoice Received"
              desc="Get notified when a seller sends you an invoice" />

            <NotificationRow
              title="Payment Successful"
              desc="Confirmation when your payment is processed" />

            <NotificationRow
              title="Payment Due Reminder"
              desc="Alerts before an invoice or EMI is due" />

            <NotificationRow
              title="Dispute Updates"
              desc="Notifications about your active disputes" />


            <div className="pt-6 mt-2">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>);

}