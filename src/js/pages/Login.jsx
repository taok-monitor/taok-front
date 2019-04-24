import React, { Component } from "react";
import {
  Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from "react-datepicker";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

/* Dados fakes porque API ainda não está pronta */
const orgaos = [
  'cagece',
  'coelce',
  'hgf'
];

const dados = [10, 30, 50];

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orgaos: [],
      dados: [],
      startDate: new Date()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /* Metódo de ciclo de vida do React quando o componente é montado (executado uma unica vez) */
  /* Quando componente é montadp pego os dados da API */
  componentDidMount() {
    axios.get('/url/docara/').then(res => {
      this.setState({
        orgaos: res.orgaos,
        dados: res.dados
      });
    });
  }

  /* Metódo chamado toda vez que o filtro for alterado */
  /* Faz uma nova requisição parar buscar os dados da API baseado no filtro */
  handleChange(date) {
    console.log(date);

    this.setState({
      startDate: date
    });

    axios.get('/url/docara/').then(res => {
      this.setState({
        orgaos: res.orgaos,
        dados: res.dados
      });
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Bar
              data={
                {
                  labels: orgaos,
                  // labels: nomeDosOrgaos,
                  datasets: [{
                    label: "Orgãos que mais consumiram",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: dados,
                  }]
                }
              }
              width={100}
              height={200}
              options={{
                maintainAspectRatio: false
              }}
            />
          </Col>
          <Col>
            <Bar
              data={
                {
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [{
                    label: "Orgãos que mais economizaram",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                  }]
                }
              }
              width={100}
              height={200}
              options={{
                maintainAspectRatio: false
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Janeiro</CardTitle>
                <CardSubtitle>Total</CardSubtitle>
                <CardText>R$ 5.000</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Fevereiro</CardTitle>
                <CardSubtitle>Total</CardSubtitle>
                <CardText>R$ 5.000</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Março</CardTitle>
                <CardSubtitle>Total</CardSubtitle>
                <CardText>R$ 5.000</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Abril</CardTitle>
                <CardSubtitle>Total</CardSubtitle>
                <CardText>R$ 5.000</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
