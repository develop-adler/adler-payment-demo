import React from 'react';

import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

type Props = {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }
}

const Paypal: React.FC<Props> = ({ product }) => {

    const initialOptions: ReactPayPalScriptOptions = {
        clientId: 'sb',
        currency: 'USD',
        intent: 'capture',
        disableFunding: 'credit,card,paylater',
        // Add other options as needed
    };

    const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
      try {
        const response = await fetch("/api/create-paypal-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: product.price, // Replace this with your actual cart total logic
          }),
        });
    
        const orderData = await response.json();
    
        if (!orderData.id) {
          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : "Unexpected error occurred, please try again.";
    
          throw new Error(errorMessage);
        }
    
        return orderData.id;
      } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw error;
      }
    };
    
    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
      try {
        const response = await fetch("/api/capture-paypal-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        });
    
        const details = await response.json();
    
        if (response.ok) {
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        } else {
          console.error("Error capturing PayPal order:", details);
          alert("There was a problem capturing your transaction.");
        }
      } catch (error) {
        console.error("Capture error:", error);
        alert("An error occurred while capturing the order.");
      }
    };
    

    return (
        <form className="space-y-4">
            <p className="text-center text-sm text-gray-600">
                You’ll be redirected to PayPal to complete your purchase.
            </p>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(err) => {
                    console.error('PayPal Checkout onError', err);
                }}
              />
            </PayPalScriptProvider>
        </form>
    )
}

export default Paypal