import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

import Cartao from '../Cartao';
import { withBarHOC } from '../HOCS/withBarHOC';

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

function Barra(props) {
    const { labels, valores, totalAcumulado, getFormattedLabel } = props;

    return (
        <Fragment>
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
                            tooltips: {
                                callbacks: {
                                    label: getFormattedLabel,
                                },
                            },
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
        </Fragment>
    );
}

Barra.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    valores: PropTypes.arrayOf(PropTypes.any).isRequired,
    totalAcumulado: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    getFormattedLabel: PropTypes.func.isRequired,
};

export default withBarHOC(Barra);
