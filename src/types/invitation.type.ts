export enum TransferFrom {
  mosty = 'mosty',
  shchuchyn = 'shchuchyn'
}

type InvitationType = {
  checkSlip: boolean;
  checkTransport: boolean;
  transportFrom: TransferFrom;
};

export type { InvitationType };
