import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// Removed Viem Address import
// import type { Address } from "viem"; // Import Address type from Viem

// Import the generated contract type
import { NFT } from "../typechain-types";

describe("NFT Contract", function () {
    // Define a fixture to deploy the NFT contract
    async function deployNFTFixture() {
        // Use ethers.getSigners() instead of hre.viem.getWalletClients()
        const [owner, otherAccount] = await hre.ethers.getSigners();

        // Get the contract factory for the NFT contract using Ethers
        const NFTFactory = await hre.ethers.getContractFactory("NFT");

        // Deploy the contract using Ethers
        // Use the imported contract type for better type safety
        const nft = await NFTFactory.deploy("My Awesome NFT", "MANFT", owner.address) as NFT; // Cast to NFT type

        // Return the deployed contract instance and the accounts
        return { nft, owner, otherAccount };
    }

    // Test case 1: Deployment
    it("Should deploy with the correct name and symbol", async function () {
        // Load the fixture to deploy the contract and get accounts
        const { nft } = await loadFixture(deployNFTFixture); // Use imported loadFixture

        // Assert the token name and symbol using the deployed contract instance
        // Use ethers contract methods to read state (await is needed)
        expect(await nft.name()).to.equal("My Awesome NFT");
        expect(await nft.symbol()).to.equal("MANFT");
    });

    // Test case 2: Minting (only owner should be able to mint)
    it("Should allow the owner to mint an NFT", async function () {
        const { nft, owner } = await loadFixture(deployNFTFixture); // Use imported loadFixture

        // Use owner.address directly instead of Viem Address type and owner.account.address
        const recipient = owner.address;
        const tokenURI = "ipfs://Qmb...Qm"; // Example URI

        // Call the mint function from the owner account (implicitly using the owner signer)
        // Use expect(...).to.not.be.reverted from @nomicfoundation/hardhat-toolbox
        await expect(nft.mint(recipient, tokenURI)).to.not.be.reverted;

        // Verify the owner of the minted token
        // Use BigInt for token ID with Ethers v6
        const mintedTokenId = 0n;
        // Use ethers contract methods to read state
        expect(await nft.ownerOf(mintedTokenId)).to.equal(recipient);

        // Verify the token URI
        // Use ethers contract methods to read state
        expect(await nft.tokenURI(mintedTokenId)).to.equal(tokenURI);
    });

    it("Should NOT allow other accounts to mint an NFT", async function () {
        const { nft, otherAccount } = await loadFixture(deployNFTFixture); // Use imported loadFixture

        // Use otherAccount.address directly
        const recipient = otherAccount.address;
        const tokenURI = "ipfs://Qmb...Qm";

        // Attempt to call the mint function from a non-owner account using connect()
        // Use expect(...).to.be.revertedWith from @nomicfoundation/hardhat-toolbox
        await expect(nft.connect(otherAccount).mint(recipient, tokenURI)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    // TODO: Add more tests for ownership transfer, approvals, etc.
}); 