import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('reminders');
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <Tabs
          tabs={[
          {
            id: 'reminders',
            label: 'Reminders'
          },
          {
            id: 'roles',
            label: 'Roles & Permissions'
          },
          {
            id: 'audit',
            label: 'Audit Logs'
          }]
          }
          activeTab={activeTab}
          onChange={setActiveTab} />


        {activeTab === 'reminders' &&
        <Card>
            <CardHeader>
              <CardTitle>Reminder Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  WhatsApp Template
                </label>
                <textarea
                className="w-full border border-slate-300 rounded-md p-3 h-32"
                defaultValue="Hi {client_name}, your invoice {invoice_number} for ₹{amount} is due on {due_date}. Pay now: {link}" />

              </div>
              <Button>Save Template</Button>
            </CardContent>
          </Card>
        }
      </div>
    </AdminLayout>);

}