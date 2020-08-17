import { getVencimento } from "../modulo/getVencimento";

it('DATA X FATOR ', () => {

    const FATOR = [1000, 1001];
    const DV = ["2000-07-03", "2000-07-04" ];
    
    DV.forEach((_, i) => {
        expect(getVencimento(FATOR[i])).toEqual(DV[i]);
    });
})
