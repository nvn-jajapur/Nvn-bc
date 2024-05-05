"use client"
import React, { Suspense, useState } from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/connections";
import { useSearchParams } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation'

const ItemDetails = () => {
    const router = useRouter();
    const [isBuying, setIsBuying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonText, setButtonText] = useState('Buy Now');
    const [transactionId, setTransactionId] = useState('');

    const DetailsContent = () => {
        const searchParams = useSearchParams();
        const title = searchParams.get('title');
        const description = searchParams.get('description');
        const price = searchParams.get('price');
        const imageHash = searchParams.get('imageHash');
        const id = searchParams.get('id');

        return (
            <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                <img src={`https://gateway.pinata.cloud/ipfs/${imageHash}`} alt={title} className="rounded w-full object-cover h-64 mb-4" />
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-xl text-indigo-600 mb-6">{price} ETH</p>
                <button 
                    className={`w-full py-3 text-white font-bold rounded transition duration-300 ease-in-out ${isBuying ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                    onClick={() => purchaseProduct(id, price)}
                    disabled={isBuying}>
                    {buttonText}
                </button>
                {transactionId && <p className="text-green-500 text-center mt-2">Purchase successful! Transaction ID: {transactionId}</p>}
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
            </div>
        );
    };

    const purchaseProduct = async (id, price) => {
        setIsBuying(true);
        setButtonText('Transaction in Progress.....');

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const new_price = ethers.utils.parseUnits(price.toString(), "ether");
            debugger
            const transaction = await contract.purchaseProduct(id, {value: new_price});
            const result = await transaction.wait();

            setIsBuying(false);
            toast.success('Success! Your transaction is done with Id: ' + result.transactionHash, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => window.location.href = '/BuyingPage', 3000);
        } catch (error) {
            toast.error(`Error: ${error.reason}`);
            setIsBuying(false);
            setButtonText('Buy Now');
            setTimeout(() => {
                router.push('/BuyingPage');
              }, 6000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
            <ToastContainer />
            <Suspense fallback={<div>Loading...</div>}>
                <DetailsContent />
            </Suspense>
        </div>
    );
};

export default ItemDetails;
