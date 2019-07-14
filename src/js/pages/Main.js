import React from 'react';
import { Container, Row, Col, Card, Input, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';

import Barra from '../components/Barra';
import BarraTotal from '../components/BarraTotal';

import 'react-datepicker/dist/react-datepicker.css';
import '../../css/App.css';

const ORGAOS = [
    {
        label: 'FAS',
        legenda: 'FUNDO MUNICIPAL DE ASSISTENCIA SOCIAL - FAS',
    },
    {
        label: 'FMC',
        legenda: 'FUNDO MUNICIPAL DE CULTURA - FMC',
    },
    {
        label: 'FMDCA',
        legenda:
            'FUNDO MUNICIPAL DE DEFESA DOS DIREITOS DA CRIANCA E DO ADOLESCENTE - FMDCA',
    },
    {
        label: 'FMDSE',
        legenda: 'FUNDO MUNICIPAL DE DESENVOLVIMENTO ECONOMICO - FMDSE',
    },
    {
        label: 'FUNDURB',
        legenda: 'FUNDO MUNICIPAL DE DESENVOLVIMENTO URBANO - FUNDURB',
    },
    {
        label: 'FMDD',
        legenda: 'FUNDO MUNICIPAL DE DIREITOS DIFUSOS - FMDD',
    },
    {
        label: 'FME',
        legenda: 'FUNDO MUNICIPAL DE EDUCACAO - FME',
    },
    {
        label: 'FMHIS',
        legenda: 'FUNDO MUNICIPAL DE HABITACAO DE INTERESSE SOCIAL - FMHIS',
    },
    {
        label: 'FEMS',
        legenda: 'FUNDO MUNICIPAL DE SAUDE - FEMS',
    },
    {
        label: 'FMDPI',
        legenda: 'FUNDO MUNICIPAL DOS DIREITOS DA PESSOA IDOSA - FMDPI',
    },
    {
        label: 'FMDPD',
        legenda:
            'FUNDO MUNICIPAL PARA PROMOCAO DOS DIREITOS DAS PESSOAS COM DEFICIENCIA - FMDPD',
    },
    {
        label: 'GP',
        legenda: 'GABINETE DO PREFEITO - GP',
    },
    {
        label: 'GVP',
        legenda: 'GABINETE DO VICE-PREFEITO - GVP',
    },
    {
        label: 'GMF',
        legenda: 'GUARDA MUNICIPAL DE FORTALEZA - GMF',
    },
    {
        label: 'HDMSJB',
        legenda: 'HOSPITAL DISTRITAL MARIA JOSE BARROSO DE OLIVEIRA - HDMSJB',
    },
    {
        label: 'HEBO',
        legenda: 'HOSPITAL DISTRITAL EDMILSON BARROS DE OLIVEIRA - HEBO',
    },
    {
        label: 'HDEAYRE',
        legenda: 'HOSPITAL DISTRITAL EVANDRO AYRES DE MOURA - HDEAYRE',
    },
    {
        label: 'HDGM/BC',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/BARRA DO CEARA - HDGM/BC',
    },
    {
        label: 'HDGM/JW',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/JOSE WALTER - HDGM/JW',
    },
    {
        label: 'HDGM/ME',
        legenda: 'HOSPITAL DISTRITAL GONZAGA MOTA/MESSEJANA - HDGM/ME',
    },
    {
        label: 'HDNSCON',
        legenda: 'HOSPITAL DISTRITAL NOSSA SENHORA DA CONCEICAO - HDNSCON',
    },

    {
        label: 'HMZAN',
        legenda: 'HOSPITAL E MATERNIDADE DRA ZILDA ARNS NEUMANN - HMZAN',
    },
    {
        label: 'CROA',
        legenda: 'HOSPITAL LUCIA DE FATIMA/CROA - CROA',
    },
    {
        label: 'IJF',
        legenda: 'INSTITUTO DR. JOSE FROTA - IJF',
    },
];

function formaData(data) {
    const mes = parseInt(data.getMonth() + 1, 10);
    const ano = data.getFullYear();

    if (mes < 10) {
        return `0${mes}${ano}`;
    }

    return `${mes}${ano}`;
}

// eslint-disable-next-line react/prop-types
function renderOrgao({ label, legenda }, index) {
    return (
        <option key={index} value={label}>
            {legenda}
        </option>
    );
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        const hoje = new Date();
        const dataInicial = new Date(
            hoje.getFullYear(),
            // eslint-disable-next-line no-eval
            eval(hoje.getMonth() - 1)
        );

        this.state = {
            dataIncial: dataInicial,
            dataFinal: new Date(),
            mesAnoInicial: formaData(dataInicial),
            mesAnoFinal: formaData(new Date()),
            orgaos: [],
        };

        this.informaDataIncial = this.informaDataIncial.bind(this);
        this.informaDataFinal = this.informaDataFinal.bind(this);
        this.informaOrgao = this.informaOrgao.bind(this);
        this.buscaHospitais = this.buscaHospitais.bind(this);
        this.inicio = this.inicio.bind(this);
        this.buscaPrefeitos = this.buscaPrefeitos.bind(this);
        this.buscaRegionais = this.buscaRegionais.bind(this);
        this.buscaAno = this.buscaAno.bind(this);
    }

    informaOrgao(orgao) {
        this.setState({
            orgaos: [orgao.target.value],
        });
    }

    informaDataIncial(date) {
        this.setState({
            dataIncial: date,
            mesAnoInicial: formaData(date),
        });
    }

    informaDataFinal(date) {
        this.setState({
            dataFinal: date,
            mesAnoFinal: formaData(date),
        });
    }

    inicio() {
        this.setState({
            orgaos: [],
        });
    }

    buscaHospitais() {
        this.setState({
            orgaos: [
                'HDMSJB',
                'HEBO',
                'HDEAYRE',
                'HDGM/BC',
                'HDGM/ME',
                'HDNSCON',
                'HMZAN',
                'CROA',
            ],
        });
    }

    buscaPrefeitos() {
        this.setState({
            orgaos: ['GP', 'GVP'],
        });
    }

    buscaRegionais() {
        this.setState({
            orgaos: ['SER I', 'SER II', 'SER III', 'SER IV', 'SER V', 'SER VI'],
        });
    }

    buscaAno(ano) {
        const mesAnoInicial = `01${ano}`;
        const mesAnoFinal = `12${ano}`;

        this.setState({
            mesAnoInicial,
            mesAnoFinal,
        });
    }

    render() {
        const {
            dataIncial,
            dataFinal,
            mesAnoInicial,
            mesAnoFinal,
            orgaos,
        } = this.state;

        return (
            <Container>
                <hr />
                <Row>
                    <Col>
                        Quanto um órgão da Prefeitura de Fortaleza paga todo mês
                        para a CAGECE?
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="6" md="3" style={{ padding: '10px' }}>
                        <DatePicker
                            selected={dataIncial}
                            dateFormat="dd/MM/yyyy"
                            onChange={this.informaDataIncial}
                        />
                    </Col>
                    <Col xs="6" md="3" style={{ padding: '10px' }}>
                        <DatePicker
                            selected={dataFinal}
                            dateFormat="dd/MM/yyyy"
                            onChange={this.informaDataFinal}
                        />
                    </Col>
                    <Col xs="12" md="6" style={{ padding: '10px' }}>
                        <Input
                            type="select"
                            name="select"
                            onChange={this.informaOrgao}
                        >
                            <option value="">Escolha um órgão</option>
                            {ORGAOS.map(renderOrgao)}
                        </Input>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="6" md="6" style={{ padding: '10px' }}>
                        <Row>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button onClick={this.inicio} size="lg" block>
                                    Todos
                                </Button>
                            </Col>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button
                                    onClick={this.buscaHospitais}
                                    size="lg"
                                    block
                                >
                                    Hospitais
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button
                                    onClick={this.buscaPrefeitos}
                                    size="lg"
                                    block
                                >
                                    Prefeitos
                                </Button>
                            </Col>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button
                                    onClick={this.buscaRegionais}
                                    size="lg"
                                    block
                                >
                                    Regionais
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" md="6" style={{ padding: '10px' }}>
                        <Row>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button
                                    id="teste"
                                    onClick={() => this.buscaAno('2019')}
                                    size="lg"
                                    block
                                >
                                    2019
                                </Button>
                            </Col>
                            <Col xs="12" md="6" style={{ padding: '10px' }}>
                                <Button
                                    onClick={() => this.buscaAno('2018')}
                                    size="lg"
                                    block
                                >
                                    2018
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Card>
                            <BarraTotal
                                mesAnoInicial={mesAnoInicial}
                                mesAnoFinal={mesAnoFinal}
                                orgaos={orgaos}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Barra
                                mesAnoInicial={mesAnoInicial}
                                mesAnoFinal={mesAnoFinal}
                                orgaos={orgaos}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
