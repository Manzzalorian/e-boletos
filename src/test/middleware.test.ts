import { boletoValidator } from "../validator/boletoValidator";

const response: any = {
    send: jest.fn(),
    locals:jest.fn(),
    status: jest.fn((code) => {
        return response;
    }),
}
const next = jest.fn();

it('CHAMADA S/ PARAMETRO', () => {
    const request: any = {
        query: {}
    };
    boletoValidator(
        request,
        response,
        next,
    );
    expect(response.status).toHaveBeenLastCalledWith(406);
    expect(response.send).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO SEM TEXTO ', () => {
    const request: any = {
        query: { digitableLine: '' },
    };

    boletoValidator(
        request,
        response,
        next,
    );
    expect(response.status).toHaveBeenLastCalledWith(406);
    expect(response.send).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO COM TEXTO ', () => {
    const request: any = {
        query: { digitableLine: 'COM TEXTO' },
    };

    boletoValidator(
        request,
        response,
        next,
    );
    expect(response.status).toHaveBeenLastCalledWith(401);
    expect(response.send).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO COM TEXTO E NUMERO INCOMPLETO', () => {
    const request: any = {
        query: { digitableLine: '1a2b3c4d5e6f7g8h9' },
    };

    boletoValidator(
        request,
        response,
        next,
    );
    expect(response.status).toHaveBeenLastCalledWith(411);
    expect(response.send).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO C/ 48 NUMERO SEM 8', () => {
    const request: any = {
        query: { digitableLine: '117700000000010936599702411310797039001433708318' },
    };
    boletoValidator(
        request,
        response,
        next,
    );
    expect(response.status).toHaveBeenLastCalledWith(411);
    expect(response.send).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO C/ 48 NUMERO C/ 8', () => {
    const request: any = {
        query: { digitableLine: '817700000000010936599702411310797039001433708318' },
    };
    boletoValidator(
        request,
        response,
        next,
    );
    expect(next).toHaveBeenCalled();
});

it('CHAMADA C/ PARAMETRO C/ 47 NUMERO', () => {
    const request: any = {
        query: { digitableLine: '00190500954014481606906809350314337370000000100' },
    };
    boletoValidator(
        request,
        response,
        next,
    );
    expect(next).toHaveBeenCalled();
});