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

        console.log("Constructor barra");
        console.log(props);        
    }

    componentWillUpdate(){

      console.log("Atualiza barra 2");     
    }

    componentDidMount() {

      console.log("Componente changed");
      

        axios.get(`http://localhost:8080/taok-backend/inicial/012019/${this.state.mesAnoFinal}`).then(res => {
          
    
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