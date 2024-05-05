"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ethhh from '../../utils/Etherium.jpg'
import bgImg from '../../public/BackGroundImg.jpg'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import "./homePage.css";
const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [enableButtons, setEnableButtons] = useState(false);

    const connectWalletHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setDefaultAccount(accounts[0]);
                toast.success('Success! Your connection was successful.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setConnButtonText('Wallet Connected');
                setEnableButtons(true);
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    };

    return (
        <div className='container bg-cover' style={{backgroundImage: 'url("./BackGroundImg.jpg")'}}>
            <ToastContainer />
            <header className="header">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 flash-effect">
                    Welcome to the AutoMobile Marketplace
                </h2>

            </header>
            <main className='content'>
                <div className="myImage" >
                    <Image
                        src={ethhh}
                        width={200}
                        height={200}
                        alt="Etherium Picturer"
                        className='py-10'
                    />
                </div>
                <div className="buttons">
                    <button onClick={connectWalletHandler} className={`button ${defaultAccount ? 'connected' : 'disconnected'}`}>
                        {connButtonText}
                    </button>
                    {enableButtons && (
                        <>
                            <Link href="/ProductListing" passHref className="button">
                                Add a Product
                            </Link>
                            <Link href="/BuyingPage" passHref className="button">
                                Buy a Vehicle
                            </Link>
                        </>
                    )}
                </div>
            </main>
            <footer className="footer">
                <p>© 2024 AutoMobile Marketplace. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default WalletCard;
