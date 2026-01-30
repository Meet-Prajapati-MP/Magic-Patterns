import React from 'react';
import { BuyerLayout } from '../../../components/layout/BuyerLayout';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
export function BuyerProfileSettingsPage() {
  return (
    <BuyerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">
                AB
              </div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="First Name" defaultValue="Amit" />
              <Input label="Last Name" defaultValue="Bhargav" />
            </div>

            <Input
              label="Email Address"
              type="email"
              defaultValue="amit@example.com"
              disabled />

            <Input label="Phone Number" defaultValue="+91 99887 76655" />

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Company Name (Optional)"
              defaultValue="Tech Solutions Ltd" />

            <Input label="GSTIN (Optional)" />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Address
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
                defaultValue="456 Innovation Park, Hyderabad, TS 500081" />

            </div>

            <Button variant="outline">Update Address</Button>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>);

}