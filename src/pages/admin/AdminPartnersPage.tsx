import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Plus } from 'lucide-react';
export function AdminPartnersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Partner Management
          </h1>
          <Button leftIcon={<Plus className="h-4 w-4" />}>Add Partner</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-lg">
                  ABC Finance Ltd
                </h3>
                <StatusPill status="success">Active</StatusPill>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <p>Contact: Vikram Singh</p>
                <p>
                  API Status: <span className="text-green-600 font-medium">Connected</span>
                </p>
                <p>Active Since: Jan 2024</p>
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>);

}