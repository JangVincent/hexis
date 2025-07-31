import hre from "hardhat";
import "@nomicfoundation/hardhat-verify";
import { Etherscan } from "@nomicfoundation/hardhat-verify/etherscan";

import { formatEther, Hex, parseEther } from "viem";
import { adminAccount, userAccount } from "../lib/account";
import { deployBooth } from "./HexisBooth";
import { adminWallet, publicClient } from "../lib/client";
import { deployToken, mintTestTokens } from "./TestToken";
import { calculateTxFee, sleep } from "../lib/util";
import { PaymentOption, SaleType } from "../lib/shared";

const sleepSeconds = 5;

const deployedTestTokenAddress: Hex | undefined =
  "0x45081e24fE95dEa81a56d80487825524c8ad6c69";

async function testBoothInstantSaleNative({
  contractAddress,
}: {
  contractAddress: Hex;
}) {
  // Deploying the HexisBooth contract with Instant Sale Native payment option
  console.group("◇ Contract Deployment");

  const contract = await hre.viem.getContractAt("HexisBooth", contractAddress);

  console.log("- Deployed HexisBooth (Instant Sale Native):", contract.address);

  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("◇ Starting Sale");

  const startSaleHash = await contract.write.startSale();

  console.log("- Sale started:", startSaleHash);

  console.log("- Sale started successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("◇ User Purchase (Instant Sale Native)");

  const fundHash = await adminWallet.sendTransaction({
    to: userAccount.address,
    value: parseEther("0.001"),
  });

  const receiptFund = await publicClient.waitForTransactionReceipt({
    hash: fundHash,
  });

  calculateTxFee(receiptFund);

  console.log("- User account funded:", fundHash);

  const purchaseHash = await contract.write.buyInstant({
    account: userAccount,
    value: parseEther("0.001"),
  });

  console.log("- User purchase initiated:", purchaseHash);

  const receiptPurchase = await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  calculateTxFee(receiptPurchase);

  console.log("- User purchase completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("◇ Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  // Showing the contract balance after purchase
  console.group("◇ Contract Balance");
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
  console.group("◇ Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);

  const receiptCheckout = await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  calculateTxFee(receiptCheckout);

  console.log("- Admin check out completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("◇ Contract Balance After Check Out");
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
  console.group("◇ Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  const receiptWithdraw = await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });

  calculateTxFee(receiptWithdraw);
  console.log("- Admin withdraw completed successfully");
}

async function testBoothInstantSaleERC20({
  contractAddress,
}: {
  contractAddress: Hex;
}) {
  console.group("◇ Deploy Test ERC20 Token");
  const token = await deployToken(deployedTestTokenAddress);
  console.log("- Deployed Test Token:", token.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("◇ Mint 100 Test Tokens to User Account");
  const decimals = await token.read.decimals();
  const mintHash = await mintTestTokens({
    contractAddress: token.address,
    recipientAddress: userAccount.address,
    amount: BigInt(1000 * 10 ** decimals),
  });
  const receiptMint = await publicClient.waitForTransactionReceipt({
    hash: mintHash,
  });

  calculateTxFee(receiptMint);

  console.log("- Minted Test Tokens to User Account:", mintHash);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("◇ User Account Balance");
  const userBalance = await token.read.balanceOf([userAccount.address]);
  console.log("- User Account Balance:", formatEther(userBalance) + " Tokens");
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("◇ Deploy HexisBooth with Instant Sale ERC20");
  const contract = await hre.viem.getContractAt("HexisBooth", contractAddress);

  console.log("- Deployed HexisBooth (Instant Sale ERC20):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("◇ Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  const startSaleReceipt = await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });

  calculateTxFee(startSaleReceipt);
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("◇ Approving Tokens for Purchase");
  const approveHash = await token.write.approve(
    [contract.address, BigInt(100 * 10 ** decimals)],
    {
      account: userAccount,
    },
  );

  console.log("- Tokens approved for purchase:", approveHash);
  const receiptApprove = await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });

  calculateTxFee(receiptApprove);

  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("◇ User Purchase (Instant Sale ERC20)");
  const purchaseHash = await contract.write.buyInstant({
    account: userAccount,
    value: 0n,
  });
  console.log("- User purchase initiated:", purchaseHash);
  const receiptPurchase = await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });
  calculateTxFee(receiptPurchase);
  console.log("- User purchase completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("◇ Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Showing the contract balance after purchase
  console.group("◇ Contract Balance");
  const balance = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after purchase:",
    Number(balance) / 10 ** decimals + " Tokens",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("◇ Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);
  const receiptCheckout = await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });
  calculateTxFee(receiptCheckout);
  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("◇ Contract Balance After Check Out");
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
  console.group("◇ Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  const receiptWithdraw = await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });

  calculateTxFee(receiptWithdraw);
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function testBoothRequestSaleNative({
  contractAddress,
}: {
  contractAddress: Hex;
}) {
  console.group("◇ Contract Deployment");
  const contract = await hre.viem.getContractAt("HexisBooth", contractAddress);
  console.log("- Deployed HexisBooth (Request Sale Native):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("◇ Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  const receiptStartSale = await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });
  calculateTxFee(receiptStartSale);
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Fund the user account with enough ETH to cover the purchase
  const fundHash = await adminWallet.sendTransaction({
    to: userAccount.address,
    value: parseEther("0.00015"),
  });

  await publicClient.waitForTransactionReceipt({
    hash: fundHash,
  });

  // Testing user purchase
  console.group("◇ User Request Purchase (Request Sale Native)");
  const requestHash = await contract.write.requestPurchase(
    [
      "Hello, I want to buy this item! My telegram handle is @example, please contact me.",
    ],
    {
      account: userAccount,
    },
  );
  console.log("- User request purchase initiated:", requestHash);
  const receiptRequest = await publicClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  calculateTxFee(receiptRequest);

  console.log("- User request purchase completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Need to add server-side logic to save approval requests from users

  // Admin approves the request
  console.group("◇ Admin Approve Request");
  const approveHash = await contract.write.approveRequest(
    [userAccount.address],
    {
      account: adminAccount,
    },
  );

  console.log("- Admin approve request initiated:", approveHash);

  const receiptApprove = await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });

  calculateTxFee(receiptApprove);

  console.log("- Admin approve request completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // User buys the content after approval
  console.group("◇ User Buy Content After Approval (Request Sale Native)");
  const purchaseHash = await contract.write.buyApproved({
    account: userAccount,
    value: parseEther("0.0001"),
  });

  console.log("- User buy content after approval initiated:", purchaseHash);
  const receiptPurchase = await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  calculateTxFee(receiptPurchase);

  console.log("- User buy content after approval completed successfully");

  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("◇ Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  // Showing the contract balance after purchase
  console.group("◇ Contract Balance");
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
  console.group("◇ Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);

  const receiptCheckout = await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  calculateTxFee(receiptCheckout);

  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("◇ Contract Balance After Check Out");
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
  console.group("◇ Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);

  const receiptWithdraw = await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });

  calculateTxFee(receiptWithdraw);
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function testBoothRequestSaleERC20({
  contractAddress,
}: { contractAddress: Hex }) {
  console.group("◇ Deploying Test Token");
  const token = await deployToken(deployedTestTokenAddress);
  console.log("- Deployed Test Token:", token.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  console.group("◇ Minting Test Tokens to User Account");
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

  console.group("◇ Testing HexisBooth Request Sale ERC20");
  const contract = await hre.viem.getContractAt("HexisBooth", contractAddress);

  console.log("- Deployed HexisBooth (Request Sale ERC20):", contract.address);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing the startSale function
  console.group("◇ Starting Sale");
  const startSaleHash = await contract.write.startSale();
  console.log("- Sale started:", startSaleHash);
  const receiptStartSale = await publicClient.waitForTransactionReceipt({
    hash: startSaleHash,
  });
  calculateTxFee(receiptStartSale);
  console.log("- Sale started successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Testing user purchase
  console.group("◇ User Request Purchase (Request Sale ERC20)");
  const requestHash = await contract.write.requestPurchase(
    [
      "Hello, I want to buy this item! My telegram handle is @example, please contact me.",
    ],
    {
      account: userAccount,
    },
  );

  console.log("- User request purchase initiated:", requestHash);
  const receiptRequest = await publicClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  calculateTxFee(receiptRequest);

  console.log("- User request purchase completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Approve token for purchase
  console.group("◇ Approving Tokens for Purchase");
  const tokenApproveHash = await token.write.approve(
    [contract.address, BigInt(100 * 10 ** decimals)],
    {
      account: userAccount,
    },
  );
  console.log("- Tokens approved for purchase:", tokenApproveHash);
  const receiptApprove = await publicClient.waitForTransactionReceipt({
    hash: tokenApproveHash,
  });
  calculateTxFee(receiptApprove);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Need to add server-side logic to save approval requests from users

  // Admin approves the request
  console.group("◇ Admin Approve Request");
  const approveHash = await contract.write.approveRequest(
    [userAccount.address],
    {
      account: adminAccount,
    },
  );

  console.log("- Admin approve request initiated:", approveHash);
  const receiptAdminApprove = await publicClient.waitForTransactionReceipt({
    hash: approveHash,
  });
  calculateTxFee(receiptAdminApprove);

  console.log("- Admin approve request completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // User buys the content after approval
  console.group("◇ User Buy Content After Approval (Request Sale ERC20)");
  const purchaseHash = await contract.write.buyApproved({
    account: userAccount,
    value: 0n,
  });

  console.log("- User buy content after approval initiated:", purchaseHash);
  const receiptPurchase = await publicClient.waitForTransactionReceipt({
    hash: purchaseHash,
  });

  calculateTxFee(receiptPurchase);

  console.log("- User buy content after approval completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Checking the purchase
  console.group("◇ Checking Purchase");
  const hasAccess = await contract.read.hasAccess([userAccount.address]);
  console.log("- User address:", userAccount.address);
  console.log("- User has access?:", hasAccess);
  console.groupEnd();

  await sleep(sleepSeconds);

  // Showing the contract balance after purchase
  console.group("◇ Contract Balance");
  const balance = await token.read.balanceOf([contract.address]);
  console.log(
    "- Contract balance after purchase:",
    Number(balance) / 10 ** decimals + " Tokens",
  );
  console.groupEnd();

  await sleep(sleepSeconds);

  // Admin Check out
  console.group("◇ Admin Check Out");
  const checkOutHash = await contract.write.checkOut({
    account: adminAccount,
  });

  console.log("- Admin check out initiated:", checkOutHash);
  const receiptCheckout = await publicClient.waitForTransactionReceipt({
    hash: checkOutHash,
  });

  calculateTxFee(receiptCheckout);

  console.log("- Admin check out completed successfully");
  console.groupEnd();

  await sleep(sleepSeconds);

  // Check balance after check out
  console.group("◇ Contract Balance After Check Out");
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
  console.group("◇ Admin Withdraw Funds");
  const withdrawHash = await contract.write.withdraw({
    account: adminAccount,
  });
  console.log("- Admin withdraw initiated:", withdrawHash);
  const receiptWithdraw = await publicClient.waitForTransactionReceipt({
    hash: withdrawHash,
  });

  calculateTxFee(receiptWithdraw);
  console.log("- Admin withdraw completed successfully");
  console.groupEnd();
}

async function deployFactoryContract({
  deployedContractAddress,
  templateContractAddress,
}: {
  deployedContractAddress?: Hex;
  templateContractAddress: Hex;
}) {
  if (deployedContractAddress) {
    console.log("- Deployed HexisFactory:", deployedContractAddress);
    return await hre.viem.getContractAt(
      "HexisFactory",
      deployedContractAddress,
    );
  }

  console.log("Running Factory Tests...");
  const contract = await hre.viem.deployContract("HexisFactory", [
    templateContractAddress,
    adminAccount.address,
  ]);

  console.log("- Deployed HexisFactory:", contract.address);

  return await hre.viem.getContractAt("HexisFactory", contract.address);
}

async function deployTemplateContract({
  deployedContractAddress,
}: {
  deployedContractAddress?: Hex;
}) {
  if (deployedContractAddress) {
    console.log("- Deployed HexisBooth:", deployedContractAddress);
    return await hre.viem.getContractAt("HexisBooth", deployedContractAddress);
  }

  console.log("Running Template Tests...");
  const contract = await hre.viem.deployContract("HexisBooth");

  console.log("- Deployed HexisBooth:", contract.address);

  return await hre.viem.getContractAt("HexisBooth", contract.address);
}

async function main() {
  console.log(`${"═".repeat(5)} Running Hexis Factory Tests ${"═".repeat(5)}`);
  const templateContract = await deployTemplateContract({});

  console.log(`${"═".repeat(5)} Running Hexis Factory Tests ${"═".repeat(5)}`);
  const factoryContract = await deployFactoryContract({
templateContractAddress: templateContract.address,
  });

  console.log(
    `${"═".repeat(5)} Testing HexisBooth Instant Sale Native ${"═".repeat(5)}`,
  );

  const instantSaleNativeBooth = await deployBooth(factoryContract.address, {
    ownerAddress: adminAccount.address,
    previewText: "Test Booth Instant Sale Native",
    price: parseEther("0.001"),
    saleType: SaleType.InstantSale,
    paymentOption: PaymentOption.NativeCurrency,
  });

  await testBoothInstantSaleNative({
    contractAddress: instantSaleNativeBooth.address,
  });

  console.log(
    `${"═".repeat(5)} Testing HexisBooth Instant Sale ERC20 ${"═".repeat(5)}`,
  );
  const instantSaleERC20Booth = await deployBooth(factoryContract.address, {
    ownerAddress: adminAccount.address,
    previewText: "Test Booth Instant Sale ERC20",
    price: BigInt(100 * 10 ** 18), // 100 Tokens
    saleType: SaleType.InstantSale,
    paymentOption: PaymentOption.ERC20Token,
    paymentTokenAddress: "0x45081e24fE95dEa81a56d80487825524c8ad6c69", // Deployed Test Token Address
  });

  await testBoothInstantSaleERC20({
    contractAddress: instantSaleERC20Booth.address,
  });

  console.log(
    `${"═".repeat(5)} Testing HexisBooth Request Sale Native ${"═".repeat(5)}`,
  );
  const requestSaleNativeBooth = await deployBooth(factoryContract.address, {
    ownerAddress: adminAccount.address,
    previewText: "Test Booth Request Sale Native",
    price: parseEther("0.0001"),
    saleType: SaleType.RequestSale,
    paymentOption: PaymentOption.NativeCurrency,
  });

  await testBoothRequestSaleNative({
    contractAddress: requestSaleNativeBooth.address,
  });

  console.log(
    `${"═".repeat(5)} Testing HexisBooth Request Sale ERC20 ${"═".repeat(5)}`,
  );
  const requestSaleERC20Booth = await deployBooth(factoryContract.address, {
    ownerAddress: adminAccount.address,
    previewText: "Test Booth Request Sale ERC20",
    price: BigInt(100 * 10 ** 18), // 100 Tokens
    saleType: SaleType.RequestSale,
    paymentOption: PaymentOption.ERC20Token,
    paymentTokenAddress: "0x45081e24fE95dEa81a56d80487825524c8ad6c69", // Deployed Test Token Address
  });

  await testBoothRequestSaleERC20({
    contractAddress: requestSaleERC20Booth.address,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(`${"=".repeat(5)} ERROR ${"=".repeat(5)}`);
    console.error(error);
    process.exit(1);
  });
