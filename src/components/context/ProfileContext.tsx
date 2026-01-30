import React, { useState, createContext, useContext } from 'react';
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
  // Mock account - in real app, fetch from API based on login
  const [currentAccount, setCurrentAccount] = useState<UserAccount>({
    id: '1',
    accountType: 'individual',
    name: 'Ankit Sharma',
    email: 'ankit@example.com',
    phone: '+91 98765 43210',
    pan: 'ABCDE1234F'
  });
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