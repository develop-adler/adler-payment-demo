import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from 'src/src/lib/convertToSubcurrency';
import CheckoutPage from '../CheckoutPage';

type Props = {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }
}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('Missing Stripe public key in environment variables');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Stripe: React.FC<Props> = ({ product }) => {


    return (
        <Elements 
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: convertToSubcurrency(product.price),
                currency: "usd",
            }}
        >
            <div className="text-center mt-10">
            <CheckoutPage 
                amount={product.price}
            />                
            </div>
        </Elements>
    )
}

export default Stripe