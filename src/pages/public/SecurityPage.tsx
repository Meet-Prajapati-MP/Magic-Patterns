import React from 'react';
import { Shield, Lock, Server, Eye, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
export function SecurityPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-full mb-6">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bank-Grade Security
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your trust is our most valuable asset. We use industry-leading
            technology to keep your data and money safe.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Encryption Everywhere
                </h3>
                <p className="text-slate-600">
                  We use 256-bit SSL encryption for all data in transit. Your
                  sensitive information is encrypted at rest using AES-256
                  standards, the same level of security used by major banks.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  PCI-DSS Compliant
                </h3>
                <p className="text-slate-600">
                  Our payment infrastructure is fully compliant with the Payment
                  Card Industry Data Security Standard (PCI-DSS) Level 1. We
                  never store your card details on our servers.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Server className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Secure Infrastructure
                </h3>
                <p className="text-slate-600">
                  Our servers are hosted in secure data centers with 24/7
                  monitoring, redundant power, and physical security. We perform
                  regular backups to ensure data integrity.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <Eye className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Continuous Monitoring
                </h3>
                <p className="text-slate-600">
                  Our security team monitors our systems 24/7 for suspicious
                  activity. We use automated tools to detect and block potential
                  threats before they affect you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Regulatory Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2">RBI Guidelines</h3>
              <p className="text-slate-600 text-sm">
                We strictly adhere to all Reserve Bank of India guidelines for
                payment aggregators and settlement systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2">KYC / AML</h3>
              <p className="text-slate-600 text-sm">
                We implement robust Know Your Customer (KYC) and Anti-Money
                Laundering (AML) checks to prevent fraud.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2">Data Privacy</h3>
              <p className="text-slate-600 text-sm">
                We comply with India's Digital Personal Data Protection Act to
                ensure your privacy rights are respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bug Bounty */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Responsible Disclosure
          </h2>
          <p className="text-slate-600 mb-8">
            If you believe you've found a security vulnerability in our
            platform, please let us know. We run a bug bounty program to reward
            security researchers.
          </p>
          <a
            href="mailto:security@trustpay.in"
            className="text-blue-600 font-medium hover:underline">

            Report a Vulnerability →
          </a>
        </div>
      </section>
    </PublicLayout>);

}