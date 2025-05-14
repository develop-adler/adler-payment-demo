import React from 'react'

const page = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
                Payment Success
            </h1>
            <p className='text-lg text-gray-700 mb-4'>
                Thank you for your purchase! Your payment was successful and your order is being processed.
            </p>
        </div>
    )
}

export default page