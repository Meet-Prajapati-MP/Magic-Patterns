# Supabase Email OTP Setup Guide

## Overview
This guide shows you how to configure Supabase to send **OTP codes** (6-digit numbers) in emails instead of just magic links.

---

## The Problem

By default, Supabase sends emails with **magic links** (clickable URLs). To show **OTP codes** (6-digit numbers), you need to customize the email template.

---

## Solution: Update Email Template

### Step 1: Access Email Templates

1. **Open Supabase Dashboard:**
   - Go to: https://app.supabase.com/
   - Select your project

2. **Navigate to Email Templates:**
   - Click **Authentication** (left sidebar)
   - Click **Settings** tab
   - Scroll to **"Email Templates"** section

3. **Select Template:**
   - Click on **"Magic Link"** template
   - This is the template used for email OTP verification

---

### Step 2: Customize Email Template

#### Update Subject Line:
```
Your Trustopay Verification Code: {{ .Token }}
```

**Note:** If you've configured Supabase to generate 6-digit tokens (in Authentication → Settings), use `{{ .Token }}`. If Supabase generates 8-digit tokens, use `{{ slice .Token 0 6 }}` to show only 6 digits.

#### Update HTML Body:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Trustopay</h1>
  </div>
  
  <!-- Content -->
  <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #333; margin-top: 0; font-size: 24px;">Email Verification</h2>
    
    <p style="font-size: 16px; color: #555;">Hello {{ .UserMetaData.name }},</p>
    
    <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
      Thank you for signing up with Trustopay. Please use the verification code below to complete your registration:
    </p>
    
    <!-- OTP Code Box -->
    <div style="background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%); border: 2px solid #667eea; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
      <div style="font-size: 12px; color: #667eea; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
        Your Verification Code
      </div>
      <div style="font-size: 48px; font-weight: bold; color: #667eea; letter-spacing: 10px; font-family: 'Courier New', 'Monaco', monospace; line-height: 1.2;">
        {{ .Token }}
      </div>
```

**Note:** Use `{{ .Token }}` if Supabase is configured for 6-digit tokens. If Supabase generates 8-digit tokens, use `{{ slice .Token 0 6 }}` instead.
    </div>
    
    <p style="color: #888; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
      ⏱️ This code will expire in <strong>60 minutes</strong>.<br>
      If you didn't request this code, please ignore this email.
    </p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>This is an automated message from Trustopay.<br>Please do not reply to this email.</p>
  </div>
  
</body>
</html>
```

#### Update Plain Text Version:
```
Hello {{ .UserMetaData.name }},

Thank you for signing up with Trustopay. Please use the verification code below to complete your registration:

Your Verification Code: {{ .Token }}
```

**Note:** Use `{{ .Token }}` if Supabase is configured for 6-digit tokens. If Supabase generates 8-digit tokens, use `{{ slice .Token 0 6 }}` instead.

This code will expire in 60 minutes. If you didn't request this code, please ignore this email.

---
This is an automated message from Trustopay. Please do not reply to this email.
```

---

### Step 3: Save and Test

1. **Click "Save"** at the bottom of the template editor

2. **Test the Setup:**
   - Go to your app's login page
   - Enter name and email
   - Click "Send Verification Code"
   - Check your email inbox
   - **You should see exactly 6 digits clearly displayed!**

---

## Template Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .Token }}` | The OTP token (use this if Supabase is configured for 6 digits) | `123456` |
| `{{ slice .Token 0 6 }}` | First 6 digits only (use this if Supabase generates 8-digit tokens) | `299972` |
| `{{ .ConfirmationURL }}` | Magic link (clickable URL) | `https://...` |
| `{{ .UserMetaData.name }}` | User's name from login form | `John Doe` |
| `{{ .Email }}` | User's email address | `user@example.com` |

**Important:** 
- If you've configured Supabase to generate **6-digit tokens** (in Authentication → Settings), use `{{ .Token }}` in your email template.
- If Supabase generates **8-digit tokens** by default, use `{{ slice .Token 0 6 }}` to show only the first 6 digits.

**How to configure Supabase for 6-digit tokens:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Look for "OTP Length" or "Token Length" configuration
3. Set it to 6 digits
4. Save the settings

The app's verification UI accepts exactly 6 digits, so ensure your email template displays 6 digits to match.

---

## How It Works

1. **User enters email** → Your app calls `sendEmailOTP(email)`
2. **Supabase generates OTP** → Creates a 6-digit token (if configured for 6 digits)
3. **Email is sent** → Uses your customized template with `{{ .Token }}` to show the 6-digit code
4. **User receives email** → Sees exactly 6 digits displayed
5. **User enters 6-digit code** → Your app calls `verifyEmailOTP(email, code)` with 6 digits
6. **Verification succeeds** → User is logged in

---

## Troubleshooting

### Issue: Still seeing magic link instead of code

**Solution:**
- Make sure you're using `{{ .Token }}` (not `{{ .ConfirmationURL }}`)
- Check that you saved the template
- Try sending a new verification email

### Issue: Code not appearing in email

**Solution:**
- Verify the template was saved correctly
- Check that `{{ slice .Token 0 6 }}` is in both HTML and plain text versions
- Make sure you're using the "Magic Link" template (not "Change Email" or others)

### Issue: Verification fails even with correct 6-digit code

**Possible Causes:**
1. Supabase is generating 8-digit tokens but email shows only 6 digits
2. Token length mismatch between email template and Supabase configuration

**Solution:**
1. **Check Supabase Configuration:**
   - Go to Supabase Dashboard → Authentication → Settings
   - Look for "OTP Length" or "Token Length" configuration
   - Ensure it's set to 6 digits

2. **Verify Email Template:**
   - If Supabase is configured for 6 digits → Use `{{ .Token }}`
   - If Supabase generates 8 digits → Use `{{ slice .Token 0 6 }}` OR configure Supabase to generate 6 digits

3. **Test:**
   - Send a test OTP email
   - Check the actual token length in the email
   - Verify it matches your Supabase configuration

### Issue: Email not sending

**Solution:**
- Check Supabase Dashboard → Authentication → Logs
- Verify email provider is enabled in Authentication → Providers
- Check your Supabase project limits (free tier: 3 emails/hour)

---

## Best Practices

1. **Make the code prominent:**
   - Use large font size (36-48px)
   - Use monospace font (Courier New, Monaco)
   - Add letter-spacing for readability
   - Use contrasting colors

2. **Include helpful information:**
   - Show expiration time
   - Include user's name for personalization
   - Add security notice

3. **Test on multiple email clients:**
   - Gmail, Outlook, Apple Mail
   - Mobile and desktop
   - Dark mode compatibility

---

## No SMTP Configuration Needed

Supabase's default email service works perfectly for this. You don't need to configure custom SMTP unless you want to:
- Send more than 3 emails/hour (free tier limit)
- Use a custom "From" email address
- Have more control over email delivery

For most use cases, the default email service is sufficient.

---

## Success Checklist

- [ ] Email template updated with `{{ .Token }}`
- [ ] Subject line includes the code
- [ ] HTML body displays code prominently
- [ ] Plain text version includes code
- [ ] Template saved successfully
- [ ] Test email sent
- [ ] OTP code visible in received email
- [ ] Code verification works in app

---

That's it! Your email OTP system is now configured. 🎉
