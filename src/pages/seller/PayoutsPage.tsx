import React, { useState } from 'react';
import { Wallet, Plus, Building2, ArrowUpRight, History } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
export function PayoutsPage() {
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const payouts = [
  {
    id: 'PO-001',
    date: '22 Jan 2025',
    amount: '₹45,000',
    bank: 'HDFC Bank **** 1234',
    status: 'success',
    ref: 'UTR123456789'
  },
  {
    id: 'PO-002',
    date: '15 Jan 2025',
    amount: '₹12,500',
    bank: 'HDFC Bank **** 1234',
    status: 'success',
    ref: 'UTR987654321'
  }];

  return (
    <SellerLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Payouts & Settlement
          </h2>
          <Button variant="outline" leftIcon={<History className="h-4 w-4" />}>
            Download Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet Balance */}
          <Card className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 font-medium mb-1">
                    Available Balance
                  </p>
                  <h3 className="text-4xl font-bold mb-4">₹45,000.00</h3>
                  <div className="flex items-center space-x-4 text-sm text-blue-100">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" /> Pending Settlement:
                      ₹12,000
                    </span>
                    <span>•</span>
                    <span>Next Payout: Mon, 29 Jan</span>
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-blue-100">
                  Payouts are processed automatically every Monday.
                </p>
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-50 border-none"
                  size="sm">

                  Request Instant Payout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bank Accounts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Linked Accounts</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddBankOpen(true)}>

                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center border border-blue-100">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        HDFC Bank
                      </p>
                      <p className="text-xs text-slate-500">
                        **** 1234 • Primary
                      </p>
                    </div>
                  </div>
                  <StatusPill status="success">Verified</StatusPill>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {payouts.length > 0 ?
            <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                        Date
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                        Amount
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                        Bank Account
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                        Reference
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payouts.map((payout) =>
                  <tr key={payout.id} className="hover:bg-slate-50">
                        <td className="py-4 px-6 text-sm text-slate-900">
                          {payout.date}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-slate-900">
                          {payout.amount}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">
                          {payout.bank}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-500 font-mono">
                          {payout.ref}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <StatusPill status={payout.status as any}>
                            Processed
                          </StatusPill>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div> :

            <EmptyState
              icon={Wallet}
              title="No payouts yet"
              description="Once you receive payments, they will appear here." />

            }
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isAddBankOpen}
        onClose={() => setIsAddBankOpen(false)}
        title="Add Bank Account">

        <div className="space-y-4">
          <Input label="Account Holder Name" placeholder="e.g. John Doe" />
          <Input label="Account Number" placeholder="Enter account number" />
          <Input
            label="Re-enter Account Number"
            placeholder="Confirm account number" />

          <Input label="IFSC Code" placeholder="e.g. HDFC0001234" />
          <div className="pt-4">
            <Button className="w-full" onClick={() => setIsAddBankOpen(false)}>
              Verify & Save
            </Button>
            <p className="text-xs text-center text-slate-500 mt-2">
              We will deposit ₹1 to verify this account.
            </p>
          </div>
        </div>
      </Modal>
    </SellerLayout>);

}
function ClockIcon({ className }: {className?: string;}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

    </svg>);

}