export enum BoothSaleType {
  'INSTANT_SALE',
  'REQUEST_SALE',
}

export enum BoothPaymentOption {
  'NATIVE_CURRENCY',
  'ERC20_TOKEN',
}

export interface BoothCreated {
  id: string;
  blockNumber: string;
  blockTimestamp: string;
  boothAddress: string;
  owner: string;
  paymentOption: BoothPaymentOption;
  paymentTokenAddress: string;
  previewText: string;
  price: string;
  saleType: BoothSaleType;
  transactionHash: string;
}
