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
    
    console.log(date);
    console.log(this.formaData(date));
  
    console.log("------------");
    
    

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
