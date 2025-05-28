// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // Interface for ERC721
// import "@openzeppelin/contracts/utils/math/SafeMath.sol"; // Safe arithmetic - REMOVED
import "@openzeppelin/contracts/utils/Address.sol"; // For sending Ether safely

contract Marketplace {
    // using SafeMath for uint256; // REMOVED, not needed in Solidity 0.8+
    using Address for address payable;

    // State variables to store listings
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContractAddress;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    // Mapping from listingId to Listing struct
    mapping(uint256 => Listing) public listings;

    // Counter for listing IDs
    uint256 private _nextListingId;

    // Events to signal when a listing is created, sold, or cancelled
    event ListingCreated(uint256 listingId, address seller, address nftContractAddress, uint256 tokenId, uint256 price);
    event ItemSold(uint256 listingId, address buyer, uint256 price);
    event ListingCancelled(uint256 listingId, address seller);

    // Function to list an NFT for sale
    function listNFT(
        address _nftContractAddress,
        uint256 _tokenId,
        uint256 _price
    ) public {
        // Require the price to be greater than zero
        require(_price > 0, "Price must be greater than zero");

        // Get the ERC721 token contract instance
        IERC721 nftContract = IERC721(_nftContractAddress);

        // Require that the caller owns the token
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Caller is not the owner of the token");

        // Require that the seller has approved this marketplace contract to transfer the token
        // The marketplace needs approval to move the NFT from the seller to the buyer during a sale
        require(nftContract.getApproved(_tokenId) == address(this), "Marketplace not approved to transfer the token");

        // Create the new listing
        uint256 listingId = _nextListingId++;
        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            nftContractAddress: _nftContractAddress,
            tokenId: _tokenId,
            price: _price,
            active: true
        });

        // Emit an event
        emit ListingCreated(listingId, msg.sender, _nftContractAddress, _tokenId, _price);
    }

    // Function to buy a listed NFT
    function buyNFT(uint256 _listingId) public payable {
        // Get the listing details
        Listing storage listing = listings[_listingId];

        // Require that the listing exists and is active
        require(listing.active, "Listing does not exist or is not active");

        // Require that the buyer is not the seller
        require(listing.seller != msg.sender, "Cannot buy your own listing");

        // Require that the correct amount of Ether is sent
        require(msg.value == listing.price, "Incorrect amount of Ether sent");

        // Mark the listing as inactive *before* transferring tokens/ether to prevent reentrancy
        listing.active = false;

        // Get an instance of the NFT contract
        IERC721 nftContract = IERC721(listing.nftContractAddress);

        // Transfer the NFT from the seller to the buyer
        // Use safeTransferFrom to ensure the recipient can receive ERC721 tokens
        nftContract.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // Transfer the Ether from the buyer to the seller
        // Use call.value to send Ether safely
        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Ether transfer failed");

        // Emit an event
        emit ItemSold(_listingId, msg.sender, msg.value);
    }

    // Function to cancel a listing
    function cancelListing(uint256 _listingId) public {
        // Get the listing details
        Listing storage listing = listings[_listingId];

        // Require that the listing exists and is active
        require(listing.active, "Listing does not exist or is not active");

        // Require that the caller is the seller of the listing
        require(listing.seller == msg.sender, "Caller is not the seller of the listing");

        // Mark the listing as inactive
        listing.active = false;

        // Emit an event
        emit ListingCancelled(_listingId, msg.sender);
    }
} 