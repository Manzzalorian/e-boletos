export function getVencimento(fator: number): string {
    if (fator == 0) return "data de vencimento não definida"
    let date: Date = new Date("1997-10-07");
    date.setDate(date.getDate() + fator + 1);
    return date.toLocaleDateString();
}