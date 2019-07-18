import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import * as Util from '../Util';

const legendas = [
    {
        label: 'FAS',
        legenda: 'FUNDO MUNICIPAL DE ASSISTENCIA SOCIAL',
    },
    {
        label: 'FMC',
        legenda: 'FUNDO MUNICIPAL DE CULTURA',
    },
    {
        label: 'FMDCA',
        legenda:
            'FUNDO MUNICIPAL DE DEFESA DOS DIREITOS DA CRIANCA E DO ADOLESCENTE',
    },
    {
        label: 'FMDSE',
        legenda: 'FUNDO MUNICIPAL DE DESENVOLVIMENTO ECONOMICO',
    },
    {
        label: 'FUNDURB',
        legenda: 'FUNDO MUNICIPAL DE DESENVOLVIMENTO URBANO',
    },
    {
        label: 'FMDD',
        legenda: 'FUNDO MUNICIPAL DE DIREITOS DIFUSOS',
    },
    {
        label: 'FME',
        legenda: 'FUNDO MUNICIPAL DE EDUCACAO',
    },
    {
        label: 'FMHIS',
        legenda: 'FUNDO MUNICIPAL DE HABITACAO DE INTERESSE SOCIAL',
    },
    {
        label: 'FEMS',
        legenda: 'FUNDO MUNICIPAL DE SAUDE',
    },
    {
        label: 'FMDPI',
        legenda: 'FUNDO MUNICIPAL DOS DIREITOS DA PESSOA IDOSA',
    },
    {
        label: 'FMDPD',
        legenda:
            'FUNDO MUNICIPAL PARA PROMOCAO DOS DIREITOS DAS PESSOAS COM DEFICIENCIA',
    },
    {
        label: 'GP',
        legenda: 'GABINETE DO PREFEITO',
    },
    {
        label: 'GVP',
        legenda: 'GABINETE DO VICE-PREFEITO',
    },
    {
        label: 'GMF',
        legenda: 'GUARDA MUNICIPAL DE FORTALEZA',
    },
    {
        label: 'HDMSJB',
        legenda: 'HOSPITAL DISTRITAL MARIA JOSE BARROSO DE OLIVEIRA',
    },
    {
        label: 'HEBO',
        legenda: 'HOSPITAL DISTRITAL EDMILSON BARROS DE OLIVEIRA',
    },
    {
        label: 'HDEAYRE',
        legenda: 'HOSPITAL DISTRITAL EVANDRO AYRES DE MOURA',
    },
    {
        label: 'HDGM/BC',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/BARRA DO CEARA',
    },
    {
        label: 'HDGM/JW',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/JOSE WALTER',
    },
    {
        label: 'HDGM/ME',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/MESSEJANA',
    },
    {
        label: 'HDNSCON',
        legenda: 'HOSPITAL DISTRITAL NOSSA SENHORA DA CONCEICAO',
    },

    {
        label: 'HMZAN',
        legenda: 'HOSPITAL E MATERNIDADE DRA ZILDA ARNS NEUMANN',
    },
    {
        label: 'CROA',
        legenda: 'HOSPITAL LUCIA DE FATIMA/CROA',
    },
    {
        label: 'IJF',
        legenda: 'INSTITUTO DR. JOSE FROTA',
    },
];

function calculaAcumulado(valores = []) {
    const total = valores.reduce(
        (valorFinal, atual) => valorFinal + atual,
        0.0
    );

    return Util.formataParaReal(total);
}

function encontraLegenda(label) {
    const legendaEncontrada = legendas.find(legenda => legenda.label === label);

    return legendaEncontrada && legendaEncontrada.legenda
        ? legendaEncontrada.legenda
        : '';
}

function getFormattedLabel(tooltipItem, data) {
    const { data: dataValues } = data.datasets[tooltipItem.datasetIndex];
    const label = encontraLegenda(data.labels[tooltipItem.index]);
    const value = dataValues[tooltipItem.index];

    return `${label}: ${Util.formataParaReal(value)}`;
}

export function withBarHOC(Component) {
    class BarHOC extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                labels: [],
                valores: [],
                orgaos: props.orgaos,
                mesAnoInicial: props.mesAnoInicial,
                mesAnoFinal: props.mesAnoFinal,
                totalAcumulado: 0,
            };
        }

        componentDidMount() {
            const { mesAnoInicial, mesAnoFinal, orgaos } = this.state;

            this.obtemDados(mesAnoInicial, mesAnoFinal, orgaos);
        }

        componentWillReceiveProps(props) {
            const { mesAnoInicial, mesAnoFinal, orgaos } = props;

            this.setState({
                mesAnoInicial,
                mesAnoFinal,
                orgaos,
            });

            this.obtemDados(mesAnoInicial, mesAnoFinal, orgaos);
        }

        obtemDados(mesAnoInicial, mesAnoFinal, orgaos) {
            const parametrosDeOrgaosFormatados = Util.preparaParametrosDeOrgaos(
                orgaos
            );

            const { api } = this.props;

            axios
                .get(
                    `${api}${mesAnoInicial}/${mesAnoFinal}?${parametrosDeOrgaosFormatados}`
                )
                .then(res => {
                    this.setState({
                        labels: res.data[0].labels,
                        valores: res.data[0].valores,
                        totalAcumulado: calculaAcumulado(res.data[0].valores),
                    });
                });
        }

        render() {
            return (
                <Component
                    {...this.props}
                    {...this.state}
                    getFormattedLabel={getFormattedLabel}
                />
            );
        }
    }

    BarHOC.propTypes = {
        orgaos: PropTypes.arrayOf(PropTypes.any).isRequired,
        mesAnoInicial: PropTypes.string.isRequired,
        mesAnoFinal: PropTypes.string.isRequired,
        api: PropTypes.string.isRequired,
    };

    return BarHOC;
}

export default withBarHOC;
