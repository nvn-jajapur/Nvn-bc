// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint id;
        address payable seller;
        address payable owner;
        string title;
        string description;
        string imageHash;
        uint price;
        bool sold;
    }

    Product[] public products;
    uint public productCount;
    
    //Method Declarations for transactions of products
    event productSold(uint indexed productId, address indexed buyer,address indexed seller, uint price);
    event paymentOfProduct(address indexed fromAddress, address indexed toAddress,uint256 value);
    event productListed(uint indexed productId, address indexed seller, string title, string imageHash, uint price);
   

    // Function for adding a product to the List
    function listProduct(string memory _title, string memory _description, string memory _imageHash, uint _price) public {
        require(_price > 0, "Value of Product must be greater than zero");

        Product memory productToBeAdded = Product({
            id: productCount,
            seller: payable(msg.sender),
            owner : payable (msg.sender),
            title: _title,
            description: _description,
            imageHash: _imageHash,
            price: _price,
            sold: false
        });
        products.push(productToBeAdded);
        emit productListed(productCount, msg.sender, _title, _imageHash, _price);
        productCount++;
    }

    // Function call for purchasing the product
    function purchaseProduct(uint _id) external payable {
    require(_id < productCount, "Item ID does not exist");
    Product storage selectedProduct = products[_id];
    require(msg.value == selectedProduct.price, "Incorrect amount, please send the exact price");
    require(!selectedProduct.sold, "Item is already sold");
    require(msg.sender != selectedProduct.owner, "Item owner cannot purchase their own item");

    (bool transferred, ) = selectedProduct.owner.call{value: msg.value}("");
    require(transferred, "Ether transfer failed");

    // Assigning the ownership from seller to buyer
    address previousOwner = selectedProduct.owner;  
    selectedProduct.owner = payable(msg.sender);   
    selectedProduct.sold = true;                   

    // Log transactions
    emit paymentOfProduct(msg.sender, previousOwner, msg.value);
    emit productSold(_id, previousOwner, msg.sender, selectedProduct.price);
}




    // Get Function call to retrieve all the products available
    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    // Get Function call to retrieve a product by an ID
    function getProductById(uint _id) public view returns (Product memory) {
        require(_id < productCount, "Product ID does not exist");
        return products[_id];
    }
}
