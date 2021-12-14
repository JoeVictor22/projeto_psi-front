import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';


const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    console.log("simbora")
  };

  return (
    <>
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
        
    </>
  );
};

export default PaymentForm;