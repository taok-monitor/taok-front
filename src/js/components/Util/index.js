export function formataParaReal(valor) {
    if (valor !== 0 && !valor) {
        throw new TypeError('You should pass a valid argument');
    }

    const numero = Number(valor)
        .toFixed(2)
        .split('.');

    numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;

    return numero.join(',');
}

export function preparaParametrosDeOrgaos(orgaos = []) {
    if (!Array.isArray(orgaos)) {
        throw new TypeError('You should pass an array as argument');
    }

    const paramentos = orgaos
        .map((orgao, index, array) => {
            const isLast = index === array.length - 1;

            return `orgao=${orgao}${isLast ? '' : '&'}`;
        })
        .join('');

    return paramentos;
}
