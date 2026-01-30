import React, { useState } from 'react';
import { User, Building, FileCheck, Bell, Shield, LogOut } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { StatusPill } from '../../components/ui/StatusPill';
export function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
  {
    id: 'profile',
    label: 'Profile'
  },
  {
    id: 'business',
    label: 'Business'
  },
  {
    id: 'kyc',
    label: 'KYC'
  },
  {
    id: 'notifications',
    label: 'Notifications'
  }];

  return (
    <SellerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="max-w-3xl">
          {activeTab === 'profile' &&
          <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <User className="h-10 w-10" />
                  </div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" defaultValue="John Doe" />
                  <Input label="Email" defaultValue="john@example.com" />
                  <Input
                  label="Phone"
                  defaultValue="+91 98765 43210"
                  disabled />

                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          }

          {activeTab === 'business' &&
          <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Business Name" defaultValue="John Doe Designs" />
                <Input label="GSTIN (Optional)" placeholder="22AAAAA0000A1Z5" />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <textarea
                  className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={3}
                  defaultValue="123 Creative Street, Indiranagar, Bangalore - 560038" />

                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          }

          {activeTab === 'kyc' &&
          <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-bold text-green-900">KYC Verified</p>
                      <p className="text-xs text-green-700">
                        Your account is fully verified.
                      </p>
                    </div>
                  </div>
                  <StatusPill status="success">Verified</StatusPill>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileCheck className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-medium">PAN Card</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileCheck className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-medium">Aadhaar Card</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          }

          {activeTab === 'notifications' &&
          <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">
                        WhatsApp Notifications
                      </p>
                      <p className="text-xs text-slate-500">
                        Receive updates on WhatsApp
                      </p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Email Alerts</p>
                      <p className="text-xs text-slate-500">
                        Invoices, payments, and summaries
                      </p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-medium text-slate-900 mb-4">
                    Reminder Schedule
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                    label="First Reminder"
                    defaultValue="3 days before due"
                    disabled />

                    <Input
                    label="Second Reminder"
                    defaultValue="On due date"
                    disabled />

                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Upgrade to Pro to customize reminder schedule.
                  </p>
                </div>
              </CardContent>
            </Card>
          }
        </div>
      </div>
    </SellerLayout>);

}