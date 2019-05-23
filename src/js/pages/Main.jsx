import React, { Component } from "react";
import { Container, Row, Col, Card} from 'reactstrap';
import DatePicker from "react-datepicker";

import Barra from '../components/Barra';
import Linha from '../components/Linha';

import "react-datepicker/dist/react-datepicker.css";
import "../../css/App.css"

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    var hoje = new Date();
    var dataInicial = new Date(hoje.getFullYear(), eval(hoje.getMonth()-1))

    this.state = {
      dataIncial: dataInicial,
      dataFinal : new Date(),
      mesAnoInicial : this.formaData(dataInicial),
      mesAnoFinal : this.formaData(new Date())
    };

    this.informaDataIncial = this.informaDataIncial.bind(this);
    this.informaDataFinal = this.informaDataFinal.bind(this);
  }

  informaDataIncial(date) {
    
    this.setState({
      dataIncial : date,
      mesAnoInicial : this.formaData(date)
    });
  }

  informaDataFinal(date) {

    this.setState({
      dataFinal : date,
      mesAnoFinal : this.formaData(date)
    });
  }

  formaData(data){
    var mes =  parseInt(data.getMonth()+1);
    var ano = data.getFullYear();

    if( mes < 10 ){

      return "0"+mes+ano;
    }
     
    return ""+mes+ano;
  }


  render() {
    return (
      <Container>
        <hr/>
        <Row>
          <Col>
          <DatePicker
                selected={this.state.dataIncial}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataIncial}
            />
            <DatePicker
                selected={this.state.dataFinal}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataFinal}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Card style={{ padding: '10px' }} >
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
