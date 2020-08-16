import { getVencimento } from "../modulo/getVencimento";

it('DATA X FATOR ', () => {

    const FATOR = [1000, 1001, 1002, 1667, 4789];
    const DV = ["2000-7-3", "2000-7-4", "2000-7-5", "2002-5-1", "2010-11-17"];

    DV.forEach((_, i) => {
        expect(getVencimento(FATOR[i])).toEqual(DV[i]);
    });
})
