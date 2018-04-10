import {BigNumber} from 'bignumber.js';

export interface RelaySignedOrder {
  signedOrder: SignedOrder;
  orderHash: string;
  state: 'OPEN'|'EXPIRED'|'CLOSED'|'UNFUNDED';
  pending: {
    fillAmount: BigNumber;
    cancelAmount: BigNumber;
  };
  remainingTakerTokenAmount: BigNumber;
  rate?: BigNumber;
}
