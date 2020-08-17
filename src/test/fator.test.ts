import { getVencimento } from "../modulo/getVencimento";

it('DATA X FATOR ', () => {

    const FATOR = [1000, 1001];
    const DV = ["7/3/2000", "7/4/2000", ];
    
    DV.forEach((_, i) => {
        expect(getVencimento(FATOR[i])).toEqual(DV[i]);
    });
})
