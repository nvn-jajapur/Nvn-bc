"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ethhh from '../../utils/Etherium.jpg'
import bgImg from '../../utils/BackGroundImg.jpg'
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
        <div className='container'>
            <ToastContainer />
            <header className="header">
                <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Welcome to the Blockchain Marketplace</h1>
            </header>
            <main className='content'>
                <div className="myImage" >
                 <Image
      src={ethhh}
      width={200}
      height={200}
      alt="Etherium Picturer"
    />                 
                </div>
                <div className="buttons">
                    <button onClick={connectWalletHandler} className={`button ${defaultAccount ? 'connected' : 'disconnected'}`}>
                        {connButtonText}
                    </button>
                    {enableButtons && (
                        <>
                            <Link href="/ProductListing" passHref className="button">
                                List an Item
                            </Link>
                            <Link href="/ProductDetails" passHref className="button">
                                Buy an Item
                            </Link>
                        </>
                    )}
                </div>
            </main>
            <footer className="footer">
                <p>© 2024 Blockchain Marketplace. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default WalletCard;
