import { getDigitVerifyMod10, getDigitVerifyMod11 } from '../modulo/calcModulo';
import { getVencimento } from '../modulo/getVencimento';

export function handlerBank(digitableLine: string) {
    const _campo1 = digitableLine.slice(0, 9);
    const _campo2 = digitableLine.slice(10, 20);
    const _campo3 = digitableLine.slice(21, 31);
    const _campo4 = digitableLine.slice(32, 33);
    const _campo5 = digitableLine.slice(33, 47);

    const _barcode = _formatBarcodeNumberWithoutDV(_campo1, _campo2, _campo3, _campo5);

    const _val1 = digitableLine.slice(9, 10);
    const _val2 = digitableLine.slice(20, 21);
    const _val3 = digitableLine.slice(31, 32);

    const digitableLineValid = (
        getDigitVerifyMod10(_campo1) == +_val1 &&
        getDigitVerifyMod10(_campo2) == +_val2 &&
        getDigitVerifyMod10(_campo3) == +_val3 &&
        getDigitVerifyMod11(_barcode) == +_campo4
    );

    if (digitableLineValid) {
        const fatorVencimento = +(_campo5.slice(0, 4));
        const date = getVencimento(fatorVencimento);
        const amount = +(_campo5.slice(4));
        const barcode = _formatBarCodeNumberWithDV(_barcode, _campo4);

        return {
            digitableLineValid: digitableLineValid,
            amount: amount.toFixed(2),
            expirationDate: date,
            barCode: barcode
        };

    } else {
        return {
            digitableLineValid: digitableLineValid
        };
    }
}

function _formatBarcodeNumberWithoutDV(campo1: string, campo2: string, campo3: string, campo5: string): string {
    let boletoNumber = ''
    boletoNumber = campo1.slice(0, 4) + campo5 + campo1.slice(4, 9) + campo2 + campo3;
    return boletoNumber;
}

function _formatBarCodeNumberWithDV(barCode: string, digito: string): string {
    let barCodeNumber = ''
    barCodeNumber = barCode.slice(0, 4) + digito + barCode.slice(4);
    return barCodeNumber;
}

