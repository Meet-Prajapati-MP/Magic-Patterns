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
export function BusinessSettingsPage() {
  return (
    <SellerLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Business Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 border-dashed">
                Logo
              </div>
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
            </div>

            <Input label="Business Name" defaultValue="John Doe Designs" />
            <Input label="GSTIN (Optional)" placeholder="22AAAAA0000A1Z5" />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Business Address
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
                defaultValue="123 Creative Lane, Bangalore, KA 560001" />

            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Default Payment Terms (Days)"
              type="number"
              defaultValue="7" />


            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Default Notes / Terms
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                defaultValue="Thank you for your business. Please pay within the due date." />

            </div>

            <Button variant="outline">Save Defaults</Button>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}