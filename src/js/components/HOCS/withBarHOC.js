import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import * as Util from '../Util';

function calculaAcumulado(valores = []) {
    const total = valores.reduce(
        (valorFinal, atual) => valorFinal + atual,
        0.0
    );

    return Util.formataParaReal(total);
}

function getFormattedLabel(tooltipItem, data) {
    const { label, data: dataValues } = data.datasets[tooltipItem.datasetIndex];

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
