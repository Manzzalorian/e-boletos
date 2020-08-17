export function getVencimento(fator: number): string {
    if (fator == 0) return "data de vencimento não definida"
    let date: Date = new Date("1997-10-07");
    date.setDate(date.getDate() + fator);
    return date.toISOString().slice(0,10);//YYYY-MM-DD
}