export enum BoletoType {
  BANK = "BANK",
  OTHER = "OTHER",
}

export type Result = {
  digitableLineValid: boolean,
  amount?: string,
  expirationDate?: string,
  barCode?: string
};
