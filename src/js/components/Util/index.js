export function formataParaReal(valor) {
    const numero = Number(valor)
        .toFixed(2)
        .split('.');

    numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;

    return numero.join(',');
}

export function preparaParametrosDeOrgaos(orgaos = []) {
    const paramentos = orgaos
        .map((orgao, index, array) => {
            const isLast = index === array.length - 1;

            return `orgao=${orgao}${isLast ? '' : '&'}`;
        })
        .join('');

    return paramentos;
}
