import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

export default class Barra extends Component {

    constructor(props) {
        super(props);

        this.state = {
          labels: [],
          valores: [],
          mesAnoInicial : props.mesAnoInicial,
          mesAnoFinal : props.mesAnoFinal
        };

        this.obtemDados = this.obtemDados.bind(this);        
    }

    componentWillReceiveProps(props) {
      console.log("receive propos ");
      console.log(props);
      
      
      this.setState({ 
        mesAnoInicial: props.mesAnoInicial,
        mesAnoFinal : props.mesAnoFinal 
      })

      this.obtemDados(props.mesAnoInicial, props.mesAnoFinal);
    }

    componentDidMount() {

      this.obtemDados(this.state.mesAnoInicial, this.state.mesAnoFinal);        
    }

    obtemDados(mesAnoInicial, mesAnoFinal){

      axios.get(`http://localhost:8080/taok-backend/inicial/${mesAnoInicial}/${mesAnoFinal}`).then(res => {
          
    
          this.setState({
            labels: res.data[0].labels,
            valores: res.data[0].valores
          });
    
          console.log(this.state);
      
        });
    }

    render() {
      return (
          <Bar
              data={
                {
                  labels: this.state.labels,
                  datasets: [{
                    label: "Orgãos que mais consumiram",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
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
      );
    }
}