import React from 'react';
import { PieChart, AlertCircle } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { EmptyState } from '../../components/ui/EmptyState';
export function EMIPlansPage() {
  const plans = [
  {
    id: 'EMI-001',
    invoice: 'INV-002',
    client: 'TechStart Inc',
    total: '₹1,20,000',
    plan: '3 Months',
    installment: '₹40,000',
    status: 'active',
    progress: 33
  }];

  return (
    <SellerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">EMI Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Active Plans</p>
              <h3 className="text-2xl font-bold text-slate-900">1</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Total EMI Value</p>
              <h3 className="text-2xl font-bold text-slate-900">₹1,20,000</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">Upcoming Collections</p>
              <h3 className="text-2xl font-bold text-slate-900">₹40,000</h3>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active EMI Plans</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {plans.length > 0 ?
            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Client
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Plan
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Progress
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Next Due
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {plans.map((plan) =>
                  <tr key={plan.id} className="hover:bg-slate-50">
                        <td className="py-4 px-6">
                          <p className="text-sm font-medium text-slate-900">
                            {plan.client}
                          </p>
                          <p className="text-xs text-slate-500">
                            {plan.invoice}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          {plan.plan} @ {plan.installment}/mo
                        </td>
                        <td className="py-4 px-6 w-48">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${plan.progress}%`
                          }}>
                        </div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            1 of 3 paid
                          </p>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-900">
                          22 Feb 2025
                        </td>
                        <td className="py-4 px-6 text-right">
                          <StatusPill status="success">Active</StatusPill>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div> :

            <EmptyState
              icon={PieChart}
              title="No active EMI plans"
              description="Offer EMI options on your invoices to see them here." />

            }
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}