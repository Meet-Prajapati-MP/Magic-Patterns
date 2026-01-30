import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { PaymentGateway } from '../../components/shared/PaymentGateway';
export function PaymentGatewayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/buyer/payment/processing');
    // Simulate processing delay then go to success
    setTimeout(() => {
      navigate('/buyer/payment/success');
    }, 2000);
  };
  const handleFailure = () => {
    navigate('/buyer/payment/processing');
    setTimeout(() => {
      navigate('/buyer/payment/failure');
    }, 2000);
  };
  return (
    <BuyerLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="h-4 w-4" />}>

            Back to Invoice
          </Button>
        </div>

        <PaymentGateway
          amount="29,550"
          invoiceId={id}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          onCancel={() => navigate(-1)} />

      </div>
    </BuyerLayout>);

}