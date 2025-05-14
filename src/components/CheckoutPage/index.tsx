"use client";

import React, { useEffect, useState } from 'react';

import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';

import convertToSubcurrency from 'src/src/lib/convertToSubcurrency';

type Props = {
    amount: number;
}

const CheckoutPage: React.FC<Props> = ({amount}) => {

    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: convertToSubcurrency(amount),
            }),
        })
            .then((response) => response.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setErrorMessage('Stripe is not loaded or client secret is missing');
            setLoading(false);
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message || 'An unknown error occurred');
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}`,
            },
        });
        if (error) {
            setErrorMessage(error.message || 'An unknown error occurred');
        } else {
            setErrorMessage(null);
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full max-w-md mx-auto mt-10'
        >
            {clientSecret && ( <PaymentElement />)}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {loading && <div className="text-blue-500">Loading...</div>}
            <button
                className='
                    w-full bg-blue-600 text-white py-2 rounded-lg mt-4
                    disabled:opacity-50 disabled:animate-pulse
                '
                type="submit"
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </button>
        </form>
    )
}

export default CheckoutPage