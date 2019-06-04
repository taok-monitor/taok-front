import React, { Component } from "react";
import { Container, Row, Col, Card, Input} from 'reactstrap';
import DatePicker from "react-datepicker";

import Barra from '../components/Barra';
import BarraTotal from '../components/BarraTotal';

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
      mesAnoFinal : this.formaData(new Date()),
      orgao: ''
    };

    this.informaDataIncial = this.informaDataIncial.bind(this);
    this.informaDataFinal = this.informaDataFinal.bind(this);
    this.informaOrgao = this.informaOrgao.bind(this);
  }

  informaOrgao(orgao){
    
    this.setState({
    
      orgao : orgao.target.value
    });
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
          <Col xs="3">
            <DatePicker
                selected={this.state.dataIncial}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataIncial}
            />
          </Col>
          <Col xs="3">
            <DatePicker
                selected={this.state.dataFinal}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataFinal}
            />
          </Col>
          <Col xs="3">            
            <Input type="select" name="select" id="exampleSelect" onChange={this.informaOrgao} >
              <option value="" >Escolha um órgão</option>
              <option>FME</option>
              <option>HMZAN</option>
            </Input>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Card style={{ padding: '10px' }} >
            <BarraTotal 
                mesAnoInicial={this.state.mesAnoInicial} 
                mesAnoFinal={this.state.mesAnoFinal} 
                orgao = {this.state.orgao}
              ></BarraTotal>
              
            </Card>            
          </Col>
          <Col>
          <Card style={{ padding: '10px' }} >
              <Barra 
                mesAnoInicial={this.state.mesAnoInicial} 
                mesAnoFinal={this.state.mesAnoFinal} 
                orgao = {this.state.orgao}
              ></Barra>
            </Card>            
          </Col>
        </Row>        
      </Container>
    );
  }
}
