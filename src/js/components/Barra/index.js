import React, {Component} from 'react';
import { Row, Col, Table} from 'reactstrap';
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

      axios.get(`https://api.inlinesoft.com.br/taok-api/inicial/${mesAnoInicial}/${mesAnoFinal}?${orgaosFormatados}`).then(res => {
          
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

    encontraLegenda(label){
      const legendas = [
        {
          label:"FME",
          legenda:"Fundo Municipal de Educação"
        },
        {
          label:"HDEAYRE",
          legenda:"Frotinha do Ant Bezerra"
        },
        {
          label:"HDMSJB",
          legenda:"Frotinha da Parangaba"
        },
        {
          label:"HDNSCON",
          legenda:"Hosp. Nossa Sra Cj Ceará"
        },
        {
          label:"HEBO",
          legenda:"Frotinha da Messajana"
        },
        {
          label:"HDGM/ME",
          legenda:"Gonzaginha da Messajana"
        },
        {
          label:"GP",
          legenda:"Gabinete do Prefeito"
        },
        {
          label:"GVP",
          legenda:"Gabinete do Vice Prefeito"
        }
      ] 

      var teste = legendas.find( l => {
        return l.label == label;
      } )

      if( teste != undefined ){

        return teste.legenda;
      }
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
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Sigla</th>
                    <th>Legenda</th>
                  </tr>
                </thead>
                <tbody> 
                  {this.state.labels.map((i, index) => {
                    return <tr key={index}>                    
                            <td key={index + 1}>{i}</td>
                            <td key={index + 2}>{this.encontraLegenda(i)}</td>
                          </tr>
                  })}               
                </tbody>
              </Table>
            </Col>
          </Row>
            
        </div>
                  
      );
    }
}