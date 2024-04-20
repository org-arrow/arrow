import { task } from "hardhat/config";
import { parseEther } from "viem";

task("populate", "Populate a contract with data.").setAction(
  async (_, { viem }) => {
    const contract = await viem.getContractAt(
      "Subscription",
      "0x23e9603da9935efa6bec71cf744a47c3e8522be6"
    );

    const tx0 = await contract.write.createService([
      "Netflix",
      "Subscription-based streaming service",
      "https://logo.clearbit.com/netflix.com",
      parseEther("14.99"),
      BigInt(30),
      true,
    ]);

    console.log(tx0);

    // Sleep for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    const tx1 = await contract.write.createService([
      "Amazon Prime",
      "Subscription service offered by Amazon",
      "https://logo.clearbit.com/amazon.com",
      parseEther("119.95"),
      BigInt(365),
      true,
    ]);

    console.log(tx1);

    // Sleep for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    const tx2 = await contract.write.createService([
      "Spotify",
      "Subscription-based music streaming service",
      "https://logo.clearbit.com/spotify.com",
      parseEther("9.99"),
      BigInt(0),
      true,
    ]);

    console.log(tx2);
  }
);