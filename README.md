## Welcome to AutoMobile MarketPlace
The AutoMobile marketplace, powered by Ethereum, revolutionizes vehicle buying and selling. Leveraging blockchain technology, it ensures secure, transparent transactions and offers smart contracts for seamless, trustless exchanges. Dive into a futuristic automotive experience where every deal is as reliable as the technology behind it!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`my-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![image](https://github.com/nvn-jajapur/Nvn-bc/assets/165442723/03ac318c-a46d-4720-9fb3-64343565d9ac)


Link for the application : [Application](https://dappcarmarketplace.netlify.app/HomePage)

Technologies uses:

## Technologies

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [MetaMask](https://metamask.io/) - Metamask Wallet
- [Solidity](https://soliditylang.org/) - Solidity
- [Remix](https://remix.ethereum.org/) - Remix IDE
- [EtherScan](https://etherscan.io/) - Etherscan to check transactions

Before we start, make sure Node is installed on your system.
## 1. Commands to clone the project
```bash
git clone https://github.com/nvn-jajapur/Nvn-bc.git
```
### 2. Commands to install required packages
```bash
npm install
# or npm install --force (not recommended)
npm install ethers
# or npm install ethers  --force (not recommended)
npm install axios
# or npm install axios  --force (not recommended)
```
## 3. Code in solidity
Make sure that you hvae connected to MetaMask(or other wallet) and solidity is coding is up and running

## 4. Commands to run project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## 5. ABI and ContractAddress
Make sure to update the contractABI and contractAddress of your code from solidity in connections.js and compData.json respectively.
## Mechanics of project

The platform enables users to showcase and acquire products in a distributed fashion. Items can be listed with pricing in USD, yet transactions are facilitated using ETH or an alternative cryptocurrency of choice. Embedded smart contracts guarantee the integrity and enforcement of transaction protocols, ensuring all dealings are secure and compliant with predetermined standards.

## How it works
## 1. Connection to Wallet
To enhance security and streamline transactions, the platform allows users to easily connect their digital wallets. Simply click on the "Connect Wallet" button located the homepage, and follow the prompts to connect your Ethereum wallet. Once connected, you can securely interact with the marketplace features.

## 2. Adding a Product to the Marketplace
Adding your product to the marketplace is straightforward:
1. Navigate to the "Add Product" section via the dashboard.
2. Fill in the product details, including name, description, price, and photos.
3. Submit the product for listing. Once approved, your product will be visible to all users on the platform.

## 3. List of Products for Sale
Browse the diverse range of productsfrom the list. The marketplace is organized , making it easy to find exactly what you're looking for and select the vehicle.

## 4. Buying of Products
Purchasing products on the platform is secure and user-friendly:
1. Select the product you wish to buy from the list of products for sale.
2. Click on the "Buy Now" button on the product page.
3. Confirm the transaction from your connected wallet. Once the transaction is confirmed, the payment will be processed securely through smart contracts ensuring transparency and trust.

Each of these features is designed to provide a comprehensive, secure, and enjoyable shopping experience on our platform.

![image](https://github.com/nvn-jajapur/Nvn-bc/assets/165442723/2fb3e6c8-c510-4cf8-85e2-25331d66a5c5)

![image](https://github.com/nvn-jajapur/Nvn-bc/assets/165442723/eb0cb01c-6af1-455c-9760-d40f043c4713)


![image](https://github.com/nvn-jajapur/Nvn-bc/assets/165442723/32d06f17-78a6-4f4a-a8cc-0de901153226)





### Suggesting Enhancements
New ideas and suggestions are always welcome. Feel free to open an issue to suggest enhancements or new features.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Submitting Code
If you have developed a new feature or corrected a bug and would like to share it with the community:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Create a new Pull Request.


## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
or
You can also host your application on [Netlify](https://www.netlify.com/)

