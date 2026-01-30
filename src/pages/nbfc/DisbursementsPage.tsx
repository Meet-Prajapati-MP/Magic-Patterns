import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
export function DisbursementsPage() {
  const disbursements = [
  {
    id: 'DSB-001',
    seller: 'Rajesh Design',
    amount: '₹50,000',
    date: '15 Jan 2025',
    due: '15 Feb 2025',
    status: 'active'
  },
  {
    id: 'DSB-002',
    seller: 'TechStart Inc',
    amount: '₹1,20,000',
    date: '10 Jan 2025',
    due: '10 Feb 2025',
    status: 'active'
  },
  {
    id: 'DSB-003',
    seller: 'Alpha Wave',
    amount: '₹30,000',
    date: '01 Jan 2025',
    due: '01 Feb 2025',
    status: 'repaid'
  }];

  return (
    <NBFCLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Disbursements</h1>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Disbursed Date</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {disbursements.map((item) =>
                <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{item.id}</td>
                    <td className="px-6 py-4">{item.seller}</td>
                    <td className="px-6 py-4 font-medium">{item.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-slate-500">{item.due}</td>
                    <td className="px-6 py-4">
                      <StatusPill
                      status={
                      item.status === 'active' ? 'warning' : 'success'
                      }>

                        {item.status === 'active' ? 'Active' : 'Repaid'}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </NBFCLayout>);

}