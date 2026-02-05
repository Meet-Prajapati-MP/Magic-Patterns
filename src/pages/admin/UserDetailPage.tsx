import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ban, Shield, Mail, Phone, Calendar } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function UserDetailPage() {
  const { id } = useParams();
  const user = {
    id: id || 'USR-001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765 43210',
    role: 'Seller',
    status: 'Active',
    joined: '15 Jan 2024',
    kycStatus: 'Verified'
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/users"
              className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <StatusPill status="success">Active</StatusPill>
                <span className="text-sm text-slate-500">ID: {user.id}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Reset Password</Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              leftIcon={<Ban className="h-4 w-4" />}>

              Suspend User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-500">Total Invoices</p>
                  <p className="text-2xl font-bold text-slate-900">45</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-500">Total Volume</p>
                  <p className="text-2xl font-bold text-slate-900">₹12.5L</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <p className="text-sm text-slate-500">Disputes</p>
                  <p className="text-2xl font-bold text-slate-900">0</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Created Invoice #INV-00{i}
                        </p>
                        <p className="text-xs text-slate-500">2 hours ago</p>
                      </div>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                        Log
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-slate-400 mr-3" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-slate-400 mr-3" />
                  {user.phone}
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 text-slate-400 mr-3" />
                  KYC: <span className="text-green-600 font-medium ml-1">
                    {user.kycStatus}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                  Joined: {user.joined}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>);

}