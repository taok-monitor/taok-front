import React, { Component } from "react";
import { Container, Row, Col, Card} from 'reactstrap';
import DatePicker from "react-datepicker";

import Barra from '../components/Barra';
import Linha from '../components/Linha'

import "react-datepicker/dist/react-datepicker.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataIncial: new Date(),
      dataFinal : new Date(),
      mesAnoInicial : this.formaData(new Date()),
      mesAnoFinal : this.formaData(new Date())
    };

    this.handleChange = this.handleChange.bind(this);

    console.log("Constructor");
    
    console.log(this.state);
  }

  handleChange(date) {
    
    this.setState({
      dataIncial : date,
      mesAnoInicial: this.formaData(date)
    });
  }

  formaData(data){
    var mes =  parseInt(data.getMonth()+1);
    var ano = data.getFullYear();
    
    if( mes < 10 ){

      return "0"+mes+ano;
    }
     
    return mes+ano;
  }

  componentDidMount() {
    console.log("Atualiza");
  }

  componentWillUpdate(){

    console.log("Atualiza2");
    console.log(this.state);
    
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.dataIncial}
              onChange={this.handleChange}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.dataFinal}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Barra mesAnoInicial={this.state.mesAnoInicial} mesAnoFinal={this.state.mesAnoFinal} ></Barra>
            </Card>            
          </Col>
          <Col>
            <Card>
              <Linha></Linha>
            </Card>
            
          </Col>
        </Row>
      </Container>
    );
  }
}
