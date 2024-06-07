export enum TransferFrom {
  mosty = 'mosty',
  shchuchyn = 'shchuchyn'
}

type InvitationType = {
  checkSlip: boolean;
  checkTransport: boolean;
  needOneMorePlace: boolean;
  transportFrom: TransferFrom;
};

export type { InvitationType };
