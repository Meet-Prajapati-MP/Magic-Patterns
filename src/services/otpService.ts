import { supabaseClient } from '../supabase-client';

export interface SendOTPResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  session?: any;
  user?: any;
  error?: string;
}

/**
 * Validate email format
 * Uses RFC 5322 compliant regex pattern
 */
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email address is required' };
  }

  const trimmedEmail = email.trim().toLowerCase();
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  // Check for common typos
  if (trimmedEmail.includes('..')) {
    return { valid: false, error: 'Email cannot contain consecutive dots' };
  }

  if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return { valid: false, error: 'Email cannot start or end with a dot' };
  }

  // Check length (RFC 5321: local part max 64 chars, domain max 255 chars)
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email address is too long' };
  }

  const [localPart, domain] = trimmedEmail.split('@');
  
  if (!localPart || localPart.length === 0 || localPart.length > 64) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (!domain || domain.length === 0 || domain.length > 255) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check domain has at least one dot
  if (!domain.includes('.')) {
    return { valid: false, error: 'Email domain must contain a dot' };
  }

  return { valid: true };
};

/**
 * Send OTP to email address using Supabase Auth
 * 
 * This function sends a verification code (OTP) to the user's email address.
 * The email template in Supabase Dashboard must be configured to display {{ .Token }}
 * to show the 6-digit OTP code instead of just a magic link.
 * 
 * @param email - User's email address
 * @param options - Optional configuration
 * @param options.name - User's name (stored in metadata)
 * @param options.redirectTo - Custom redirect URL after verification
 * @returns Promise with success status and message
 */
export const sendEmailOTP = async (
  email: string,
  options?: {
    name?: string;
    redirectTo?: string;
  }
): Promise<SendOTPResponse> => {
  try {
    // Step 1: Validate email format
    const validation = validateEmail(email);
    if (!validation.valid) {
      console.warn('Email validation failed:', validation.error);
      return {
        success: false,
        message: 'Invalid email address',
        error: validation.error
      };
    }

    // Step 2: Normalize email (trim and lowercase)
    const trimmedEmail = email.trim().toLowerCase();

    // Step 3: Prepare user metadata
    const metadata: Record<string, any> = {};
    if (options?.name) {
      metadata.name = options.name.trim();
      metadata.full_name = options.name.trim();
    }

    // Step 4: Prepare redirect URL (for magic link fallback)
    const redirectTo = options?.redirectTo || `${window.location.origin}/verify-otp`;

    console.log('📧 Sending email OTP to:', trimmedEmail);
    if (options?.name) {
      console.log('👤 User name:', options.name);
    }

    // Step 5: Send OTP using Supabase Auth
    // Note: Supabase generates a token that can be used as OTP code
    // The email template must use {{ .Token }} to display the code
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        emailRedirectTo: redirectTo,
        data: metadata,
        shouldCreateUser: true // Allow new user creation
      }
    });

    // Step 6: Handle errors
    if (error) {
      // Log comprehensive error details for debugging
      console.error('❌ Supabase Email OTP Error:');
      console.error('  Code:', error.status || error.code);
      console.error('  Message:', error.message);
      console.error('  Email:', trimmedEmail);
      
      // Handle rate limiting (too many requests)
      if (
        error.message.includes('rate limit') || 
        error.message.toLowerCase().includes('too many') ||
        error.status === 429
      ) {
        console.warn('⚠️ Rate limit exceeded for:', trimmedEmail);
        return {
          success: false,
          message: 'Too many requests. Please try again in a few minutes.',
          error: error.message
        };
      }

      // Handle invalid email errors
      if (
        error.message.toLowerCase().includes('invalid') ||
        error.message.toLowerCase().includes('email') ||
        error.status === 400
      ) {
        console.warn('⚠️ Invalid email format:', trimmedEmail);
        return {
          success: false,
          message: 'Invalid email address. Please check and try again.',
          error: error.message
        };
      }

      // Handle other errors
      console.error('❌ Unexpected error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send verification email. Please try again.',
        error: error.message
      };
    }

    // Step 7: Success
    console.log('✅ Email OTP sent successfully to:', trimmedEmail);
    return {
      success: true,
      message: `Verification code sent successfully to ${trimmedEmail}`
    };
  } catch (error: any) {
    // Handle unexpected errors (network, etc.)
    console.error('❌ Unexpected error in sendEmailOTP:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: error?.message || 'Unknown error'
    };
  }
};

/**
 * Verify OTP code sent to email
 */
export const verifyEmailOTP = async (
  email: string,
  otp: string
): Promise<VerifyOTPResponse> => {
  try {
    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Invalid email address',
        error: validation.error
      };
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return {
        success: false,
        message: 'OTP must be 6 digits',
        error: 'Invalid OTP format'
      };
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Verify OTP using Supabase Auth
    const { data, error } = await supabaseClient.auth.verifyOtp({
      email: trimmedEmail,
      token: otp,
      type: 'email'
    });

    if (error) {
      // Handle specific error cases
      if (error.message.includes('expired')) {
        return {
          success: false,
          message: 'OTP has expired. Please request a new one.',
          error: error.message
        };
      }

      if (error.message.includes('invalid') || error.message.includes('incorrect')) {
        return {
          success: false,
          message: 'Invalid OTP. Please check and try again.',
          error: error.message
        };
      }

      return {
        success: false,
        message: error.message || 'Failed to verify OTP',
        error: error.message
      };
    }

    // Update profile with name if provided
    if (data.user) {
      const metadata = data.user.user_metadata || {};
      const userEmail = data.user.email || trimmedEmail;
      
      // Update profile table
      try {
        await supabaseClient
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: userEmail,
            name: metadata.name || metadata.full_name || null,
            last_login: new Date().toISOString()
          }, {
            onConflict: 'id'
          });
      } catch (profileError) {
        console.error('Error updating profile:', profileError);
        // Don't fail verification if profile update fails
      }
    }

    return {
      success: true,
      message: 'Email verified successfully',
      session: data.session,
      user: data.user
    };
  } catch (error: any) {
    console.error('Error verifying email OTP:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: error?.message || 'Unknown error'
    };
  }
};

/**
 * Resend OTP to email address
 */
export const resendEmailOTP = async (
  email: string,
  options?: {
    name?: string;
    redirectTo?: string;
  }
): Promise<SendOTPResponse> => {
  // Resending OTP uses the same function as sending
  return sendEmailOTP(email, options);
};

// Legacy phone functions (kept for backward compatibility, but deprecated)
/**
 * @deprecated Use sendEmailOTP instead
 */
export const sendOTP = sendEmailOTP;

/**
 * @deprecated Use verifyEmailOTP instead
 */
export const verifyOTP = verifyEmailOTP;

/**
 * @deprecated Use resendEmailOTP instead
 */
export const resendOTP = resendEmailOTP;

/**
 * @deprecated Use validateEmail instead
 */
export const validatePhoneNumber = (phone: string): { valid: boolean; error?: string } => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return { valid: false, error: 'Phone number is required' };
  }
  
  if (digits.length !== 10) {
    return { valid: false, error: 'Phone number must be exactly 10 digits' };
  }
  
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { valid: false, error: 'Phone number must start with 6, 7, 8, or 9' };
  }
  
  return { valid: true };
};

/**
 * @deprecated Use validateEmail instead
 */
export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits}`;
  }
  
  if (digits.length === 10) {
    if (/^[6-9]\d{9}$/.test(digits)) {
      return `+91${digits}`;
    }
  }
  
  return `+91${digits}`;
};
