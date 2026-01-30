import React, { useState } from 'react';
import { Check, CreditCard, Shield, Zap } from 'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { PaymentGateway } from '../../components/shared/PaymentGateway';
export function SubscriptionPage() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isActive, setIsActive] = useState(false); // Demo state
  const features = [
  'Unlimited Invoices & Clients',
  'Accept Payments via UPI, Card, NetBanking',
  'Offer EMI Options to Clients',
  'WhatsApp & Email Reminders',
  'Priority Support',
  'Access to Invoice Financing (Phase 2)'];

  const history = [
  {
    date: '25 Jan 2024',
    amount: '₹499',
    status: 'success',
    invoice: 'INV-SUB-001'
  }];

  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Your Subscription
          </h2>
          <p className="text-slate-500 mt-2">
            Simple, transparent pricing for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Plan Card */}
          <div className="md:col-span-2">
            <Card
              className={`border-2 ${isActive ? 'border-green-500' : 'border-blue-500'} relative overflow-hidden`}>

              {isActive &&
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  ACTIVE
                </div>
              }
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Trustopay Pro
                    </h3>
                    <p className="text-slate-500">
                      Everything you need to grow.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-slate-900">
                      ₹499
                    </span>
                    <span className="text-slate-500">/year</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, i) =>
                  <div key={i} className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  {isActive ?
                  <div>
                      <p className="text-sm font-medium text-slate-900">
                        Renews on 25 Jan 2025
                      </p>
                      <p className="text-xs text-slate-500">
                        Auto-renewal is on
                      </p>
                    </div> :

                  <p className="text-sm text-slate-500">
                      14-day free trial ending soon
                    </p>
                  }

                  <Button
                    size="lg"
                    onClick={() => setIsPaymentOpen(true)}
                    disabled={isActive}
                    className={
                    isActive ? 'bg-green-600 hover:bg-green-700' : ''
                    }>

                    {isActive ? 'Plan Active' : 'Upgrade Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Side */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">
                Secure & Compliant
              </h4>
              <p className="text-sm text-slate-600">
                Bank-grade security for all your data. RBI compliant payment
                processing.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Get Paid Faster</h4>
              <p className="text-sm text-slate-600">
                Users on Pro plan get paid 3x faster on average thanks to
                automated reminders.
              </p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Description
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Amount
                  </th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase py-3 px-6">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isActive &&
                history.map((item, i) =>
                <tr key={i}>
                      <td className="py-4 px-6 text-sm text-slate-900">
                        {item.date}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        Trustopay Pro - Annual
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-slate-900">
                        {item.amount}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                )}
                {!isActive &&
                <tr>
                    <td
                    colSpan={4}
                    className="py-8 text-center text-slate-500 text-sm">

                      No billing history yet.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <PaymentGateway
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={499}
        onSuccess={() => {
          setIsActive(true);
          setIsPaymentOpen(false);
        }} />

    </SellerLayout>);

}