import { getDigitVerifyMod10, getDigitVerifyMod11 } from "../modulo/calcModulo";



it('Modulo 10 com 9,10,11 characters ', () => {

    const CAMPOS = ["001905009", "4014481606", "81770000000", "01230067896"];
    const DV = [5, 9, 0, 3];

    DV.forEach((_, i) => {
        expect(getDigitVerifyMod10(CAMPOS[i])).toEqual(DV[i]);
    });
})

it('Modulo 10 com 43 characters ', () => {
    const CAMPOS = ["8170000000010936599704113107970300143370831", "8220000215048200974123220154098290108605940"];
    const DV = [7, 1];
    DV.forEach((_, i) => {
        expect(getDigitVerifyMod10(CAMPOS[i])).toEqual(DV[i]);
    });
})

it('Modulo 11 com 11 characters ', () => {

    const CAMPOS = ["01230067896"];
    const DV = [0];

    DV.forEach((_, i) => {
        expect(getDigitVerifyMod11(CAMPOS[i], true)).toEqual(DV[i]);
    });
})

it('Modulo 11 com 43 characters padrao BB', () => {
    const CAMPOS = "0019373700000001000500940144816060680935031";
    const DV = 3;

    expect(getDigitVerifyMod11(CAMPOS)).toEqual(DV);
})

it('Modulo 11 com 43 characters padrao FEB', () => {
    const CAMPOS = "8220000215048200974123220154098290108605940";
    const DV = 0;
    const BOO = true;

    expect(getDigitVerifyMod11(CAMPOS, BOO)).toEqual(DV);
})