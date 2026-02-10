import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Save,
  Send,
  Calendar } from
'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Select } from '../../components/ui/Select';
import { DatePicker } from '../../components/ui/DatePicker';
import { Switch } from '../../components/ui/Switch';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { createInvoice } from '../../services/invoiceService';
import { supabaseClient } from '../../supabase-client';
export function CreateInvoicePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  // Add Client Form State
  const [newClientCompanyName, setNewClientCompanyName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  // Add Client Validation errors
  const [newClientCompanyNameError, setNewClientCompanyNameError] = useState('');
  const [newClientEmailError, setNewClientEmailError] = useState('');
  const [newClientPhoneError, setNewClientPhoneError] = useState('');
  // Track if Add Client form has been submitted
  const [addClientFormSubmitted, setAddClientFormSubmitted] = useState(false);
  // Track if items form has been submitted (for step 2)
  const [itemsFormSubmitted, setItemsFormSubmitted] = useState(false);
  // Payment section state
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDateError, setDueDateError] = useState('');
  const [notesError, setNotesError] = useState('');
  // Track if payment form has been submitted
  const [paymentFormSubmitted, setPaymentFormSubmitted] = useState(false);
  // Form State
  const [selectedClient, setSelectedClient] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientEmailError, setClientEmailError] = useState('');
  const [clientGstin, setClientGstin] = useState('');
  const [clientGstinError, setClientGstinError] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientAddressError, setClientAddressError] = useState('');
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [paymentType, setPaymentType] = useState('full');
  const [items, setItems] = useState([
  {
    id: 1,
    desc: '',
    qty: 1,
    rate: 0
  }]
  );
  // Milestone Payments State
  const [milestones, setMilestones] = useState([
  {
    id: 1,
    description: 'Initial Payment',
    percentage: 50,
    dueDate: ''
  },
  {
    id: 2,
    description: 'Final Payment',
    percentage: 50,
    dueDate: ''
  }]
  );
  // Mock Clients
  const [clients, setClients] = useState([
  {
    value: '1',
    label: 'Acme Corp'
  },
  {
    value: '2',
    label: 'TechStart Inc'
  },
  {
    value: '3',
    label: 'Design Studio'
  }]
  );
  const addItem = () => {
    setItems([
    ...items,
    {
      id: Date.now(),
      desc: '',
      qty: 1,
      rate: 0
    }]
    );
  };
  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };
  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  };
  const calculateTax = () => {
    return taxEnabled ? calculateSubtotal() * 0.18 : 0;
  };
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  const areItemsValid = () => {
    return items.every((item) => item.desc && item.desc.toString().trim() !== '' && Number(item.qty) > 0 && Number(item.rate) > 0);
  };
  const addMilestone = () => {
    setMilestones([
    ...milestones,
    {
      id: Date.now(),
      description: '',
      percentage: 0,
      dueDate: ''
    }]
    );
  };
  const removeMilestone = (id: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id));
    }
  };
  const updateMilestone = (id: number, field: string, value: string | number) => {
    setMilestones(
      milestones.map((m) =>
      m.id === id ?
      {
        ...m,
        [field]: value
      } :
      m
      )
    );
  };

  // Ensure split payment always has 2 fixed payments at 50% each
  useEffect(() => {
    if (paymentType === 'split') {
      setMilestones((prevMilestones) => [
        {
          id: 1,
          description: 'Payment 1',
          percentage: 50,
          dueDate: prevMilestones[0]?.dueDate || ''
        },
        {
          id: 2,
          description: 'Payment 2',
          percentage: 50,
          dueDate: prevMilestones[1]?.dueDate || ''
        }
      ]);
    }
  }, [paymentType]);

  const getTotalPercentage = () => {
    return milestones.reduce((acc, m) => acc + (Number(m.percentage) || 0), 0);
  };

  const getMilestonePercentageError = (milestoneId: number): string => {
    if (!paymentFormSubmitted) {
      return '';
    }
    const total = getTotalPercentage();
    if (total !== 100) {
      return `Total must equal 100% (Current: ${total}%)`;
    }
    return '';
  };
  const handleSaveDraft = () => {
    setShowToast({
      message: 'Draft saved successfully',
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);
  };
  const validateDueDate = (dateValue: string): string => {
    if (!dateValue.trim()) {
      return 'Due date is required';
    }
    return '';
  };

  const validateNotes = (notesValue: string): string => {
    if (!notesValue.trim()) {
      return 'Notes is required';
    }
    return '';
  };

  const validateMilestoneDueDates = (): boolean => {
    if (paymentType === 'milestone' || paymentType === 'split') {
      return milestones.every(m => m.dueDate.trim() !== '');
    }
    return true;
  };

  const handleSendInvoice = async () => {
    // Start loading animation IMMEDIATELY for better UX
    console.log('🔄 Setting loading state to true');
    setIsSendingInvoice(true);
    
    // Use setTimeout to ensure React renders the loading state before validation
    // Small delay ensures the UI updates before async operations
    await new Promise(resolve => setTimeout(resolve, 50));
    
    setPaymentFormSubmitted(true);
    
    // Validate payment fields when payment type is 'full'
    if (paymentType === 'full') {
      const dateErr = validateDueDate(dueDate);
      const notesErr = validateNotes(notes);
      
      setDueDateError(dateErr);
      setNotesError(notesErr);
      
      if (dateErr || notesErr) {
        setIsSendingInvoice(false);
        return;
      }
    }
    
    // Validate milestone/split payment due dates
    if (paymentType === 'milestone' || paymentType === 'split') {
      const notesErr = validateNotes(notes);
      setNotesError(notesErr);
      
      if (!validateMilestoneDueDates() || notesErr) {
        setIsSendingInvoice(false);
        return;
      }
    } else {
      // For milestone/split, only validate notes
      const notesErr = validateNotes(notes);
      setNotesError(notesErr);
      
      if (notesErr) {
        setIsSendingInvoice(false);
        return;
      }
    }

    try {
      // Get client name from selected client or use a default
      const clientName = selectedClient 
        ? clients.find(c => c.value === selectedClient)?.label || 'Client'
        : 'Client';

      // Prepare invoice items
      const invoiceItems = items.map(item => ({
        description: item.desc,
        quantity: item.qty,
        rate: item.rate,
        amount: item.qty * item.rate
      }));

      // Prepare milestones if applicable
      let invoiceMilestones;
      if (paymentType === 'milestone' || paymentType === 'split') {
        const totalAmount = calculateTotal();
        invoiceMilestones = milestones.map(milestone => ({
          description: milestone.description,
          percentage: milestone.percentage,
          dueDate: milestone.dueDate,
          amount: (totalAmount * milestone.percentage) / 100
        }));
      }

      // Get current authenticated user - REQUIRED for invoice creation
      let userId: string | null = null;
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      
      if (user && !userError) {
        userId = user.id;
        console.log('✅ Using authenticated user:', userId);
      } else {
        // User must be authenticated to create invoices
        console.error('❌ No authenticated user found. User must be logged in to create invoices.');
        setIsSendingInvoice(false);
        setShowToast({
          message: 'You must be logged in to create invoices. Please log in and try again.',
          type: 'error'
        });
        return;
      }

      if (!userId) {
        setIsSendingInvoice(false);
        setShowToast({
          message: 'Unable to identify user. Please log out and log back in.',
          type: 'error'
        });
        return;
      }

      // Prepare invoice data
      const invoiceData = {
        clientId: selectedClient || undefined,
        clientName: clientName,
        clientEmail: clientEmail,
        clientAddress: clientAddress || undefined,
        clientGstin: clientGstin || undefined,
        invoiceDate: new Date().toISOString().split('T')[0], // Today's date
        dueDate: paymentType === 'full' ? dueDate : undefined,
        paymentType: paymentType as 'full' | 'milestone' | 'split',
        subtotal: calculateSubtotal(),
        taxRate: taxEnabled ? 18 : 0,
        taxAmount: calculateTax(),
        totalAmount: calculateTotal(),
        items: invoiceItems,
        milestones: invoiceMilestones,
        notes: notes || undefined,
        status: 'sent' as const,
        isDraft: false
      };

      console.log('📝 ========== STARTING INVOICE CREATION ==========');
      console.log('📝 Creating invoice with data:', invoiceData);
      console.log('👤 User ID:', userId);
      
      // Verify auth before proceeding
      const authCheck = await supabaseClient.auth.getUser();
      console.log('🔐 Auth check result:', {
        hasUser: !!authCheck.data?.user,
        userId: authCheck.data?.user?.id,
        error: authCheck.error,
        matches: authCheck.data?.user?.id === userId
      });
      
      if (!authCheck.data?.user) {
        console.error('❌ CRITICAL: No authenticated user found!');
        setIsSendingInvoice(false);
        setShowToast({
          message: 'Authentication failed. Please log in again.',
          type: 'error'
        });
        return;
      }

      // Save invoice to Supabase with comprehensive error handling
      console.log('💾 ========== CALLING createInvoice() FUNCTION ==========');
      console.log('💾 Timestamp:', new Date().toISOString());
      console.log('💾 User ID:', userId);
      console.log('💾 Invoice data being sent:', JSON.stringify(invoiceData, null, 2));
      console.log('💾 Supabase Client URL:', supabaseClient.supabaseUrl);
      
      const createStartTime = Date.now();
      const result = await createInvoice(invoiceData, userId);
      const createDuration = Date.now() - createStartTime;
      
      console.log('💾 ========== createInvoice() RETURNED ==========');
      console.log('💾 Duration:', createDuration, 'ms');
      console.log('💾 Result:', JSON.stringify(result, null, 2));

      if (result.success) {
        console.log('✅ Invoice created successfully with ID:', result.invoiceId);
        console.log('📋 Invoice details:', {
          invoiceId: result.invoiceId,
          sellerId: userId,
          clientEmail: invoiceData.clientEmail,
          buyerId: invoiceData.buyerId || 'NULL (will be auto-assigned if buyer exists)'
        });
        setShowToast({
          message: 'Invoice created and saved successfully!',
          type: 'success'
        });
        // Keep loading state for smooth transition, then navigate
        setTimeout(() => {
          setIsSendingInvoice(false);
          // Navigate to invoice list - it will auto-refresh on mount
          navigate('/seller/invoices', { replace: true });
        }, 1500);
      } else {
        console.error('❌ INVOICE CREATION FAILED!');
        console.error('Error:', result.error);
        console.error('User ID used:', userId);
        console.error('Invoice data:', invoiceData);
        
        // Stop loading animation on error
        setIsSendingInvoice(false);
        
        // Show detailed error message in toast
        const errorMessage = result.error || 'Failed to save invoice. Please check all fields and try again.';
        console.error('📋 Full error details:', {
          error: result.error,
          userId: userId,
          invoiceData: invoiceData,
          timestamp: new Date().toISOString()
        });
        
        // Also log to console for debugging
        console.error('🔍 DEBUGGING INFO:');
        console.error('  - User authenticated:', !!userId);
        console.error('  - Invoice items count:', invoiceData.items.length);
        console.error('  - Total amount:', invoiceData.totalAmount);
        console.error('  - Client email:', invoiceData.clientEmail);
        
        setShowToast({
          message: errorMessage,
          type: 'error'
        });
        
        // Keep toast visible longer for errors
        setTimeout(() => setShowToast(null), 8000);
      }
    } catch (error: any) {
      // Handle any unexpected errors
      console.error('❌ Unexpected error during invoice creation:', error);
      setIsSendingInvoice(false);
      setShowToast({
        message: error?.message || 'An unexpected error occurred. Please try again.',
        type: 'error'
      });
      setTimeout(() => setShowToast(null), 8000);
    }
  };
  const isFormValid = () => {
  return items.every(item => 
    item.desc.trim() !== '' && 
    item.qty > 0 && 
    item.rate > 0
  );
};
  // Validation functions for Add Client
  const validateEmail = (emailValue: string): string => {
    if (!emailValue.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phoneValue: string): string => {
    if (!phoneValue.trim()) {
      return 'Phone number is required';
    }
    // Remove all non-digit characters and check for exactly 10 digits
    const digitsOnly = phoneValue.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  };

  const validateCompanyName = (name: string): string => {
    if (!name.trim()) {
      return 'Company name is required';
    }
    return '';
  };

  const isAddClientFormValid = (): boolean => {
    return (
      newClientCompanyName.trim() !== '' &&
      newClientEmail.trim() !== '' &&
      newClientPhone.trim() !== '' &&
      newClientCompanyNameError === '' &&
      newClientEmailError === '' &&
      newClientPhoneError === ''
    );
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setAddClientFormSubmitted(true);
    
    // Validate all fields
    const nameErr = validateCompanyName(newClientCompanyName);
    const emailErr = validateEmail(newClientEmail);
    const phoneErr = validatePhone(newClientPhone);

    setNewClientCompanyNameError(nameErr);
    setNewClientEmailError(emailErr);
    setNewClientPhoneError(phoneErr);

    if (nameErr || emailErr || phoneErr) {
      return;
    }

    // In real app, get values from form
    const newClient = {
      value: Date.now().toString(),
      label: newClientCompanyName
    };
    setClients([...clients, newClient]);
    setSelectedClient(newClient.value);
    setIsAddClientModalOpen(false);
    setShowToast({
      message: 'Client added successfully',
      type: 'success'
    });
    setTimeout(() => setShowToast(null), 3000);

    // Reset form
    setNewClientCompanyName('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientCompanyNameError('');
    setNewClientEmailError('');
    setNewClientPhoneError('');
    setAddClientFormSubmitted(false);
  };

  const handleAddClientModalClose = () => {
    setIsAddClientModalOpen(false);
    // Reset form on close
    setNewClientCompanyName('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientCompanyNameError('');
    setNewClientEmailError('');
    setNewClientPhoneError('');
    setAddClientFormSubmitted(false);
  };
  const renderStep1 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Select Client
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select
                options={[
                {
                  value: '',
                  label: 'Select a client...'
                },
                ...clients]
                }
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)} />

              </div>
              <Button
              variant="outline"
              onClick={() => setIsAddClientModalOpen(true)}
              leftIcon={<Plus className="h-4 w-4" />}>

                New
              </Button>
            </div>
          </div>

          {selectedClient &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <Input
            label="Client Name"
            placeholder="e.g. Acme Corp"
            defaultValue={
            clients.find((c) => c.value === selectedClient)?.label
            } />

              <Input
            label="Email Address"
            type="email"
            placeholder="billing@acme.com"
            value={clientEmail}
            onChange={(e) => {
              setClientEmail(e.target.value);
              if (clientEmailError) setClientEmailError('');
            }}
            onBlur={() => {
              const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!clientEmail) {
                setClientEmailError('Email is required');
              } else if (!re.test(clientEmail)) {
                setClientEmailError('Enter a valid email address');
              } else {
                setClientEmailError('');
              }
            }}
            required
            error={clientEmailError} />

              <Input
            label="GSTIN (Optional)"
            placeholder="22AAAAA0000A1Z5"
            value={clientGstin}
            onChange={(e) => {
              setClientGstin(e.target.value);
              if (clientGstinError) setClientGstinError('');
            }}
            onBlur={() => {
              const gst = clientGstin.trim().toUpperCase();
              const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
              if (gst && !re.test(gst)) {
                setClientGstinError('Enter a valid GSTIN');
              } else {
                setClientGstinError('');
              }
            }}
            error={clientGstinError} />
              <Input
            label="Address"
            placeholder="123 Business Park"
            value={clientAddress}
            onChange={(e) => {
              setClientAddress(e.target.value);
              if (clientAddressError) setClientAddressError('');
            }}
            onBlur={() => {
              if (!clientAddress.trim()) {
                setClientAddressError('Address is required');
              } else {
                setClientAddressError('');
              }
            }}
            required
            error={clientAddressError} />
            </div>
        }
        </CardContent>
      </Card>
    </div>;

  const renderStep2 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Items</CardTitle>
          <Button
          size="sm"
          variant="outline"
          onClick={addItem}
          leftIcon={<Plus className="h-4 w-4" />}>

            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) =>
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-4 items-end border-b border-slate-100 pb-4 last:border-0">

                <div className="flex-1 w-full">
                  <Input
                label={index === 0 ? 'Description' : ''}
                placeholder="Item description"
                value={item.desc}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].desc = e.target.value;
                  setItems(newItems);
                }}
                error={itemsFormSubmitted && item.desc.trim() === '' ? 'Description is required' : ''}
                 />

                </div>
                <div className="w-24">
                  <Input
                label={index === 0 ? 'Qty' : ''}
                type="number"
                value={item.qty}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].qty = parseInt(e.target.value) || 0;
                  setItems(newItems);
                }}
                error={itemsFormSubmitted && Number(item.qty) <= 0 ? 'Quantity must be greater than 0' : ''} />

                </div>
                <div className="w-32">
                  <Input
                label={index === 0 ? 'Rate (₹)' : ''}
                type="number"
                value={item.rate}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].rate = parseFloat(e.target.value) || 0;
                  setItems(newItems);
                }} 
                error={itemsFormSubmitted && Number(item.rate) <= 0 ? 'Rate must be greater than 0' : ''}/>

                </div>
                <div className="w-32 pb-2 text-right font-medium text-slate-900">
                  ₹{(item.qty * item.rate).toLocaleString()}
                </div>
                <button
              onClick={() => removeItem(item.id)}
              className="pb-2 text-slate-400 hover:text-red-500 transition-colors"
              disabled={items.length === 1}>

                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
          )}

            <div className="flex justify-end pt-4 space-y-4">
              <div className="w-72 space-y-3">
                {/* Tax Toggle */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-700">
                    Include Tax (GST)
                  </span>
                  <Switch checked={taxEnabled} onChange={setTaxEnabled} />
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toLocaleString()}</span>
                </div>

                {taxEnabled &&
              <div className="flex justify-between text-sm text-slate-600">
                    <span>GST (18%)</span>
                    <span>₹{calculateTax().toLocaleString()}</span>
                  </div>
              }

                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;

  const renderStep3 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Card>
        <CardHeader>
          <CardTitle>Payment Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Payment Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentType === 'full' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                <input
                type="radio"
                name="paymentType"
                className="h-4 w-4 text-blue-600"
                checked={paymentType === 'full'}
                onChange={() => setPaymentType('full')} />

                <div className="ml-3">
                  <span className="block font-semibold text-slate-900 text-sm">
                    Full Payment
                  </span>
                  <span className="block text-xs text-slate-500">
                    Single due date
                  </span>
                </div>
              </label>

              <label
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentType === 'milestone' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                <input
                type="radio"
                name="paymentType"
                className="h-4 w-4 text-blue-600"
                checked={paymentType === 'milestone'}
                onChange={() => setPaymentType('milestone')} />

                <div className="ml-3">
                  <span className="block font-semibold text-slate-900 text-sm">
                    Milestone Based
                  </span>
                  <span className="block text-xs text-slate-500">
                    Custom schedule
                  </span>
                </div>
              </label>

              <label
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentType === 'split' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                <input
                type="radio"
                name="paymentType"
                className="h-4 w-4 text-blue-600"
                checked={paymentType === 'split'}
                onChange={() => setPaymentType('split')} />

                <div className="ml-3">
                  <span className="block font-semibold text-slate-900 text-sm">
                    Split Payment
                  </span>
                  <span className="block text-xs text-slate-500">
                    50-50 split
                  </span>
                </div>
              </label>
            </div>
          </div>

          {paymentType === 'full' &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (paymentFormSubmitted) {
                    setDueDateError(validateDueDate(e.target.value));
                  }
                }}
                error={paymentFormSubmitted ? dueDateError : ''} />
            </div>
        }

          {(paymentType === 'milestone' || paymentType === 'split') &&
        <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Payment Schedule
                </h4>
                {paymentType === 'milestone' &&
            <Button
              size="sm"
              variant="outline"
              onClick={addMilestone}
              leftIcon={<Plus className="h-3 w-3" />}>

                    Add Milestone
                  </Button>
            }
              </div>

              <div className="space-y-3">
                {milestones.map((milestone, index) =>
            <div
              key={milestone.id}
              className="p-4 border border-slate-200 rounded-lg space-y-3">

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Payment {index + 1}
                      </span>
                      {paymentType === 'milestone' && milestones.length > 1 &&
                <button
                  onClick={() => removeMilestone(milestone.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors">

                          <Trash2 className="h-4 w-4" />
                        </button>
                }
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                  label="Description"
                  placeholder="e.g. Initial Payment"
                  value={milestone.description}
                  onChange={(e) =>
                  updateMilestone(
                    milestone.id,
                    'description',
                    e.target.value
                  )
                  }
                  disabled={paymentType === 'split'} />

                      <Input
                  label="Percentage (%)"
                  type="number"
                  placeholder="50"
                  value={paymentType === 'split' ? 50 : milestone.percentage}
                  onChange={(e) => {
                    if (paymentType !== 'split') {
                      updateMilestone(
                        milestone.id,
                        'percentage',
                        parseInt(e.target.value) || 0
                      );
                    }
                  }}
                  error={paymentType === 'milestone' ? getMilestonePercentageError(milestone.id) : ''}
                  disabled={paymentType === 'split'}
                  readOnly={paymentType === 'split'} />

                      <DatePicker
                  label="Due Date"
                  value={milestone.dueDate}
                  onChange={(e) =>
                  updateMilestone(
                    milestone.id,
                    'dueDate',
                    e.target.value
                  )
                  }
                  error={paymentFormSubmitted && !milestone.dueDate.trim() ? 'Due date is required' : ''} />
                    </div>

                    <div className="text-sm text-slate-600">
                      Amount: ₹
                      {(
                calculateTotal() * milestone.percentage /
                100).
                toLocaleString()}
                    </div>
                  </div>
            )}
              </div>

              {getTotalPercentage() !== 100 &&
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  Total percentage must equal 100%. Currently: {getTotalPercentage()}%
                </div>
          }
            </div>
        }

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-blue-900">
                  Offer EMI Options?
                </h4>
                <p className="text-xs text-blue-700 mt-1">
                  Allow your client to pay in 3, 6, or 12 months. You get paid
                  upfront (Phase 2).
                </p>
              </div>
              <Switch checked={false} onChange={() => {}} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Notes / Terms
              </label>
              {paymentFormSubmitted && notesError &&
              <span className="text-xs text-red-500 font-medium ml-2">{notesError}</span>
              }
            </div>
            <textarea
            className={`w-full rounded-md p-3 text-sm focus:ring-2 focus:outline-none ${
              paymentFormSubmitted && notesError && typeof notesError === 'string' && notesError.trim().length > 0 ? '!border-2 !border-red-500 focus:ring-red-500' : 'border border-slate-300 focus:ring-blue-500'
            }`}
            rows={4}
            placeholder="Thank you for your business..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (paymentFormSubmitted) {
                setNotesError(validateNotes(e.target.value));
              }
            }} />

          </div>
        </CardContent>
      </Card>
    </div>;

  return (
    <SellerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {showToast &&
        <div className="fixed top-4 right-4 z-50">
            <Toast
            type={showToast.type}
            message={showToast.message}
            onClose={() => setShowToast(null)} />

          </div>
        }

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              Create Invoice
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              leftIcon={<Save className="h-4 w-4" />}
              onClick={handleSaveDraft}>

              Save Draft
            </Button>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between px-8">
          {[1, 2, 3].map((s) =>
          <div key={s} className="flex flex-col items-center relative z-10">
              <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>

                {s}
              </div>
              <span className="text-xs font-medium text-slate-500 mt-2">
                {s === 1 ? 'Client' : s === 2 ? 'Details' : 'Payment'}
              </span>
            </div>
          )}
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200 -z-0 mx-auto w-2/3" />
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={() => {
              setStep(Math.max(1, step - 1));
              if (step === 3) {
                setItemsFormSubmitted(false);
              }
            }}
            disabled={step === 1}>

            Back
          </Button>

          {step < 3 ?
          <Button
  onClick={() => {
    if (step === 2) {
      setItemsFormSubmitted(true);
      // Check if items are valid before proceeding
      const isValid = items.every(item => 
        item.desc.trim() !== '' && 
        Number(item.qty) > 0 && 
        Number(item.rate) > 0
      );
      if (isValid) {
        setStep(Math.min(3, step + 1));
      }
    } else {
      setStep(Math.min(3, step + 1));
    }
  }}
  rightIcon={<ArrowRight className="h-4 w-4" />}
  disabled={
    step === 1 && (
      !selectedClient || 
      clientEmailError || 
      clientGstinError || 
      clientAddressError || 
      (selectedClient && !clientEmail) || 
      (selectedClient && !clientAddress)
    )
  }>
  Next Step
</Button> :

          <Button
            onClick={handleSendInvoice}
            rightIcon={!isSendingInvoice ? <Send className="h-4 w-4" /> : undefined}
            isLoading={isSendingInvoice}
            disabled={
              isSendingInvoice ||
              (paymentType === 'full' && (!dueDate.trim() || !notes.trim())) ||
              (paymentType === 'milestone' && (getTotalPercentage() !== 100 || !notes.trim() || !validateMilestoneDueDates())) ||
              (paymentType === 'split' && (!notes.trim() || !validateMilestoneDueDates()))
            }
            className={`transition-all duration-300 ${
              isSendingInvoice 
                ? 'opacity-90 cursor-wait' 
                : 'hover:scale-105 active:scale-95'
            }`}>

              {isSendingInvoice ? 'Sending Invoice...' : 'Send Invoice'}
            </Button>
          }
        </div>

        {/* Add Client Modal */}
        <Modal
          isOpen={isAddClientModalOpen}
          onClose={handleAddClientModalClose}
          title="Add New Client">

          <form onSubmit={handleAddClient} className="space-y-4">
            <Input
              label="Company Name"
              placeholder="e.g. Acme Corp"
              value={newClientCompanyName}
              onChange={(e) => {
                setNewClientCompanyName(e.target.value);
                if (addClientFormSubmitted) {
                  setNewClientCompanyNameError(validateCompanyName(e.target.value));
                }
              }}
              error={addClientFormSubmitted ? newClientCompanyNameError : ''} />
            <Input
              label="Email"
              type="email"
              placeholder="billing@acme.com"
              value={newClientEmail}
              onChange={(e) => {
                const value = e.target.value;
                // Update the Add Client modal state
                setNewClientEmail(value);
                // Also keep the main invoice Email Address in sync
                setClientEmail(value);
                if (clientEmailError) {
                  setClientEmailError('');
                }
                if (addClientFormSubmitted) {
                  setNewClientEmailError(validateEmail(value));
                }
              }}
              error={addClientFormSubmitted ? newClientEmailError : ''} />

            <Input
              label="Phone"
              placeholder="+91 98765 43210"
              value={newClientPhone}
              onChange={(e) => {
                setNewClientPhone(e.target.value);
                if (addClientFormSubmitted) {
                  setNewClientPhoneError(validatePhone(e.target.value));
                }
              }}
              error={addClientFormSubmitted ? newClientPhoneError : ''} />
            <Button type="submit" className="w-full" disabled={!isAddClientFormValid()}>
              Add Client
            </Button>
          </form>
        </Modal>
      </div>
    </SellerLayout>);

}