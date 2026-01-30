import React, { useState } from 'react';
import { Download, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { EmptyState } from '../../components/ui/EmptyState';
export function TransactionsPage() {
  const [transactions, setTransactions] = useState([
  {
    id: 'TXN-001',
    date: '24 Jan 2025',
    type: 'credit',
    desc: 'Payment from Acme Corp',
    amount: '₹45,000',
    status: 'success',
    method: 'UPI'
  },
  {
    id: 'TXN-002',
    date: '23 Jan 2025',
    type: 'debit',
    desc: 'Payout to Bank Account',
    amount: '₹40,000',
    status: 'success',
    method: 'IMPS'
  },
  {
    id: 'TXN-003',
    date: '22 Jan 2025',
    type: 'credit',
    desc: 'Payment from TechStart',
    amount: '₹15,000',
    status: 'failed',
    method: 'Card'
  }]
  );
  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4" />}>

              Export
            </Button>
          </div>
        </div>

        <Card>
          {transactions.length > 0 ?
          <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Date
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Description
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Method
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Amount
                    </th>
                    <th className="text-right py-3 px-6 text-xs font-medium text-slate-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((txn) =>
                <tr
                  key={txn.id}
                  className="hover:bg-slate-50 transition-colors">

                      <td className="py-4 px-6 text-sm text-slate-600">
                        {txn.date}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                        className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>

                            {txn.type === 'credit' ?
                        <ArrowDownLeft className="h-4 w-4" /> :

                        <ArrowUpRight className="h-4 w-4" />
                        }
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {txn.desc}
                            </p>
                            <p className="text-xs text-slate-500">{txn.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {txn.method}
                      </td>
                      <td
                    className={`py-4 px-6 text-right font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>

                        {txn.type === 'credit' ? '+' : '-'}
                        {txn.amount}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <StatusPill
                      status={
                      txn.status === 'success' ? 'success' : 'error'
                      }>

                          {txn.status.toUpperCase()}
                        </StatusPill>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div> :

          <EmptyState
            icon={ArrowUpRight}
            title="No transactions yet"
            description="Payments you receive will appear here." />

          }
        </Card>
      </div>
    </SellerLayout>);

}