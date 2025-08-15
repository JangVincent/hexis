import { BoothPaymentOption, BoothSaleType } from '@db/schema';

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
