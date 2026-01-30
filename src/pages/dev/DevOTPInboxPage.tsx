import React, { useState } from 'react';
import { RefreshCw, Trash2, AlertTriangle, Copy } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function DevOTPInboxPage() {
  const [otps, setOtps] = useState([
  {
    id: 1,
    phone: '+91 98765 43210',
    code: '123456',
    sentAt: 'Just now',
    expiresIn: '9:59',
    status: 'active'
  },
  {
    id: 2,
    phone: '+91 99887 76655',
    code: '876543',
    sentAt: '2 mins ago',
    expiresIn: '7:45',
    status: 'active'
  },
  {
    id: 3,
    phone: '+91 88776 65544',
    code: '456789',
    sentAt: '15 mins ago',
    expiresIn: 'Expired',
    status: 'expired'
  }]
  );
  const refreshOtps = () => {
    // Simulate refresh
    const newOtp = {
      id: Date.now(),
      phone: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
      code: Math.floor(Math.random() * 900000 + 100000).toString(),
      sentAt: 'Just now',
      expiresIn: '10:00',
      status: 'active'
    };
    setOtps([newOtp, ...otps]);
  };
  const clearAll = () => {
    setOtps([]);
  };
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">
              DEV MODE - Not for production
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              This page is only available in development environment. Do not
              expose this route in production.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">OTP Inbox</h1>
            <p className="text-slate-500">
              View SMS verification codes sent by the system
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={refreshOtps}
              leftIcon={<RefreshCw className="h-4 w-4" />}>

              Refresh
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={clearAll}
              leftIcon={<Trash2 className="h-4 w-4" />}>

              Clear All
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {otps.length > 0 ?
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">OTP Code</th>
                    <th className="px-6 py-3">Sent At</th>
                    <th className="px-6 py-3">Expires In</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {otps.map((otp) =>
                <tr key={otp.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {otp.phone}
                      </td>
                      <td className="px-6 py-4 font-mono text-lg tracking-wider text-blue-600 font-bold">
                        {otp.code}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{otp.sentAt}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {otp.expiresIn}
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill
                      status={otp.status === 'active' ? 'success' : 'error'}>

                          {otp.status === 'active' ? 'Active' : 'Expired'}
                        </StatusPill>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="Copy Code"
                      onClick={() =>
                      navigator.clipboard.writeText(otp.code)
                      }>

                          <Copy className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                )}
                </tbody>
              </table> :

            <div className="p-12 text-center text-slate-500">
                No OTPs found. Try triggering a verification flow.
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>);

}