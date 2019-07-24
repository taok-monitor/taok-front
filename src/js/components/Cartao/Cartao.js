import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const Cartao = ({ orgao, valor }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>{orgao}</CardTitle>
                <CardText>{valor}</CardText>
            </CardBody>
        </Card>
    );
};

Cartao.propTypes = {
    orgao: PropTypes.string.isRequired,
    valor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Cartao;
