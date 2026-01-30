import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ExternalLink,
  HelpCircle } from
'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
export function ContactPage() {
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="pt-24 pb-12 bg-slate-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We're here to help you succeed. Reach out to us with any questions
            or feedback.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 min-h-screen py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 2: Contact Form */}
            <div className="lg:col-span-2">
              <Card className="h-full shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Send us a message
                  </h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Full Name" placeholder="John Doe" />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com" />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Phone Number" placeholder="+91" />
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Subject
                        </label>
                        <select className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                          <option>General Inquiry</option>
                          <option>Sales & Pricing</option>
                          <option>Technical Support</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={6}
                        placeholder="How can we help you?">
                      </textarea>
                    </div>
                    <Button className="w-full md:w-auto" size="lg">
                      Send Message
                    </Button>
                    <p className="text-sm text-slate-500 mt-4">
                      We typically respond within 24 hours on business days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Section 3: Contact Methods */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Email Us</h3>
                      <p className="text-sm text-slate-600 mb-1">
                        For general inquiries
                      </p>
                      <a
                        href="mailto:support@trustpay.in"
                        className="text-blue-600 font-medium hover:underline">

                        support@trustpay.in
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">WhatsApp</h3>
                      <p className="text-sm text-slate-600 mb-1">
                        Quick chat support
                      </p>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline">

                        Click to chat
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Call Us</h3>
                      <p className="text-sm text-slate-600 mb-1">
                        Mon-Fri, 9am - 6pm IST
                      </p>
                      <a
                        href="tel:+919876543210"
                        className="text-purple-600 font-medium hover:underline">

                        +91 98765 43210
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section 4: Office Address */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <MapPin className="h-6 w-6 text-slate-400 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Office</h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Trustpay India Pvt Ltd
                        <br />
                        123, Tech Park, Koramangala
                        <br />
                        Bangalore, Karnataka 560034
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-100 h-32 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                    Map Placeholder
                  </div>
                </CardContent>
              </Card>

              {/* Section 6: Support Portal Link */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  Existing Customer?
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Log in to access the support dashboard for faster resolution.
                </p>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full bg-white text-blue-600 border-blue-200 hover:bg-blue-50">

                    Go to Support Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Section 5: FAQ Quick Links */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Looking for quick answers?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
              'How to create an invoice?',
              'Setting up payment methods',
              'Understanding transaction fees',
              'Connecting your bank account',
              'Troubleshooting login issues',
              'API documentation'].
              map((topic, i) =>
              <div
                key={i}
                className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors flex justify-between items-center group">

                  <span className="text-slate-700 font-medium group-hover:text-blue-600">
                    {topic}
                  </span>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>);

}