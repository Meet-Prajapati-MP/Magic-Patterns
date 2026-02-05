import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle } from
'lucide-react';
import { UnifiedLayout } from '../../components/layout/UnifiedLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { ProgressBar } from '../../components/ui/ProgressBar';
export function BuyerEMIPage() {
  const [activeTab, setActiveTab] = useState('active');
  const tabs = [
  {
    id: 'active',
    label: 'Active Plans'
  },
  {
    id: 'completed',
    label: 'Completed'
  },
  {
    id: 'all',
    label: 'All Plans'
  }];

  const emiPlans = [
  {
    id: 'EMI-001',
    invoice: 'INV-007',
    seller: 'Rajesh Design Studio',
    totalAmount: 29550,
    paidAmount: 9850,
    remainingAmount: 19700,
    tenure: 6,
    completedInstallments: 2,
    nextDueDate: '15 Feb 2025',
    monthlyEMI: 4925,
    status: 'active'
  },
  {
    id: 'EMI-002',
    invoice: 'INV-008',
    seller: 'TechCraft Solutions',
    totalAmount: 60000,
    paidAmount: 20000,
    remainingAmount: 40000,
    tenure: 12,
    completedInstallments: 4,
    nextDueDate: '20 Feb 2025',
    monthlyEMI: 5000,
    status: 'active'
  },
  {
    id: 'EMI-003',
    invoice: 'INV-005',
    seller: 'Design Studio',
    totalAmount: 15000,
    paidAmount: 15000,
    remainingAmount: 0,
    tenure: 3,
    completedInstallments: 3,
    nextDueDate: '-',
    monthlyEMI: 5000,
    status: 'completed'
  }];

  const filteredPlans = emiPlans.filter((plan) => {
    if (activeTab === 'active') return plan.status === 'active';
    if (activeTab === 'completed') return plan.status === 'completed';
    return true;
  });
  return (
    <UnifiedLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">EMI Plans</h2>
          <Link to="/autopay/setup">
            <Button>Setup Autopay</Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Plans
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">2</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Outstanding
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ₹59,700
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Next Payment
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ₹4,925
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Due on 15 Feb 2025</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>

                {tab.label}
              </button>
            )}
          </div>

          {/* EMI Plans List */}
          <div className="divide-y divide-slate-100">
            {filteredPlans.map((plan) =>
            <div
              key={plan.id}
              className="p-6 hover:bg-slate-50 transition-colors">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {plan.seller}
                      </h3>
                      <StatusPill
                      status={
                      plan.status === 'active' ? 'warning' : 'success'
                      }>

                        {plan.status === 'active' ? 'Active' : 'Completed'}
                      </StatusPill>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                      {plan.id} • Invoice: {plan.invoice} • {plan.tenure} months
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          Paid: ₹{plan.paidAmount.toLocaleString()}
                        </span>
                        <span className="font-medium text-slate-900">
                          Total: ₹{plan.totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar
                      value={plan.paidAmount / plan.totalAmount * 100}
                      color={plan.status === 'completed' ? 'green' : 'blue'} />

                      <div className="flex justify-between text-xs text-slate-500">
                        <span>
                          {plan.completedInstallments}/{plan.tenure} installments
                        </span>
                        {plan.status === 'active' &&
                      <span>
                            ₹{plan.remainingAmount.toLocaleString()} remaining
                          </span>
                      }
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {plan.status === 'active' &&
                  <div className="text-right">
                        <p className="text-sm text-slate-500">Next Payment</p>
                        <p className="text-lg font-bold text-slate-900">
                          ₹{plan.monthlyEMI.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          Due: {plan.nextDueDate}
                        </p>
                      </div>
                  }
                    <Link to={`/emi-plans/${plan.id}`}>
                      <Button
                      variant={
                      plan.status === 'active' ? 'primary' : 'outline'
                      }
                      size="sm">

                        {plan.status === 'active' ? 'Pay Now' : 'View Details'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Autopay Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Never Miss a Payment
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Setup autopay to automatically pay your EMIs on time and avoid
                  late fees.
                </p>
              </div>
            </div>
            <Link to="/autopay/setup">
              <Button
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 whitespace-nowrap">

                Setup Autopay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </UnifiedLayout>);

}