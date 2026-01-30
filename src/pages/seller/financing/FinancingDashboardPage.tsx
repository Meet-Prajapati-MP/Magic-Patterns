import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Plus, AlertTriangle } from 'lucide-react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
import { StatusPill } from '../../../components/ui/StatusPill';
import { EmptyState } from '../../../components/ui/EmptyState';
export function FinancingDashboardPage() {
  const financedInvoices = [
  {
    id: 'FIN-001',
    invoice: 'INV-002',
    client: 'TechStart Inc',
    amount: '₹1,20,000',
    advanced: '₹1,08,000',
    status: 'active',
    dueDate: '22 Feb 2025'
  }];

  return (
    <SellerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Invoice Financing
            </h2>
            <p className="text-slate-500">
              Get paid early on your outstanding invoices.
            </p>
          </div>
          <Link to="/seller/financing/request">
            <Button leftIcon={<Plus className="h-4 w-4" />}>New Request</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-6">
              <p className="text-sm text-blue-600 font-medium">
                Total Advanced
              </p>
              <h3 className="text-3xl font-bold text-blue-900 mt-1">
                ₹1,08,000
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 font-medium">
                Available Limit
              </p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                ₹4,00,000
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500 font-medium">
                Upcoming Repayment
              </p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">
                ₹1,20,000
              </h3>
              <p className="text-xs text-slate-400 mt-1">Due 22 Feb</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Financing</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {financedInvoices.length > 0 ?
            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Invoice
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Client
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Advanced
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Repayment Due
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase py-3 px-6">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {financedInvoices.map((item) =>
                  <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-4 px-6 text-sm font-medium text-slate-900">
                          {item.invoice}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          {item.client}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-slate-900">
                          {item.advanced}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          {item.dueDate}
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
              icon={TrendingUp}
              title="No active financing"
              description="Apply for early payment on your invoices to improve cash flow."
              actionLabel="Check Eligibility"
              onAction={() => {}} />

            }
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}