import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle } from 'lucide-react';
import { UnifiedLayout } from '../../components/layout/UnifiedLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { useProfile } from '../../components/context/ProfileContext';
import { Toast } from '../../components/ui/Toast';
export function UpgradeToBusinessPage() {
  const navigate = useNavigate();
  const { upgradeToBusinessProfile } = useProfile();
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    upgradeToBusinessProfile({
      businessName: formData.get('businessName') as string,
      gst: formData.get('gst') as string,
      businessEmail: formData.get('businessEmail') as string,
      businessBank: formData.get('businessBank') as string,
      businessAddress: formData.get('businessAddress') as string
    });
    setShowToast({
      message: 'Business profile created successfully!',
      type: 'success'
    });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  return (
    <UnifiedLayout>
      {showToast &&
      <div className="fixed top-4 right-4 z-50">
          <Toast
          type={showToast.type}
          message={showToast.message}
          onClose={() => setShowToast(null)} />

        </div>
      }

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors">

            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Upgrade to Business
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Add business details to create GST invoices and manage team
              members
            </p>
          </div>
        </div>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Business Profile Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
              'Create GST invoices with business branding',
              'Add team members to manage invoices',
              'Separate business bank account',
              'Professional invoice templates',
              'Business analytics and reports',
              'Priority support'].
              map((benefit, i) =>
              <div key={i} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{benefit}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="businessName"
                  label="Business Name"
                  placeholder="e.g. Trustopay Innovations Pvt Ltd"
                  required />

                <Input
                  name="gst"
                  label="GST Number (Optional)"
                  placeholder="29ABCDE1234F1Z5" />

                <Input
                  name="businessEmail"
                  label="Business Email"
                  type="email"
                  placeholder="business@company.com"
                  required />

                <Input
                  name="businessBank"
                  label="Business Bank Account"
                  placeholder="HDFC Bank - ****4567"
                  required />

              </div>

              <Input
                name="businessAddress"
                label="Business Address"
                placeholder="123 Business Park, City, State - 123456" />


              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      Your Individual profile will remain active
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      You can switch between Individual and Business anytime.
                      All your existing data stays intact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1">

                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Create Business Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>);

}