import {BigNumber} from 'bignumber.js';
export {SignedOrder} from '0x.js';

export interface RelaySignedOrder {
  orderHash: string;
  state: 'OPEN' | 'EXPIRED' | 'CLOSED' | 'UNFUNDED';
  baseTokenAddress: string;
  quoteTokenAddress: string;
  remainingBaseTokenAmount: BigNumber; // Converted amount
  remainingQuoteTokenAmount: BigNumber; // Converted amount
  price: BigNumber;
  createdDate: BigNumber; // Unix timestamp
  signedOrder: SignedOrder;
}
