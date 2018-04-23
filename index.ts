import {BigNumber} from 'bignumber.js';
import {SignedOrder} from '@0xproject/types';
export {SignedOrder} from '@0xproject/types';

export interface RadarSignedOrder {
  orderHash: string;
  orderType: OrderType;
  state: OrderState;
  baseTokenAddress: string;
  quoteTokenAddress: string;
  remainingBaseTokenAmount: BigNumber; // Converted amount
  remainingQuoteTokenAmount: BigNumber; // Converted amount
  price: BigNumber;
  createdDate: BigNumber; // Unix timestamp
  signedOrder: SignedOrder;
}

export interface RadarToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  zeroex_official: boolean;
  active: boolean;
  createdDate: string;
  quote: boolean;
}

export type OrderType = 'BUY' | 'SELL';
export type OrderState = 'OPEN' | 'EXPIRED' | 'CLOSED' | 'UNFUNDED';
