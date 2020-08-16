# E-Boletos
Projeto para teste de backend

O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada como entrada uma linha digitada de um boleto e que retorna:  
Se a linha digitada é válida  
O valor do boleto, se existir  
A data de vencimento do boleto, se existir  
Os 44 dígitos correspondentes ao código de barras desse boleto  

É essencial que seja feita a validação dos dígitos verificadores.

Existem 2 tipos de boletos que seguem regras diferentes: títulos bancários e pagamentos de concessionárias. O código deve funcionar corretamente para ambos.


### Rodando Local
#### 1. Executar o código
#### 2. Endpoint
#### 3. Retornos
#### 4. Erros
#### 5. Testes


---------------------------------------------------------
### 1. Executar o código

Para instalar o e-boleto, use o comando: `npm install` na pasta raiz onde contem o arquivo package.json para instalar as dependecias do projeto.  
Para executar o e-boleto, use o comando: `npm start` na pasta raiz.

---------------------------------------------------------
### 2. Endpoint

A API tem somente um endpoint: `http://localhost:3000/checkBoleto` o mesmo precisa receber um parametro via queryString identificado por "digitableLine", ela espera 47 digitos ou 48 digitos, que sao os tamanhos da linha digitavel dos boletos documentados no teste.

---------------------------------------------------------
### 3. Retornos
Segue abaixo os retornos 

Chamada - bancários valida #1: 
```javascript
http://localhost:3000/checkBoleto?digitableLine=00190500954014481606906809350314337370000000100
```
Retorno #1: 
```json
{
    "digitableLineValid":true,
    "amount":"100.00",
    "expirationDate":"2007-12-31",
    "barCode":"00193373700000001000500940144816060680935031"
}
```
Chamada - bancários invalida #1: 
```javascript
http://localhost:3000/checkBoleto?digitableLine=00190500954014481606906809350314337370000000101
```
Retorno #1: 
```json
{
    "digitableLineValid":false,
}
```
Chamada - Concessionárias valida #2: 
```javascript
http://localhost:3000/checkBoleto?digitableLine=817700000000010936599702411310797039001433708318
```
Retorno #2: 
```json
{
    "digitableLineValid":true,
    "amount":"10.00",
    "barCode":"81770000000010936599704113107970300143370831"
}
```

---------------------------------------------------------
### 4. Erros
Segue exemplos dos erros tratados no input da API 


Erro #1: 
```javascript
http://localhost:3000/checkBoleto ou http://localhost:3000/checkBoleto?digitableLine=
```
Retorno #1: 
```json
{
  "error": "O parametro digitableLine é obrigatorio e não nulo"
}
```
Status #1:  
<img src="https://http.cat/406.jpg" width="300" height="225">

Erro #2: 
```javascript
http://localhost:3000/checkBoleto?digitableLine=aaaaaaaaaaaaaaaaaaa
```
Retorno #2: 
```json
{
 "error": "O parametro digitableLine deve deve ser numérico"
}
```
Status #2:  
<img src="https://http.cat/401.jpg" width="300" height="225">

Erro #3: 
```javascript
http://localhost:3000/checkBoleto?digitableLine=123456789123456789
```
Retorno #3: 
```json
{
   "error": "O parametro digitableLine deve possuir 47 números ou 48 números comecando pelo digito 8"
}
```
Status #3:  
<img src="https://http.cat/411.jpg" width="300" height="225">
---------------------------------------------------------
### 5. Testes

Para executar os testes do e-boleto, use o comando: `npm test` na pasta raiz.