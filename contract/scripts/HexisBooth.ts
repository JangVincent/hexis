import hre from "hardhat";
import { vars } from "hardhat/config";
import { createWalletClient, erc20Abi, http, maxUint256 } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { TEST_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "../config/test";

async function testInstantSale() {
  const USER_PRIVATE_KEY = vars.get("USER_PRIVATE_KEY") as `0x${string}`;
  const ADMIN_PRIVATE_KEY = vars.get("ADMIN_PRIVATE_KEY") as `0x${string}`;

  const userAccount = privateKeyToAccount(USER_PRIVATE_KEY);
  const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const publicClient = await hre.viem.getPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const contract = await hre.viem.getContractAt(
    "HexisBooth",
    TEST_CONTRACT_ADDRESS,
  );

  const price = await contract.read.price();
  const isSaleStarted = await contract.read.saleStarted();

  // Test instant sale
  console.log("- FEE_RECEIVER:", await contract.read.FEE_RECEIVER());
  console.log("- PREVIEW:", await contract.read.previewText());
  console.log("- CURRENT SALE TYPE:", await contract.read.currentSaleType());
  console.log("- PRICE: ", price);
  console.log("- OWNER", await contract.read.owner());
  console.log("- IS SALE START", isSaleStarted);

  // start sale
  if (!isSaleStarted) {
    console.log("- Starting sale...");
    const startSaleHash = await contract.write.startSale({
      account: adminAccount,
    });

    await publicClient.waitForTransactionReceipt({
      hash: startSaleHash,
    });

    console.log("- Transaction hash:", startSaleHash);
  }

  // Simulate a purchase
  const hash = await contract.write.buyInstant({
    account: userAccount,
    value: price,
  });

  console.log("- Transaction hash:", hash);

  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  console.log("- Transaction receipt:", receipt.transactionHash);

  // WITHDRAW FUNDS
  const withdrawHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Withdraw transaction hash:", withdrawHash);

  const withdrawReceipt = await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });

  console.log(
    "- Withdraw transaction receipt:",
    withdrawReceipt.transactionHash,
  );
}

async function main() {
  const USER_PRIVATE_KEY = vars.get("USER_PRIVATE_KEY") as `0x${string}`;
  const ADMIN_PRIVATE_KEY = vars.get("ADMIN_PRIVATE_KEY") as `0x${string}`;

  const userAccount = privateKeyToAccount(USER_PRIVATE_KEY);
  const adminAccount = privateKeyToAccount(ADMIN_PRIVATE_KEY);

  const publicClient = await hre.viem.getPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const contract = await hre.viem.getContractAt(
    "HexisBooth",
    "0x639A2E9DFe8cEfeCE35a79565E1D6A65fc9C6d0e",
  );

  const price = await contract.read.price();

  console.log("- PRICE:", price);
  
  // start sale
  const startSaleHash = await contract.write.startSale({
    account: adminAccount,
  });

  await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });

  console.log("- Transaction hash:", startSaleHash);

  // approve USDT for purchase
  const userWallet = createWalletClient({
    account: userAccount,
    chain: sepolia,
    transport: http(),
  })

  const approveHash = await userWallet.writeContract({
    abi: erc20Abi,
    address: USDT_CONTRACT_ADDRESS,
    functionName: 'approve',
    args: ['0x639A2E9DFe8cEfeCE35a79565E1D6A65fc9C6d0e', 
      10000000000n
    ],
    chain: sepolia,
  })

  console.log("- Approve transaction hash:", approveHash);

  const approveReceipt = await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });


  // Simulate a purchase
  const buyTx = await contract.write.buyInstant({
    value: 0n
  })

  console.log("- Buy transaction hash:", buyTx);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
