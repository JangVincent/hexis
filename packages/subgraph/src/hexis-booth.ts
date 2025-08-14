import {
  ContentPurchased as ContentPurchasedEvent,
  FundsCheckedOut as FundsCheckedOutEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  PreviewTextUpdated as PreviewTextUpdatedEvent,
  PriceUpdated as PriceUpdatedEvent,
  PurchaseRequested as PurchaseRequestedEvent,
  RequestApproved as RequestApprovedEvent,
  SaleStarted as SaleStartedEvent,
  OwnershipHandoverCanceled as OwnershipHandoverCanceledEvent,
  OwnershipHandoverRequested as OwnershipHandoverRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from '../generated/templates/HexisBooth/HexisBooth';

import {
  Booth,
  ContentPurchased,
  FundsCheckedOut,
  FundsWithdrawn,
  PreviewTextUpdated,
  PriceUpdated,
  PurchaseRequested,
  RequestApproved,
  SaleStarted,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
} from '../generated/schema';

export function handleContentPurchased(event: ContentPurchasedEvent): void {
  let entity = new ContentPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.buyer = event.params.buyer;
  entity.amountPaid = event.params.amountPaid;
  entity.tokenAddress = event.params.tokenAddress;
  entity.paymentOption = event.params.paymentOption;
  entity.saleType = event.params.saleType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleFundsCheckedOut(event: FundsCheckedOutEvent): void {
  let entity = new FundsCheckedOut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.grossAmount = event.params.grossAmount;
  entity.feeAmount = event.params.feeAmount;
  entity.netAmount = event.params.netAmount;
  entity.paymentOption = event.params.paymentOption;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  let entity = new FundsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.amount = event.params.amount;
  entity.paymentOption = event.params.paymentOption;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleOwnershipHandoverCanceled(
  event: OwnershipHandoverCanceledEvent
): void {
  let entity = new OwnershipHandoverCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.pendingOwner = event.params.pendingOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleOwnershipHandoverRequested(
  event: OwnershipHandoverRequestedEvent
): void {
  let entity = new OwnershipHandoverRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.pendingOwner = event.params.pendingOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldOwner = event.params.oldOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let booth = Booth.load(event.address);
  if (booth) {
    booth.owner = event.params.newOwner;
    booth.save();
  }
}

export function handlePreviewTextUpdated(event: PreviewTextUpdatedEvent): void {
  let entity = new PreviewTextUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newPreviewText = event.params.newPreviewText;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let booth = Booth.load(event.address);
  if (booth) {
    booth.previewText = event.params.newPreviewText;
    booth.save();
  }
}

export function handlePriceUpdated(event: PriceUpdatedEvent): void {
  let entity = new PriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newPrice = event.params.newPrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  // 부스 엔티티 업데이트: 가격 변경
  let booth = Booth.load(event.address);
  if (booth) {
    booth.price = event.params.newPrice;
    booth.save();
  }
}

export function handlePurchaseRequested(event: PurchaseRequestedEvent): void {
  let entity = new PurchaseRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requester = event.params.requester;
  entity.contactInfo = event.params.contactInfo;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleRequestApproved(event: RequestApprovedEvent): void {
  let entity = new RequestApproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requester = event.params.requester;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSaleStarted(event: SaleStartedEvent): void {
  let entity = new SaleStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.saleType = event.params.saleType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let booth = Booth.load(event.address);
  if (booth) {
    booth.saleType = event.params.saleType;
    booth.save();
  }
}
