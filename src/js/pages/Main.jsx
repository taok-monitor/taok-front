import React from "react";
import { Container, Row, Col, Card, Input, Button} from 'reactstrap';
import DatePicker from "react-datepicker";

import Barra from '../components/Barra';
import BarraTotal from '../components/BarraTotal';

import "react-datepicker/dist/react-datepicker.css";
import "../../css/App.css";

import Logo from '../../img/logo.jpg'
import LogoFortaleza from '../../img/logo-prefeitura-fortaleza.png'
import LogoCAGECE from '../../img/logo-cagece.png'

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
      orgao:'',
      orgaos:[]
    };

    this.informaDataIncial = this.informaDataIncial.bind(this);
    this.informaDataFinal  = this.informaDataFinal.bind(this);
    this.informaOrgao      = this.informaOrgao.bind(this);
    this.buscaHospitais    = this.buscaHospitais.bind(this);
    this.inicio            = this.inicio.bind(this)
    this.buscaPrefeitos    = this.buscaPrefeitos.bind(this);
    this.buscaRegionais    = this.buscaRegionais.bind(this);
  }

  informaOrgao(orgao){
    
    this.setState({
    
      orgao : orgao.target.value,
      orgaos: [orgao.target.value]
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

  inicio(){
    this.setState({
            
      orgaos: []
    });
  }

  buscaHospitais(){

      this.setState({
            
        orgaos: ['HDMSJB','HEBO', 'HDEAYRE', 'HDGM/BC','HDGM/ME','HDNSCON','HMZAN','CROA']
      });      
  }

  buscaPrefeitos(){

    this.setState({
          
      orgaos: ['GP', 'GVP']
    });      
  }

  buscaRegionais(){

    this.setState({
          
      orgaos: ['SER I', 'SER II', 'SER III', 'SER IV', 'SER V', 'SER VI']
    });      
  }

  render() {
    return (
      <Container>
        <hr />
        <Row>
          <Col style={{ textAlign:"center" }} >
            <img src={Logo} alt="" width="100px" />
          </Col>          
          <Col style={{ textAlign:"center"}}  >            
            Quanto os órgãos da prefeitura de Fortaleza pagam para a Cagece?
          </Col>
        </Row>
        <Row>
          <hr/>
          
        </Row>
        <hr/>
        <Row>
          <Col xs="6" md="3" style={{padding:"10px"}} >
            <DatePicker
                selected={this.state.dataIncial}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataIncial}
            />                          
          </Col>
          <Col xs="6" md="3" style={{padding:"10px"}} >
            <DatePicker
                selected={this.state.dataFinal}
                dateFormat="dd/MM/yyyy"
                onChange={this.informaDataFinal}
            />
          </Col>
          <Col xs="12" md="6" style={{padding:"10px"}} >
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
          <Col xs="12" md="3"style={{padding:"10px"}}>
            <Button
                onClick = {this.inicio}
                size="lg"
                block
              > Início </Button>
          </Col>
          <Col xs="12" md="3"style={{padding:"10px"}}>
            <Button
              onClick = {this.buscaHospitais}
              size="lg"
              block
            > Hospitais </Button>
          </Col>
          <Col xs="12" md="3"style={{padding:"10px"}}>          
            <Button
              onClick = {this.buscaPrefeitos}
              size="lg"
              block
            > Prefeitos </Button>
          </Col>
          <Col xs="12" md="3" style={{padding:"10px"}} >          
            <Button
              onClick = {this.buscaRegionais}
              size="lg"
              block
            > Regionais </Button>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Card>
            <BarraTotal 
                mesAnoInicial={this.state.mesAnoInicial} 
                mesAnoFinal={this.state.mesAnoFinal} 
                orgaos = { this.state.orgaos }
              ></BarraTotal>
              
            </Card>            
          </Col>
          <Col>
          <Card>
              <Barra 
                mesAnoInicial = { this.state.mesAnoInicial } 
                mesAnoFinal = { this.state.mesAnoFinal }
                orgaos = { this.state.orgaos }
              ></Barra>
            </Card>            
          </Col>
        </Row>        
      </Container>
    );
  }
}
