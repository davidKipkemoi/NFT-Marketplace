import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";
// Removed viem imports - using ethers equivalents instead
// import { getAddress, parseGwei } from "viem";

// Import the generated contract type
import { Lock } from "../typechain-types";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

    // Use ethers.utils.parseEther or parseUnits instead of viem.parseGwei
    // Using parseEther("1") as an example, adjust if the locked amount should be different
    // Corrected to use ethers.parseEther for Ethers v6 compatibility
    const lockedAmount = hre.ethers.parseEther("1");
    const unlockTime = BigInt((await time.latest()) + ONE_YEAR_IN_SECS);

    // Use ethers.getSigners() instead of hre.viem.getWalletClients()
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // Use ethers.getContractFactory and deploy to deploy the contract
    // Use the imported contract type for better type safety
    const LockFactory = await hre.ethers.getContractFactory("Lock");
    const lock = await LockFactory.deploy(unlockTime, { value: lockedAmount }) as Lock; // Cast to Lock type

    // Ethers contracts are already connected to a provider/signer
    // No direct equivalent of publicClient needed for basic interactions in tests

    return {
      lock,
      unlockTime,
      lockedAmount,
      owner,
      otherAccount,
      // publicClient, // Not needed with ethers for these tests
    };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

      // Use ethers contract methods to read state
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);

      // Compare addresses directly
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      // Use provider to get balance - Corrected to use lock.target
      expect(
        await hre.ethers.provider.getBalance(lock.target)
      ).to.equal(lockedAmount);
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the fixture here because we want a different deployment
      const latestTime = BigInt(await time.latest());
      const LockFactory = await hre.ethers.getContractFactory("Lock");

      // Use expect(...).to.be.revertedWith from @nomicfoundation/hardhat-toolbox
      await expect(
        LockFactory.deploy(latestTime, {
          value: 1n,
        })
      ).to.be.revertedWith("Unlock time should be in the future");
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        // Use expect(...).to.be.revertedWith
        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // Connect the lock contract with the other account's signer
        const lockAsOtherAccount = lock.connect(otherAccount);

        // Use expect(...).to.be.revertedWith
        await expect(lockAsOtherAccount.withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        // Use expect(...).to.be.not.reverted
        await expect(lock.withdraw()).to.be.not.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } =
          await loadFixture(deployOneYearLockFixture);

        await time.increaseTo(unlockTime);

        // Call the withdraw function and wait for the transaction to be mined
        const tx = await lock.withdraw();
        await tx.wait(); // Wait for the transaction receipt

        // Get events from the contract instance after the transaction
        // This is the recommended way in Ethers v6
        const withdrawalEvents = await lock.queryFilter(lock.filters.Withdrawal(), "latest"); // Filter in the latest block

        expect(withdrawalEvents).to.have.lengthOf(1);
        // Accessing args in Ethers v6 is slightly different - check for existence before accessing
        const withdrawalEvent = withdrawalEvents[0];
        expect(withdrawalEvent.args).to.exist; // Ensure args exist
        // Check event arguments - adjust based on your Withdrawal event parameters
        // Assuming your Withdrawal event is `event Withdrawal(uint256 amount, uint256 when);`
        expect(withdrawalEvent.args.amount).to.equal(lockedAmount);
        // We might also check withdrawalEvent.args.when if applicable
      });
    });
  });
});
