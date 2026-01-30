import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Heart,
  Zap,
  Target,
  Globe,
  Award,
  Coffee } from
'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
export function AboutPage() {
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="pt-24 pb-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Empowering India's{' '}
            <span className="text-blue-600">Freelance Economy</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're on a mission to solve the payment problem for India's 15
            million freelancers and SMEs.
          </p>
        </div>
      </section>

      {/* Section 2: Our Story */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Trustpay was born in 2024 from a simple frustration:{' '}
                  <strong>
                    getting paid shouldn't be harder than doing the work.
                  </strong>
                </p>
                <p className="mb-4">
                  Our founders, Rahul and Priya, ran a design agency for 5
                  years. They spent every Friday chasing invoices, sending
                  awkward reminder emails, and worrying about cash flow. They
                  realized they weren't alone—millions of Indian businesses face
                  the same struggle.
                </p>
                <p>
                  So they built Trustpay: a platform designed to bring trust,
                  speed, and professionalism to B2B payments. Today, we help
                  thousands of businesses get paid on time and grow without
                  financial stress.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-slate-200 overflow-hidden relative">
                {/* Placeholder for Founder Photo */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
                  <p className="text-slate-500 font-bold">Founder Photo</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 max-w-xs">
                <p className="italic text-slate-600 mb-2">
                  "We built the tool we wished we had when we started."
                </p>
                <p className="font-bold text-slate-900">— Rahul & Priya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission & Vision */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700">
              <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-slate-300">
                To make getting paid effortless for every Indian business,
                ensuring that talent is rewarded promptly and fairly.
              </p>
            </div>
            <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700">
              <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-slate-300">
                A world where cash flow anxiety doesn't limit business growth,
                and financial trust is built into every transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Problem We Solve */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            The Reality We're Changing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6">
              <div className="text-5xl font-bold text-red-500 mb-2">60%</div>
              <p className="text-slate-600">
                Of Indian SMEs face delayed payments
              </p>
            </div>
            <div className="p-6 border-x border-slate-100">
              <div className="text-5xl font-bold text-red-500 mb-2">
                90 Days
              </div>
              <p className="text-slate-600">
                Average wait time for B2B invoices
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-red-500 mb-2">
                ₹30L Cr
              </div>
              <p className="text-slate-600">
                Credit gap in the Indian MSME sector
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-blue-50 p-8 rounded-2xl border border-blue-100">
            <p className="text-lg text-blue-900 font-medium">
              We are bridging this gap with technology, automation, and
              financial innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Our Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: Shield,
              title: 'Trust First',
              desc: 'We prioritize security and transparency in every decision we make.'
            },
            {
              icon: Zap,
              title: 'Speed Matters',
              desc: 'We build for speed because waiting for money is painful.'
            },
            {
              icon: Heart,
              title: 'Simplicity Wins',
              desc: 'We take complex financial flows and make them invisible.'
            },
            {
              icon: Users,
              title: 'Customer Obsessed',
              desc: 'We solve real problems for real people, not just metrics.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">

                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 6: Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-slate-600">
              Built by a team of engineers, designers, and finance experts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
            {
              name: 'Rahul Sharma',
              role: 'Co-Founder & CEO'
            },
            {
              name: 'Priya Patel',
              role: 'Co-Founder & CTO'
            },
            {
              name: 'Amit Singh',
              role: 'Head of Product'
            },
            {
              name: 'Sneha Gupta',
              role: 'Head of Growth'
            },
            {
              name: 'Vikram Malhotra',
              role: 'Lead Engineer'
            },
            {
              name: 'Anjali Rao',
              role: 'Lead Designer'
            },
            {
              name: 'Karan Mehta',
              role: 'Finance Lead'
            },
            {
              name: 'You?',
              role: 'Join Us'
            }].
            map((member, i) =>
            <div key={i} className="text-center group">
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                  {member.role === 'Join Us' ?
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-600">
                      <Users className="h-10 w-10" />
                    </div> :

                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-slate-200">
                      Photo
                    </div>
                }
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 7: Backed By */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">
            Trusted by leading investors
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale">
            <div className="text-2xl font-bold text-slate-800">SEQUOIA</div>
            <div className="text-2xl font-bold text-slate-800">
              Y COMBINATOR
            </div>
            <div className="text-2xl font-bold text-slate-800">ACCEL</div>
            <div className="text-2xl font-bold text-slate-800">
              TIGER GLOBAL
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Join Us */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
            <Coffee className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            We're Hiring!
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Join us in building the financial infrastructure for the future of
            work. We're looking for passionate people to join our remote-first
            team.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              View Open Positions
            </Button>
          </Link>
          <div className="mt-8 flex justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />{' '}
              Remote-first
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />{' '}
              Competitive equity
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Health
              insurance
            </span>
          </div>
        </div>
      </section>
    </PublicLayout>);

}