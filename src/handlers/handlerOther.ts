import { getDigitVerifyMod10, getDigitVerifyMod11 } from '../modulo/calcModulo';
import { BoletoType, Result } from '../models/boletoType';

export function handlerOther(digitableLine: string):Result {
  let modulo: number = 10;

  const _campo1 = digitableLine.slice(0, 11);
  const _campo2 = digitableLine.slice(12, 23);
  const _campo3 = digitableLine.slice(24, 35);
  const _campo4 = digitableLine.slice(36, 47);

  const _barcode = _formatBarcodeNumberWithoutDV(_campo1, _campo2, _campo3, _campo4);

  const _val1 = digitableLine.slice(11, 12);
  const _val2 = digitableLine.slice(23, 24);
  const _val3 = digitableLine.slice(35, 36);
  const _val4 = digitableLine.slice(47, 48);
  
  const _DV = digitableLine.slice(3, 4);
  
  const _indValorReferencia = +digitableLine.slice(2, 3);
  if (_indValorReferencia == 8 || _indValorReferencia == 9) modulo = 11;

  const digitableLineValid = (
    _getDigitVerify(_campo1, modulo) == +_val1 && _getDigitVerify(_campo2, modulo) == +_val2 &&
    _getDigitVerify(_campo3, modulo) == +_val3 && _getDigitVerify(_campo4, modulo) == +_val4 &&
    _getDigitVerify(_barcode, modulo) == +_DV
  );

  if (digitableLineValid) {
    const barcode = _formatBarCodeNumberWithDV(_barcode, _DV);
    const amount = barcode.slice(4, 15);

    return {
      digitableLineValid: digitableLineValid,
      amount: _formatAmount(amount),
      barCode: barcode
    };

  } else {
    return {
      digitableLineValid: digitableLineValid
    };
  }
}
function _getDigitVerify(string: string, modulo: Number): Number {
  if (modulo == 10) {
    return getDigitVerifyMod10(string)
  } else {
    return getDigitVerifyMod11(string, BoletoType.OTHER)
  }
}
function _formatAmount(amount:string):string{
  let amountText = ''
  amountText = +amount.slice(0,9)+'.'+amount.slice(9);
  return amountText
}

function _formatBarcodeNumberWithoutDV(campo1: string, campo2: string, campo3: string, campo4: string): string {
  let boletoNumber = ''
  boletoNumber = boletoNumber.concat(campo1.slice(0, 3), campo1.slice(4), campo2, campo3, campo4)
  return boletoNumber;
}

function _formatBarCodeNumberWithDV(barCode: string, digito: string): string {
  let barCodeNumber = '';
  barCodeNumber = barCode.slice(0, 3) + digito + barCode.slice(3);
  return barCodeNumber;
}
