import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function CollectionsPage() {
  return (
    <NBFCLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Collections</h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Invoice #</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Financed</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Repayment</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">INV-005</td>
                  <td className="px-6 py-4">Rajesh Kumar</td>
                  <td className="px-6 py-4">₹80,000</td>
                  <td className="px-6 py-4">15 Feb 2025</td>
                  <td className="px-6 py-4">₹82,000</td>
                  <td className="px-6 py-4">
                    <StatusPill status="warning">Pending</StatusPill>
                  </td>
                  <td className="px-6 py-4 text-right text-blue-600 cursor-pointer">
                    View
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </NBFCLayout>);

}