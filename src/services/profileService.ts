import { supabaseClient } from '../supabase-client';

export interface UserProfile {
  id: string;
  phone: string | null;
  name: string | null;
  email: string | null;
  account_type: 'individual' | 'business';
  pan: string | null;
  business_name: string | null;
  business_logo: string | null;
  gst: string | null;
  business_address: string | null;
  company_docs: string[] | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

/**
 * Get current user's profile
 */
export async function getCurrentUserProfile(): Promise<{ data: UserProfile | null; error: string | null }> {
  try {
    // Get current session
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return { data: null, error: 'Not authenticated' };
    }

    // Fetch profile from database
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return { data: null, error: error.message };
    }

    return { data: data as UserProfile, error: null };
  } catch (error: any) {
    console.error('Error in getCurrentUserProfile:', error);
    return { data: null, error: error.message || 'Failed to fetch profile' };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: {
  name?: string;
  phone?: string;
  email?: string;
  account_type?: 'individual' | 'business';
  business_name?: string;
  pan?: string;
  gst?: string;
  business_address?: string;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    // Get current session
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Update profile
    const { error } = await supabaseClient
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error in updateUserProfile:', error);
    return { success: false, error: error.message || 'Failed to update profile' };
  }
}

/**
 * Create or update user profile after authentication
 */
export async function upsertUserProfile(userId: string, profileData: {
  name?: string;
  phone?: string;
  email?: string;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabaseClient
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Create new profile
      const { error } = await supabaseClient
        .from('profiles')
        .insert({
          id: userId,
          ...profileData,
          account_type: 'individual',
          is_verified: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating profile:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error in upsertUserProfile:', error);
    return { success: false, error: error.message || 'Failed to upsert profile' };
  }
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(name: string | null): string {
  if (!name) return 'U';
  
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
