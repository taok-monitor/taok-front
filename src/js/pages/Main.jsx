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
          <Col xs="6">            
            <Input type="select" name="select" id="exampleSelect" onChange={this.informaOrgao} >
              <option value="" >Escolha um órgão</option>
              <option value="FAS">FUNDO MUNICIPAL DE ASSISTENCIA SOCIAL - FAS</option>
              <option value="FMC">FUNDO MUNICIPAL DE CULTURA - FMC</option>
              <option value="FMDCA">FUNDO MUNICIPAL DE DEFESA DOS DIREITOS DA CRIANCA E DO ADOLESCENTE - FMDCA</option>
              <option value="FMDSE">FUNDO MUNICIPAL DE DESENVOLVIMENTO ECONOMICO - FMDSE</option>
              <option value="FUNDURB">FUNDO MUNICIPAL DE DESENVOLVIMENTO URBANO - FUNDURB</option>
              <option value="FMDD">FUNDO MUNICIPAL DE DIREITOS DIFUSOS - FMDD</option>
              <option value="FME">FUNDO MUNICIPAL DE EDUCACAO - FME</option>
              <option value="FMHIS">FUNDO MUNICIPAL DE HABITACAO DE INTERESSE SOCIAL - FMHIS</option>    
              <option value="FEMS">FUNDO MUNICIPAL DE SAUDE - FEMS</option>
              <option value="FMDPI">FUNDO MUNICIPAL DOS DIREITOS DA PESSOA IDOSA - FMDPI</option>
              <option value="FMDPD">FUNDO MUNICIPAL PARA PROMOCAO DOS DIREITOS DAS PESSOAS COM DEFICIENCIA - FMDPD</option>
              <option value="GP">GABINETE DO PREFEITO - GP</option>
              <option value="GVP">GABINETE DO VICE-PREFEITO - GVP</option>
              <option value="GMF">GUARDA MUNICIPAL DE FORTALEZA - GMF</option>
              <option value="HDMSJB">HOSPITAL DISTRITAL MARIA JOSE BARROSO DE OLIVEIRA - HDMSJB</option>
              <option value="HEBO">HOSPITAL DISTRITAL EDMILSON BARROS DE OLIVEIRA - HEBO</option>
              <option value="HDEAYRE">HOSPITAL DISTRITAL EVANDRO AYRES DE MOURA - HDEAYRE</option>
              <option value="HDGM/BC">HOSPITAL DISTRITAL GONZAGA MOTA/BARRA DO CEARA - HDGM/BC</option>
              <option value="HDGM/JW">HOSPITAL DISTRITAL GONZAGA MOTA/JOSE WALTER - HDGM/JW</option>
              <option value="HDGM/ME">HOSPITAL DISTRITAL GONZAGA MOTA/MESSEJANA - HDGM/ME</option>
              <option value="HDNSCON">HOSPITAL DISTRITAL NOSSA SENHORA DA CONCEICAO - HDNSCON</option>
              <option value="HMZAN">HOSPITAL E MATERNIDADE DRA ZILDA ARNS NEUMANN - HMZAN</option>
              <option value="CROA">HOSPITAL LUCIA DE FATIMA/CROA - CROA</option>
              <option value="IJF">INSTITUTO DR. JOSE FROTA - IJF</option>
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
