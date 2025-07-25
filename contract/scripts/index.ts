import { formatEther, Hex, parseEther } from "viem";
import { adminAccount, userAccount } from "../lib/account";
import {
  deployBoothInstantSaleERC20,
  deployBoothInstantSaleNative,
  deployBoothRequestSaleERC20,
  deployBoothRequestSaleNative,
} from "./HexisBooth";
import { adminWallet, publicClient } from "../lib/client";
import { deployToken, mintTestTokens } from "./TestToken";
import { sleep } from "../lib/util";

const sleepSeconds = 6;

const deployedTestTokenAddress: Hex | undefined =
  "0x45081e24fE95dEa81a56d80487825524c8ad6c69";

async function testBoothInstantSaleNative() {
  // Deploying the HexisBooth contract with Instant Sale Native payment option
  console.group("Contract Deployment");

  const contract = await deployBoothInstantSaleNative({
    ownerAddress: adminAccount.address,
    previewText: "deployBoothInstantSaleERC20",
    price: parseEther("0.001"),
  });

  console.log("- Deployed HexisBooth (Instant Sale Native):", contract.address);

  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("Starting Sale");

  const startSaleHash = await contract.write.startSale();

  console.log("- Sale started:", startSaleHash);

  await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });

  console.log("- Sale started successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("User Purchase (Instant Sale Native)");

  const fundHash = await adminWallet.sendTransaction({
    to: userAccount.address,
    value: parseEther("0.001"),
  });

  await publicClient.waitForTransactionReceipt({
    hash: fundHash,
  });

  console.log("- User account funded:", fundHash);

  const purchaseHash = await contract.write.buyInstant({
    account: userAccount,
    value: parseEther("0.001"),
  });

  console.log("- User purchase initiated:", purchaseHash);

  await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  console.log("- User purchase completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  // Showing the contract balance after purchase
  console.group("Contract Balance");
  const balance = await publicClient.getBalance({
    address: contract.address,
  });

  console.log(
    "- Contract balance after purchase:",
    formatEther(balance) + " ETH",
  );

  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);

  await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  console.log("- Admin check out completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("Contract Balance After Check Out");
  const balanceAfterCheckOut = await publicClient.getBalance({
    address: contract.address,
  });
  console.log(
    "- Contract balance after check out:",
    formatEther(balanceAfterCheckOut) + " ETH",
  );
  console.log(
    "- Difference in balance:",
    formatEther(balance - balanceAfterCheckOut) + " ETH",
  );

  console.log(
    "- Fee rate:",
    (parseFloat(formatEther(balance - balanceAfterCheckOut)) /
      parseFloat(formatEther(balance))) *
      100 +
      "%",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Withdraw funds by admin
  console.group("Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });
  console.log("- Admin withdraw completed successfully");
}

async function testBoothInstantSaleERC20() {
  console.group("Deploy Test ERC20 Token");
  const token = await deployToken(deployedTestTokenAddress);
  console.log("- Deployed Test Token:", token.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("Mint 100 Test Tokens to User Account");
  const decimals = await token.read.decimals();
  const mintHash = await mintTestTokens({
    contractAddress: token.address,
    recipientAddress: userAccount.address,
    amount: BigInt(1000 * 10 ** decimals),
  });
  await publicClient.waitForTransactionReceipt({
    hash: mintHash,
  });
  console.log("- Minted Test Tokens to User Account:", mintHash);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("User Account Balance");
  const userBalance = await token.read.balanceOf([userAccount.address]);
  console.log("- User Account Balance:", formatEther(userBalance) + " Tokens");
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("Deploy HexisBooth with Instant Sale ERC20");
  const contract = await deployBoothInstantSaleERC20({
    ownerAddress: adminAccount.address,
    previewText: "deployBoothInstantSaleERC20",
    price: BigInt(100 * 10 ** decimals), // 100 Token
    paymentTokenAddress: token.address,
  });

  console.log("- Deployed HexisBooth (Instant Sale ERC20):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("Approving Tokens for Purchase");
  const approveHash = await token.write.approve(
    [contract.address, BigInt(100 * 10 ** decimals)],
    {
      account: userAccount,
    },
  );

  console.log("- Tokens approved for purchase:", approveHash);
  await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });

  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("User Purchase (Instant Sale ERC20)");
  const purchaseHash = await contract.write.buyInstant({
    account: userAccount,
    value: 0n,
  });
  console.log("- User purchase initiated:", purchaseHash);
  await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });
  console.log("- User purchase completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Showing the contract balance after purchase
  console.group("Contract Balance");
  const balance = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after purchase:",
    Number(balance) / 10 ** decimals + " Tokens",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);
  await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });
  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("Contract Balance After Check Out");
  const balanceAfterCheckOut = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after check out:",
    Number(balanceAfterCheckOut) / 10 ** decimals + " Tokens",
  );
  console.log(
    "- Difference in balance:",
    (Number(balance) - Number(balanceAfterCheckOut)) / 10 ** decimals +
      "Tokens",
  );
  console.log(
    "- Fee rate:",
    ((Number(balance) - Number(balanceAfterCheckOut)) / Number(balance)) * 100 +
      "%",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Withdraw funds by admin
  console.group("Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function testBoothRequestSaleNative() {
  console.group("Contract Deployment");
  const contract = await deployBoothRequestSaleNative({
    ownerAddress: adminAccount.address,
    previewText: "deployBoothRequestSaleNative",
    price: parseEther("0.0001"),
  });
  console.log("- Deployed HexisBooth (Request Sale Native):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("User Request Purchase (Request Sale Native)");
  const requestHash = await contract.write.requestPurchase(
    [
      "Hello, I want to buy this item! My telegram handle is @example, please contact me.",
    ],
    {
      account: userAccount,
    },
  );

  // Fund the user account with enough ETH to cover the purchase
  const fundHash = await adminWallet.sendTransaction({
    to: userAccount.address,
    value: parseEther("0.00015"),
  });
  await publicClient.waitForTransactionReceipt({
    hash: fundHash,
  });

  console.log("- User request purchase initiated:", requestHash);

  await publicClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  console.log("- User request purchase completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Need to add server-side logic to save approval requests from users

  // Admin approves the request
  console.group("Admin Approve Request");
  const approveHash = await contract.write.approveRequest(
    [userAccount.address],
    {
      account: adminAccount,
    },
  );

  console.log("- Admin approve request initiated:", approveHash);

  await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });

  console.log("- Admin approve request completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // User buys the content after approval
  console.group("User Buy Content After Approval (Request Sale Native)");
  const purchaseHash = await contract.write.buyApproved({
    account: userAccount,
    value: parseEther("0.0001"),
  });

  console.log("- User buy content after approval initiated:", purchaseHash);
  await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  console.log("- User buy content after approval completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  // Showing the contract balance after purchase
  console.group("Contract Balance");
  const balance = await publicClient.getBalance({
    address: contract.address,
  });
  console.log(
    "- Contract balance after purchase:",
    formatEther(balance) + " ETH",
  );

  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);

  await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("Contract Balance After Check Out");
  const balanceAfterCheckOut = await publicClient.getBalance({
    address: contract.address,
  });
  console.log(
    "- Contract balance after check out:",
    formatEther(balanceAfterCheckOut) + " ETH",
  );
  console.log(
    "- Difference in balance:",
    formatEther(balance - balanceAfterCheckOut) + " ETH",
  );
  console.log(
    "- Fee rate:",
    (parseFloat(formatEther(balance - balanceAfterCheckOut)) /
      parseFloat(formatEther(balance))) *
      100 +
      "%",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Withdraw funds by admin
  console.group("Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function testBoothRequestSaleERC20() {
  console.group("Deploying Test Token");
  const token = await deployToken(deployedTestTokenAddress);
  console.log("- Deployed Test Token:", token.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("Minting Test Tokens to User Account");
  const decimals = await token.read.decimals();
  const mintHash = await mintTestTokens({
    contractAddress: token.address,
    recipientAddress: userAccount.address,
    amount: BigInt(1000 * 10 ** decimals),
  });
  const userBalance = await token.read.balanceOf([userAccount.address]);
  await publicClient.waitForTransactionReceipt({
    hash: mintHash,
  });
  console.log("- Minted Test Tokens to User Account:", mintHash);
  console.log(
    "- User Account Balance:",
    Number(userBalance) / 10 ** decimals + " Tokens",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("Testing HexisBooth Request Sale ERC20");
  const contract = await deployBoothRequestSaleERC20({
    ownerAddress: adminAccount.address,
    previewText: "deployBoothRequestSaleERC20",
    price: BigInt(100 * 10 ** decimals), // 100 Token
    paymentTokenAddress: token.address,
  });

  console.log("- Deployed HexisBooth (Request Sale ERC20):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("User Request Purchase (Request Sale ERC20)");
  const requestHash = await contract.write.requestPurchase(
    [
      "Hello, I want to buy this item! My telegram handle is @example, please contact me.",
    ],
    {
      account: userAccount,
    },
  );

  console.log("- User request purchase initiated:", requestHash);
  await publicClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  console.log("- User request purchase completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Approve token for purchase
  console.group("Approving Tokens for Purchase");
  const tokenApproveHash = await token.write.approve(
    [contract.address, BigInt(100 * 10 ** decimals)],
    {
      account: userAccount,
    },
  );
  console.log("- Tokens approved for purchase:", tokenApproveHash);
  await publicClient.waitForTransactionReceipt({
    hash: tokenApproveHash,
  });
  console.groupEnd();

  await sleep(sleepSeconds);

  // Need to add server-side logic to save approval requests from users

  // Admin approves the request
  console.group("Admin Approve Request");
  const approveHash = await contract.write.approveRequest(
    [userAccount.address],
    {
      account: adminAccount,
    },
  );

  console.log("- Admin approve request initiated:", approveHash);
  await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });

  console.log("- Admin approve request completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // User buys the content after approval
  console.group("User Buy Content After Approval (Request Sale ERC20)");
  const purchaseHash = await contract.write.buyApproved({
    account: userAccount,
    value: 0n,
  });

  console.log("- User buy content after approval initiated:", purchaseHash);
  await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  console.log("- User buy content after approval completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Showing the contract balance after purchase
  console.group("Contract Balance");
  const balance = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after purchase:",
    Number(balance) / 10 ** decimals + " Tokens",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);
  await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("Contract Balance After Check Out");
  const balanceAfterCheckOut = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after check out:",
    Number(balanceAfterCheckOut) / 10 ** decimals + " Tokens",
  );
  console.log(
    "- Difference in balance:",
    (Number(balance) - Number(balanceAfterCheckOut)) / 10 ** decimals +
      " Tokens",
  );
  console.log(
    "- Fee rate:",
    ((Number(balance) - Number(balanceAfterCheckOut)) / Number(balance)) * 100 +
      "%",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Withdraw funds by admin
  console.group("Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function main() {
  console.log("Running HexisBooth tests...");

  await testBoothInstantSaleNative();
  await testBoothInstantSaleERC20();
  await testBoothRequestSaleNative();
  await testBoothRequestSaleERC20();

  console.log("HexisBooth tests completed successfully.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(`${"=".repeat(5)} ERROR ${"=".repeat(5)}`);
    console.error(error);
    process.exit(1);
  });
