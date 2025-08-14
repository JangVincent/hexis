import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  BoothCreated,
  OwnershipHandoverCanceled,
  OwnershipHandoverRequested,
  OwnershipTransferred,
} from '../generated/HexisFactory/HexisFactory';

export function createBoothCreatedEvent(
  boothAddress: Address,
  owner: Address,
  previewText: string,
  price: BigInt,
  paymentOption: i32,
  paymentTokenAddress: Address,
  saleType: i32
): BoothCreated {
  let boothCreatedEvent = changetype<BoothCreated>(newMockEvent());

  boothCreatedEvent.parameters = new Array();

  boothCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'boothAddress',
      ethereum.Value.fromAddress(boothAddress)
    )
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'previewText',
      ethereum.Value.fromString(previewText)
    )
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam('price', ethereum.Value.fromUnsignedBigInt(price))
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'paymentOption',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(paymentOption))
    )
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'paymentTokenAddress',
      ethereum.Value.fromAddress(paymentTokenAddress)
    )
  );
  boothCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'saleType',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(saleType))
    )
  );

  return boothCreatedEvent;
}

export function createOwnershipHandoverCanceledEvent(
  pendingOwner: Address
): OwnershipHandoverCanceled {
  let ownershipHandoverCanceledEvent =
    changetype<OwnershipHandoverCanceled>(newMockEvent());

  ownershipHandoverCanceledEvent.parameters = new Array();

  ownershipHandoverCanceledEvent.parameters.push(
    new ethereum.EventParam(
      'pendingOwner',
      ethereum.Value.fromAddress(pendingOwner)
    )
  );

  return ownershipHandoverCanceledEvent;
}

export function createOwnershipHandoverRequestedEvent(
  pendingOwner: Address
): OwnershipHandoverRequested {
  let ownershipHandoverRequestedEvent =
    changetype<OwnershipHandoverRequested>(newMockEvent());

  ownershipHandoverRequestedEvent.parameters = new Array();

  ownershipHandoverRequestedEvent.parameters.push(
    new ethereum.EventParam(
      'pendingOwner',
      ethereum.Value.fromAddress(pendingOwner)
    )
  );

  return ownershipHandoverRequestedEvent;
}

export function createOwnershipTransferredEvent(
  oldOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('oldOwner', ethereum.Value.fromAddress(oldOwner))
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}
