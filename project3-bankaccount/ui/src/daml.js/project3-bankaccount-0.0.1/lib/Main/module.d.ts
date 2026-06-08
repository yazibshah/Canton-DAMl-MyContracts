// Generated from Main.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@daml.js/ghc-stdlib-DA-Internal-Template-1.0.0';

export declare type Withdraw = {
  amount: damlTypes.Numeric;
};

export declare const Withdraw:
  damlTypes.Serializable<Withdraw> & {
  }
;


export declare type Deposit = {
  amount: damlTypes.Numeric;
};

export declare const Deposit:
  damlTypes.Serializable<Deposit> & {
  }
;


export declare type BankAccount = {
  bank: damlTypes.Party;
  owner: damlTypes.Party;
  balance: damlTypes.Numeric;
};

export declare interface BankAccountInterface {
  Deposit: damlTypes.Choice<BankAccount, Deposit, damlTypes.ContractId<BankAccount>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<BankAccount, undefined>>;
  Archive: damlTypes.Choice<BankAccount, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<BankAccount, undefined>>;
  Withdraw: damlTypes.Choice<BankAccount, Withdraw, damlTypes.ContractId<BankAccount>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<BankAccount, undefined>>;
}
export declare const BankAccount:
  damlTypes.Template<BankAccount, undefined, '#project3-bankaccount:Main:BankAccount'> &
  damlTypes.ToInterface<BankAccount, never> &
  BankAccountInterface;

export declare namespace BankAccount {
}


