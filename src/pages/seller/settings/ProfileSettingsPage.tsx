import React from 'react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
export function ProfileSettingsPage() {
  return (
    <SellerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                JD
              </div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="First Name" defaultValue="John" />
              <Input label="Last Name" defaultValue="Doe" />
            </div>

            <Input
              label="Email Address"
              type="email"
              defaultValue="john@example.com"
              disabled />

            <Input label="Phone Number" defaultValue="+91 98765 43210" />

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}