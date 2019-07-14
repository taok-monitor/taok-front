const legendas = [
    {
        label: 'FME',
        legenda: 'Fundo Municipal de Educação',
    },
    {
        label: 'HDEAYRE',
        legenda: 'Frotinha do Ant Bezerra',
    },
    {
        label: 'HDMSJB',
        legenda: 'Frotinha da Parangaba',
    },
    {
        label: 'HDNSCON',
        legenda: 'Hosp. Nossa Sra Cj Ceará',
    },
    {
        label: 'HEBO',
        legenda: 'Frotinha da Messajana',
    },
    {
        label: 'HDGM/ME',
        legenda: 'Gonzaginha da Messajana',
    },
    {
        label: 'GP',
        legenda: 'Gabinete do Prefeito',
    },
    {
        label: 'GVP',
        legenda: 'Gabinete do Vice Prefeito',
    },
];

export function encontraLegenda(label) {

    const legendaEncontrada = legendas.find(legenda => legenda.label === label);

    return legendaEncontrada && legendaEncontrada.legenda;
}