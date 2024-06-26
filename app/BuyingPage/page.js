"use client"
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../../utils/connections';

const MarketplaceDisplay = () => {
    const [items, setItems] = useState([]);

    // API call using useEffect to get all the products available
    useEffect(() => {

        const fetchItems = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const items = await contract.getAllProducts();
            const itemsFormatted = items.map(item => ({
                id: item.id.toNumber(),
                title: item.title,
                imageHash: item.imageHash,
                price: ethers.utils.formatEther(item.price),
                sold: item.sold,
                description: item.description
            }));
            // Here the details of each item is obtained and added into a list to view each item
            setItems(itemsFormatted);
        };

        fetchItems();
    }, []);

    // Navigate to Product Details page when we hit on the selected product
    const handleCardClick = (item) => {
        if (!item.sold) {
            console.log(item?.price);
            window.location.href = `/ProductDetails?title=${encodeURIComponent(item.title)}&imageHash=${encodeURIComponent(item.imageHash)}&price=${encodeURIComponent(item.price)}&sold=${item.sold}&description=${encodeURIComponent(item.description)}&id=${item.id}`;
        }
    };

    // Function call to Navigate to Home Page
    const navigateToHome = () => {
        window.location.href = `/HomePage`;
    };
    // Function call to Navigate to Home Page
    const navigateToListingPage = () => {
        window.location.href = `/ProductListing`;
    };
    return (
        <div className="bg-gray-800 min-h-screen p-6">
            <div className="mx-auto">
                <div className='flex justify-between'>
                    <div><h1 className="text-3xl font-bold text-white mb-6">Products Available</h1></div>
                    <div> <button style={{
                        fontSize: '14px',
                        color: 'white',
                        backgroundColor: '#0070f3',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '8px 20px',
                        margin: '0 5px 15px 0'
                    }} onClick={navigateToHome}>Home</button>
                        <button style={{
                            fontSize: '14px',
                            color: 'white',
                            backgroundColor: '#D3D3D3',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            padding: '8px 20px',
                            margin: '0 0 15px 5px',
                        }} onClick={navigateToListingPage}>Listing Page</button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id}
                            className={`relative bg-white rounded-lg shadow-lg p-4 ${item.sold ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                            onClick={() => handleCardClick(item)}>
                            <img src={`https://gateway.pinata.cloud/ipfs/${item.imageHash}`} alt={item.title} className="rounded w-full h-64 object-cover" />
                            <h5 className="text-gray-900 text-xl leading-tight font-bold mt-2">{item.title}</h5>
                            <p className="text-gray-600 font-bold">{item.price} ETH</p>
                            {item.sold && <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: 'rgba(2, 2, 2, 0.5)' }}>Out of Stock</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceDisplay;
