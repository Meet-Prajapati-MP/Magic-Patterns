import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText } from
'lucide-react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { Input } from '../../components/ui/Input';
export function ApplicationDetailPage() {
  const { appId } = useParams();
  // Mock Data
  const app = {
    id: appId || 'APP-001',
    seller: 'Rajesh Design Studio',
    invoiceAmount: 100000,
    requestedAmount: 80000,
    status: 'pending',
    riskScore: 85,
    buyer: 'Acme Corp',
    invoiceDate: '20 Jan 2025',
    dueDate: '20 Feb 2025'
  };
  return (
    <NBFCLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/nbfc/applications"
              className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Application #{app.id}
              </h1>
              <div className="flex items-center space-x-3 mt-1">
                <StatusPill status="warning">Pending Review</StatusPill>
                <span className="text-sm text-slate-500">
                  Submitted 2 hours ago
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              leftIcon={<XCircle className="h-4 w-4" />}>

              Reject
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              leftIcon={<CheckCircle className="h-4 w-4" />}>

              Approve & Offer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Seller
                    </p>
                    <p className="font-medium text-slate-900">{app.seller}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Buyer
                    </p>
                    <p className="font-medium text-slate-900">{app.buyer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Invoice Amount
                    </p>
                    <p className="font-bold text-slate-900">
                      ₹{app.invoiceAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      Due Date
                    </p>
                    <p className="font-medium text-slate-900">{app.dueDate}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<FileText className="h-4 w-4" />}>

                    View Original Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${app.riskScore >= 80 ? 'border-emerald-500 text-emerald-600' : 'border-amber-500 text-amber-600'}`}>

                    {app.riskScore}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Low Risk</h3>
                    <p className="text-sm text-slate-500">
                      Based on seller history and buyer credit score
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Seller Repayment History
                    </span>
                    <span className="font-medium text-emerald-600">
                      Excellent (100%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Buyer Credit Score</span>
                    <span className="font-medium text-emerald-600">750+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Invoice Verification</span>
                    <span className="font-medium text-emerald-600">
                      Verified via GSTN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Offer Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Disbursement Amount"
                  defaultValue="80000"
                  type="number" />

                <Input
                  label="Interest Rate (%)"
                  defaultValue="1.5"
                  type="number" />

                <Input
                  label="Processing Fee (%)"
                  defaultValue="0.5"
                  type="number" />


                <div className="bg-slate-50 p-3 rounded text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Net Disbursement:</span>
                    <span className="font-bold">₹79,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Repayment Amount:</span>
                    <span className="font-bold">₹80,000 + Int.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NBFCLayout>);

}