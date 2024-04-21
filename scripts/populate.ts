import { task } from "hardhat/config";
import { parseEther } from "viem";

task("populate", "Populate a contract with data.").setAction(
  async (_, { viem }) => {
    const contract = await viem.getContractAt(
      "Subscription",
      "0x521ce7be92a14b0e344a3f58514642b842b54948"
    );

    const tx0 = await contract.write.createService([
      "Netflix",
      "Subscription-based streaming service",
      "netflix.com",
      parseEther("14.99"),
      BigInt(30),
      true,
    ]);

    console.log(tx0);

    // Sleep for 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    const tx1 = await contract.write.createService([
      "Amazon Prime",
      "Subscription service offered by Amazon",
      "amazon.com",
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
      "spotify.com",
      parseEther("9.99"),
      BigInt(30),
      true,
    ]);

    console.log(tx2);
  }
);