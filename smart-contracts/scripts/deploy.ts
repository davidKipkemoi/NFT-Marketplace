import hre from "hardhat";
// Removed unused import: import { Address } from "viem";

async function main() {
  // Use ethers.getSigners() instead of hre.viem.getWalletClients()
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address // Use deployer.address with Ethers signer
  );

  // Deploy the NFT contract
  // Use ethers.getContractFactory and deploy
  const NFTFactory = await hre.ethers.getContractFactory("NFT");
  const nft = await NFTFactory.deploy("My Awesome NFT", "MANFT", deployer.address);

  console.log("NFT contract deployed to:", nft.target); // Use nft.target with Ethers v6

  // Deploy the Marketplace contract
  // Use ethers.getContractFactory and deploy
  const MarketplaceFactory = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await MarketplaceFactory.deploy();

  console.log("Marketplace contract deployed to:", marketplace.target); // Use marketplace.target with Ethers v6

  // Note: In a real scenario, you would likely verify your contracts on Etherscan
  // after deployment, especially to a public network.
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 