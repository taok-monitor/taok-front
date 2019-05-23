import React from 'react';
import { Card, CardText, CardBody,CardTitle } from 'reactstrap';

const Cartao = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{props.orgao}</CardTitle>
          <CardText>{ props.valor }</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cartao;
