import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'teste',
      senha:''    
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    // this.setState({
    //   [event.target.id]: event.target.value
    // });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state);
    event.preventDefault();
  }

  render() {
    return (
      <Bar
        data={
          {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
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