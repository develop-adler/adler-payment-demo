import React from 'react'


type Props = {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }
}

const Crypto: React.FC<Props> = ({ product }) => {

    console.log('Crypto component rendered with product:', product)

    return (
        <form className="space-y-4">
            <p className="text-sm text-gray-600">Send crypto to the address below:</p>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
                0xAB12...FA34DE56
            </div>
            <input type="text" placeholder="Enter your wallet address (optional)" className="w-full border rounded px-3 py-2 mt-2" />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                I’ve Sent the Crypto
            </button>
        </form>
    )
}

export default Crypto