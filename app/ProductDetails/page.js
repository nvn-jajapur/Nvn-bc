"use client"
import React, { useState } from 'react';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/connections";
import { useSearchParams } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation'

const ItemDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isBuying, setIsBuying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonText, setButtonText] = useState('Purchase the Item');

    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const price = searchParams.get('price');
    const imageHash = searchParams.get('imageHash');
    const id = searchParams.get('id');

    const connectWalletHandler = async () => {
        // if (window.ethereum && window.ethereum.isMetaMask) {
        //     try {
        //         await window.ethereum.request({ method: "eth_requestAccounts" });
        //     } catch (error) {
        //         console.log('Error connecting to MetaMask:', error);
        //         setErrorMessage('Failed to connect wallet. Make sure MetaMask is installed and unlocked.');
        //     }
        // } else {
        //     console.log('MetaMask is not installed');
        //     setErrorMessage('Please install MetaMask browser extension to interact');
        // }
    };

    const purchaseProduct = async () => {
        // if (!window.ethereum || !window.ethereum.isMetaMask) {
        //     setErrorMessage('Please install MetaMask to perform the transaction.');
        //     return;
        // }

        setIsBuying(true);
        setButtonText('Executing.....');

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const new_price = ethers.utils.parseUnits(price.toString(), "ether");
        debugger
            const transaction = await contract.purchaseProduct(id, {value: new_price});
            await transaction.wait();

            setIsBuying(false);
            setTimeout(() => window.location.href = '/BuyingPage', 3000);
        } catch (error) {
            toast.error(`Error: ${error.reason}`);
            setIsBuying(false);
            setButtonText('Purchase Item');
            setTimeout(() => {
                router.push('/BuyingPage');
              }, 6000);
            // router.push('/BuyingPage');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
             <ToastContainer />
            <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                <img src={`https://gateway.pinata.cloud/ipfs/${imageHash}`} alt={title} className="rounded w-full object-cover h-64 mb-4" />
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-xl text-indigo-600 mb-6">{price} ETH</p>
                <button 
                    className={`w-full py-3 text-white font-bold rounded transition duration-300 ease-in-out ${isBuying ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                    onClick={purchaseProduct} 
                    disabled={isBuying}>
                    {buttonText}
                </button>
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ItemDetails;
