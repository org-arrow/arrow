import { task } from "hardhat/config";
import { formatEther, parseEther } from "viem";

task("populate", "Populate a contract with data.").setAction(
  async (_, { viem }) => {
    const contract = await viem.getContractAt(
      "Subscription",
      "0xa9124a6a8d67e0ed14c04f63348a9241529233a7"
    );

    // Create Netflix service
    const tx1 = await contract.write.createService([
      "Netflix",
      "Subscription-based streaming service",
      "https://logo.clearbit.com/netflix.com",
      parseEther("14"), // Monthly subscription price in USD
      BigInt(30), // Subscription duration in days
      true,
    ]);

    console.log(tx1);
    // Create Amazon Prime service
    const tx0 = await contract.write.createService([
      "Amazon Prime",
      "Subscription service offered by Amazon",
      "https://logo.clearbit.com/amazon.com",
      parseEther("119"), // Annual subscription price in USD
      BigInt(365), // Subscription duration in days
      true,
    ]);

    console.log(tx0);

    // Create Gmail service
    const tx2 = await contract.write.createService([
      "Spotify",
      "Subscription-based music streaming service",
      "https://logo.clearbit.com/spotify.com",
      parseEther("10"), // Gmail is free
      BigInt(0), // No subscription duration for free services
      true,
    ]);

    console.log(tx2);
  }
);
