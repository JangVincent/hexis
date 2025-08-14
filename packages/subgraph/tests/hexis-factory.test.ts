import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { BoothCreated } from '../generated/schema';
import { BoothCreated as BoothCreatedEvent } from '../generated/HexisFactory/HexisFactory';
import { handleBoothCreated } from '../src/hexis-factory';
import { createBoothCreatedEvent } from './hexis-factory-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let boothAddress = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let owner = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let previewText = 'Example string value';
    let price = BigInt.fromI32(234);
    let paymentOption = 123;
    let paymentTokenAddress = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let saleType = 123;
    let newBoothCreatedEvent = createBoothCreatedEvent(
      boothAddress,
      owner,
      previewText,
      price,
      paymentOption,
      paymentTokenAddress,
      saleType
    );
    handleBoothCreated(newBoothCreatedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test('BoothCreated created and stored', () => {
    assert.entityCount('BoothCreated', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'boothAddress',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'owner',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'previewText',
      'Example string value'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'price',
      '234'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'paymentOption',
      '123'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'paymentTokenAddress',
      '0x0000000000000000000000000000000000000001'
    );
    assert.fieldEquals(
      'BoothCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'saleType',
      '123'
    );

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  });
});
