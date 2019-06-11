import React, {Component} from 'react';
import { Row, Col} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import * as Util from '../Util'
import Cartao from '../Cartao'

export default class Barra extends Component {

    constructor(props) {
        super(props);

        this.state = {
          labels: [],
          valores: [],
          orgaos: props.orgaos,
          mesAnoInicial : props.mesAnoInicial,
          mesAnoFinal : props.mesAnoFinal,
          totalAcumulado : 0
        };

        this.obtemDados = this.obtemDados.bind(this);        
    }

    componentWillReceiveProps(props) {
      
      this.setState({ 
        mesAnoInicial: props.mesAnoInicial,
        mesAnoFinal : props.mesAnoFinal,
        orgaos: props.orgaos 
      })

      this.obtemDados(props.mesAnoInicial, props.mesAnoFinal, props.orgaos);
    }

    componentDidMount() {

      this.obtemDados(this.state.mesAnoInicial, this.state.mesAnoFinal, this.state.orgaos);        
    }

    obtemDados(mesAnoInicial, mesAnoFinal, orgaos){

      var orgaosFormatados = Util.preparaParametrosDeOrgaos(orgaos);

      axios.get(`http://localhost:8080/taok-backend/inicial/${mesAnoInicial}/${mesAnoFinal}?${orgaosFormatados}`).then(res => {
          
          this.calculaAcumulado(res.data[0].valores);

          this.setState({
            labels: res.data[0].labels,
            valores: res.data[0].valores
          });  
        });
    }

    calculaAcumulado(valores){

      var total = 0.0;
      for( var item in valores ){
        
        total += valores[item];        
      }      

      this.setState({
        totalAcumulado : Util.formataParaReal(total)
      });  
      
    }

    render() {
      return (
        <div>
          <Row>
            <Col>
              <Bar
                data={
                  {
                    labels: this.state.labels,
                    datasets: [{
                      label: "5 Orgãos que mais consumiram",
                      backgroundColor: '#6c757d',
                      borderColor: '#6c757d',
                      data: this.state.valores,
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
                <Cartao
                  orgao = 'Total dos 5 Maiores'
                  valor = {this.state.totalAcumulado}
                ></Cartao>
            </Col>            
          </Row>
            
        </div>
                  
      );
    }
}