import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

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

export default class Legenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: props.labels,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            labels: props.labels,
        });
    }

    render() {
        const { labels } = this.state;

        return (
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
        );
    }
}

Legenda.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.any).isRequired,
};
