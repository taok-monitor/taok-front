import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import * as Util from '../Util';
import Cartao from '../Cartao';

export default class BarraTotal extends Component {
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

        this.obtemDados = this.obtemDados.bind(this);
    }

    componentDidMount() {
        this.obtemDados(
            this.state.mesAnoInicial,
            this.state.mesAnoFinal,
            this.state.orgaos
        );
    }

    componentWillReceiveProps(props) {
        this.setState({
            mesAnoInicial: props.mesAnoInicial,
            mesAnoFinal: props.mesAnoFinal,
            orgaos: props.orgaos,
        });

        this.obtemDados(props.mesAnoInicial, props.mesAnoFinal, props.orgaos);
    }

    obtemDados(mesAnoInicial, mesAnoFinal, orgaos) {
        const parametrosDeOrgaosFormatados = Util.preparaParametrosDeOrgaos(
            orgaos
        );
        axios
            .get(
                `https://api.inlinesoft.com.br/taok-api/inicial/ano/${mesAnoInicial}/${mesAnoFinal}?${parametrosDeOrgaosFormatados}`
            )
            .then(res => {
                this.calculaAcumulado(res.data[0].valores);

                this.setState({
                    labels: res.data[0].labels,
                    valores: res.data[0].valores,
                });
            });
    }

    calculaAcumulado(valores = []) {
        const total = valores.reduce(
            (valorFinal, atual) => valorFinal + atual,
            0.0
        );

        this.setState({
            totalAcumulado: Util.formataParaReal(total),
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Bar
                            data={{
                                labels: this.state.labels,
                                datasets: [
                                    {
                                        label: 'Consumo total por mês',
                                        backgroundColor: '#6c757d',
                                        borderColor: '#6c757d',
                                        data: this.state.valores,
                                    },
                                ],
                            }}
                            width={100}
                            height={200}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Cartao
                            orgao="Total"
                            valor={this.state.totalAcumulado}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

BarraTotal.propTypes = {
    orgaos: PropTypes.arrayOf(PropTypes.any).isRequired,
    mesAnoInicial: PropTypes.string.isRequired,
    mesAnoFinal: PropTypes.string.isRequired,
};
