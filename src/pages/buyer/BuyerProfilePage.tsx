import React, { useState } from 'react';
import { User, CreditCard, Bell, Shield, Plus, Trash2 } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
export function BuyerProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
  {
    id: 'profile',
    label: 'Profile'
  },
  {
    id: 'payment',
    label: 'Payment Methods'
  },
  {
    id: 'notifications',
    label: 'Notifications'
  },
  {
    id: 'security',
    label: 'Security'
  }];

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'profile' &&
        <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                  <User className="h-10 w-10" />
                </div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" defaultValue="Amit Patel" />
                <Input label="Email Address" defaultValue="amit@example.com" />
                <Input label="Phone Number" defaultValue="+91 98765 43210" />
                <Input
                label="Company Name (Optional)"
                defaultValue="Patel Enterprises" />

              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        }

        {activeTab === 'payment' &&
        <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Cards</CardTitle>
                <Button
                size="sm"
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}>

                  Add Card
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 bg-slate-100 rounded flex items-center justify-center">
                      <span className="font-bold text-xs text-slate-600">
                        VISA
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        Visa ending in 4242
                      </p>
                      <p className="text-xs text-slate-500">Expires 12/25</p>
                    </div>
                  </div>
                  <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50">

                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved UPI IDs</CardTitle>
                <Button
                size="sm"
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}>

                  Add UPI
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-xs text-slate-600">
                        UPI
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">amit@paytm</p>
                      <p className="text-xs text-green-600">Verified</p>
                    </div>
                  </div>
                  <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50">

                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        }

        {activeTab === 'notifications' &&
        <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive invoices and receipts via email
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    WhatsApp Notifications
                  </p>
                  <p className="text-sm text-slate-500">
                    Get payment reminders on WhatsApp
                  </p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        }

        {activeTab === 'security' &&
        <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-4">
                  Active Sessions
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          Chrome on Windows
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          Mumbai, India
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          Current Session
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <span className="text-green-600">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </BuyerLayout>);

}