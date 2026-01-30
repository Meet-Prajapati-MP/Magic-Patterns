import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
export function ApplicationsPage() {
  return (
    <NBFCLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Applications Queue
        </h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">App #</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Invoice Amount</th>
                  <th className="px-6 py-3">Requested</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">FA-001</td>
                  <td className="px-6 py-4">Rajesh Kumar</td>
                  <td className="px-6 py-4">₹1,00,000</td>
                  <td className="px-6 py-4">₹80,000</td>
                  <td className="px-6 py-4">20 Jan 2025</td>
                  <td className="px-6 py-4">
                    <StatusPill status="warning">Pending</StatusPill>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm">Review</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </NBFCLayout>);

}