"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');

var pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 = require('@daml.js/ghc-stdlib-DA-Internal-Template-1.0.0');


exports.Withdraw = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
};



exports.Deposit = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
};



exports.BankAccount = damlTypes.assembleTemplate(
{
  templateId: '#project3-bankaccount:Main:BankAccount',
  templateIdWithPackageId: '6af594347a647cf7770f07bcdb3813382387275cdc1bc3f8fda00feddfb58174:Main:BankAccount',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, balance: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    bank: damlTypes.Party.encode(__typed__.bank),
    owner: damlTypes.Party.encode(__typed__.owner),
    balance: damlTypes.Numeric(10).encode(__typed__.balance),
  };
}
,
  Deposit: {
    template: function () { return exports.BankAccount; },
    choiceName: 'Deposit',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Deposit.decoder; }),
    argumentEncode: function (__typed__) { return exports.Deposit.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.BankAccount).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.BankAccount).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.BankAccount; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Withdraw: {
    template: function () { return exports.BankAccount; },
    choiceName: 'Withdraw',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Withdraw.decoder; }),
    argumentEncode: function (__typed__) { return exports.Withdraw.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.BankAccount).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.BankAccount).encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.BankAccount, ['6af594347a647cf7770f07bcdb3813382387275cdc1bc3f8fda00feddfb58174', '#project3-bankaccount']);

