import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import * as Util from '../Util';
import Cartao from '../Cartao';

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

function encontraLegenda(label) {
    const legendaEncontrada = legendas.find(legenda => legenda.label === label);

    return legendaEncontrada && legendaEncontrada.legenda;
}

export default class Barra extends Component {
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
        const { mesAnoInicial, mesAnoFinal, orgaos } = this.state;

        this.obtemDados(mesAnoInicial, mesAnoFinal, orgaos);
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
        const orgaosFormatados = Util.preparaParametrosDeOrgaos(orgaos);

        axios
            .get(
                `https://api.inlinesoft.com.br/taok-api/inicial/${mesAnoInicial}/${mesAnoFinal}?${orgaosFormatados}`
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
        const { labels, valores, totalAcumulado } = this.state;

        return (
            <div>
                <Row>
                    <Col>
                        <Bar
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: '5 Orgãos que mais consumiram',
                                        backgroundColor: '#6c757d',
                                        borderColor: '#6c757d',
                                        data: valores,
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
                            orgao="Total dos 5 Maiores"
                            valor={totalAcumulado}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Sigla</th>
                                    <th>Legenda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {labels.map((label, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{label}</td>
                                            <td>{encontraLegenda(label)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

Barra.propTypes = {
    orgaos: PropTypes.arrayOf(PropTypes.any).isRequired,
    mesAnoInicial: PropTypes.string.isRequired,
    mesAnoFinal: PropTypes.string.isRequired,
};
