import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { getCurrentUserProfile } from '../../services/profileService';
export type AccountType = 'individual' | 'business';
export interface UserAccount {
  id: string;
  accountType: AccountType;
  // Common fields
  name: string;
  email: string;
  phone: string; // Unique identifier
  // Individual-specific
  pan?: string;
  // Business-specific
  businessName?: string;
  businessLogo?: string;
  gst?: string;
  companyDocs?: string[];
  businessAddress?: string;
}
interface ProfileContextType {
  currentAccount: UserAccount;
  updateAccount: (data: Partial<UserAccount>) => void;
}
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
export function ProfileProvider({ children }: {children: ReactNode;}) {
  // Default account - will be updated from Supabase
  const [currentAccount, setCurrentAccount] = useState<UserAccount>({
    id: '',
    accountType: 'individual',
    name: 'User',
    email: '',
    phone: '',
    pan: ''
  });

  // Fetch user profile from Supabase on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: profile, error } = await getCurrentUserProfile();
      if (profile && !error) {
        setCurrentAccount({
          id: profile.id,
          accountType: profile.account_type,
          name: profile.name || 'User',
          email: profile.email || '',
          phone: profile.phone || '',
          pan: profile.pan || undefined,
          businessName: profile.business_name || undefined,
          businessLogo: profile.business_logo || undefined,
          gst: profile.gst || undefined,
          companyDocs: profile.company_docs || undefined,
          businessAddress: profile.business_address || undefined
        });
      }
    };
    fetchProfile();
  }, []);

  const updateAccount = (data: Partial<UserAccount>) => {
    setCurrentAccount({
      ...currentAccount,
      ...data
    });
  };
  return (
    <ProfileContext.Provider
      value={{
        currentAccount,
        updateAccount
      }}>

      {children}
    </ProfileContext.Provider>);

}
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}