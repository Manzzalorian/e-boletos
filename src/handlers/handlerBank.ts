import { getDigitVerifyMod10, getDigitVerifyMod11 } from '../modulo/calcModulo';
import { getVencimento } from '../modulo/getVencimento';
import { BoletoType, Result } from '../models/boletoType';

export function handlerBank(digitableLine: string):Result{
    const campos: string[] = [digitableLine.slice(0, 9), digitableLine.slice(10, 20), digitableLine.slice(21, 31), digitableLine.slice(33, 47)];
    const DV: number[] = [+digitableLine.slice(9, 10), +digitableLine.slice(20, 21), +digitableLine.slice(31, 32), +digitableLine.slice(32, 33)];

    const _barcode = _formatBarcodeNumberWithoutDV(campos);

    const digitableLineValid = (
        getDigitVerifyMod10(campos[0]) == DV[0] && getDigitVerifyMod10(campos[1]) == DV[1] &&
        getDigitVerifyMod10(campos[2]) == DV[2] && getDigitVerifyMod11(_barcode, BoletoType.BANK) == DV[3]);

    if (digitableLineValid) {
        const fatorVencimento = +(campos[3].slice(0, 4));
        const amount = campos[3].slice(4);
        return {
            digitableLineValid: digitableLineValid,
            amount: _formatAmount(amount),
            expirationDate: getVencimento(fatorVencimento),
            barCode: _formatBarCodeNumberWithDV(_barcode, DV[3])
        };

    } else {
        return {
            digitableLineValid: digitableLineValid
        };
    }
}
function _formatAmount(amount:string):string{
    let amountText = ''
    amountText = +amount.slice(0,8)+'.'+amount.slice(8);
    return amountText
  }
function _formatBarcodeNumberWithoutDV(campos: string[]): string {
    let boletoNumber = campos[0].slice(0, 4) + campos[3] + campos[0].slice(4, 9) + campos[1] + campos[2];
    return boletoNumber;
}

function _formatBarCodeNumberWithDV(barCode: string, digito: number): string {
    let barCodeNumber = ''
    barCodeNumber = barCode.slice(0, 4) + digito + barCode.slice(4);
    return barCodeNumber;
}

