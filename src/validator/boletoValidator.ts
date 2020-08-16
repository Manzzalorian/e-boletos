import express from 'express';
import { BoletoType } from '../models/boletoType';
import e from 'express';

export function boletoValidator(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (request.query.digitableLine && request.query.digitableLine != null) {

        const rawDigitableLine: string = request.query.digitableLine.toString();
        const numberPattern = /\d+/g;
        const matchedDigitableLine = rawDigitableLine.match(numberPattern);

        if (matchedDigitableLine == null) return _errorHandler(2, response);

        const digitableLine = matchedDigitableLine.join('');
        if (digitableLine.length == 47 || digitableLine.length == 48 && digitableLine.charAt(0) == "8") {
            response.locals.digitableLine = digitableLine;
            response.locals.type = digitableLine.length == 47 ? BoletoType.BANK : BoletoType.OTHER;
            next();
        } else {
            return _errorHandler(3, response);
        }
    } else {
        return _errorHandler(1, response);
    }
}

function _errorHandler(code: number, response: express.Response) {
    let message = 'Linha digitada é inválida';
    let status = 400;
    switch (code) {
        case 1:
            message = 'O parametro digitableLine é obrigatorio e não nulo';
            status = 406;
            break;
        case 2:
            message = 'O parametro digitableLine deve deve ser numérico';
            status = 401;
            break;
        case 3:
            message = 'O parametro digitableLine deve possuir 47 números ou 48 números comecando pelo digito 8';
            status = 411;
            break;
        default:
            break;
    }
    response.status(status).send({ error: message });
}