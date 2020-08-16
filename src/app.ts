import express from 'express';
import { boletoValidator } from './validator/boletoValidator';
import { BoletoType } from './models/boletoType';
import { handlerBank } from './handlers/handlerBank';
import { handlerOther } from './handlers/handlerOther';

const app = express();
const port = 3000;

app.get('/checkBoleto',boletoValidator, (req, res) => {
  const { digitableLine, type } = res.locals;

  let result;
  if (type == BoletoType.BANK) {
    result = handlerBank(digitableLine)
  }
  else {
    result = handlerOther(digitableLine);
  }
  return res.status(200).send(result);
});

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`checkBoleto is listening on ${port}`);
});



