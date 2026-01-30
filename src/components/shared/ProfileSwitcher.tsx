import React, { useState } from 'react';
import { ChevronDown, Building2, User, ArrowUpCircle } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
export function ProfileSwitcher() {
  const { currentProfile, profiles, switchProfile, hasBusinessProfile } =
  useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors">

        <div className="flex items-center space-x-2">
          {currentProfile.type === 'individual' ?
          <User className="h-4 w-4 text-slate-500" /> :

          <Building2 className="h-4 w-4 text-slate-500" />
          }
          <div className="text-left">
            <p className="text-xs text-slate-500">Using as</p>
            <p className="text-sm font-medium text-slate-900">
              {currentProfile.type === 'individual' ?
              currentProfile.name :
              currentProfile.businessName}
            </p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen &&
      <>
          <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)} />

          <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
            <div className="p-2">
              <p className="text-xs font-medium text-slate-500 px-3 py-2">
                Switch Context
              </p>
              {profiles.map((profile) =>
            <button
              key={profile.id}
              onClick={() => {
                switchProfile(profile.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${currentProfile.id === profile.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}`}>

                  {profile.type === 'individual' ?
              <User className="h-4 w-4" /> :

              <Building2 className="h-4 w-4" />
              }
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">
                      {profile.type === 'individual' ?
                  profile.name :
                  profile.businessName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {profile.type === 'individual' ?
                  'Individual' :
                  'Business'}
                      {profile.type === 'business' &&
                  ` • ${profile.teamRole === 'admin' ? 'Admin' : 'Member'}`}
                    </p>
                  </div>
                  {currentProfile.id === profile.id &&
              <div className="h-2 w-2 rounded-full bg-blue-600" />
              }
                </button>
            )}

              {!hasBusinessProfile() &&
            <>
                  <div className="my-2 border-t border-slate-100" />
                  <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings/upgrade-to-business');
                }}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md hover:bg-blue-50 text-blue-600 transition-colors">

                    <ArrowUpCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Upgrade to Business
                    </span>
                  </button>
                </>
            }
            </div>
          </div>
        </>
      }
    </div>);

}