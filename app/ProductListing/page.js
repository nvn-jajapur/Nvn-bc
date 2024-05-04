"use client"
import React, { useState, useRef } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { contractABI, contractAddress } from '../../utils/connections';
import '../globals.css';
import { useRouter } from 'next/navigation'

function useImageUploader() {

  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name); 
    }
  };

  const uploadImageToPinata = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': '9b7504cf79f5dce2a584',
          'pinata_secret_api_key': 'd4e4c9beaa5664f5a0c43d67a24d922ed0ba2c9eab3375b2f40da35d9975993c',
        },
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image to Pinata: ', error);
      setErrorMessage('Failed to upload image to Pinata.');
      return null;
    }
  };

  return { image,fileName, onImageChange, uploadImageToPinata, errorMessage, setImage };
}

const WalletCard = () => {
    const router = useRouter()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { image,fileName, onImageChange, uploadImageToPinata, errorMessage, setImage } = useImageUploader();
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      setErrorMessage('MetaMask is not detected.');
      return;
    }

    setIsLoading(true);
    const ipfsHash = await uploadImageToPinata(image);
    if (!ipfsHash) {
      setIsLoading(false);
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await marketplaceContract.listProduct(title, description, ipfsHash, ethers.utils.parseUnits(price, 'ether'));
      await transaction.wait();
      setSuccessMessage('Item listed successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => { setSuccessMessage(''); }, 3000);
    } catch (error) {
        console.error('Error processing transaction: ', error);
        setErrorMessage('Transaction failed: ' + error.message);
    } finally {
        setIsLoading(false);
    }
    router.push('/BuyingPage')
};

  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-black'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg'>
            {successMessage && (
                <div className="success bg-green-500 text-white p-4 mb-4 text-center font-bold rounded">
                    {successMessage}
                </div>
            )}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add your Product into the Marketplace</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mt-2">
                    <label className="block text-gray-800 font-bold mb-2">Name</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Name of the Product" required />
                </div>
                <div className="mt-2">
                    <label className="block text-gray-800 font-bold mb-2">Price (ETH)</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Price in ETH" required />
                </div>
                <div className="mt-2">
                    <label className="block text-gray-800 font-bold mb-2">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Product Details" required />
                </div>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={onImageChange} />
                    </label>
                    {!fileName && <p className="pl-1">or drag and drop</p>}
                    {fileName && <p className="pl-3">SelectedFile: {fileName}</p>}
                </div>
                <div className="flex justify-center mt-4">
                    <button type="submit" disabled={isLoading} className={`shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded ${isLoading ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-400 text-white'}`}>
                        {isLoading ? 'Processing...' : 'List Item'}
                    </button>
                </div>
                {errorMessage && <p className="error text-red-500 text-center mt-4">{errorMessage}</p>}
            </form>
        </div>
    </div>
  );
};

export default WalletCard;
