import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

import Cartao from '../Cartao';
import { withBarHOC } from '../HOCS/withBarHOC';

function Barra(props) {
    const { labels, valores, totalAcumulado, getFormattedLabel } = props;

    return (
        <Fragment>
            <Row>
                <Col>
                    <Bar
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: '5 Orgãos que mais consumiram',
                                    backgroundColor: '#6c757d',
                                    borderColor: '#6c757d',
                                    data: valores,
                                },
                            ],
                        }}
                        width={100}
                        height={200}
                        options={{
                            maintainAspectRatio: false,
                            tooltips: {
                                callbacks: {
                                    label: getFormattedLabel,
                                },
                            },
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Cartao
                        orgao="Total dos 5 Maiores"
                        valor={totalAcumulado}
                    />
                </Col>
            </Row>
        </Fragment>
    );
}

Barra.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    valores: PropTypes.arrayOf(PropTypes.any).isRequired,
    totalAcumulado: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    getFormattedLabel: PropTypes.func.isRequired,
};

export default withBarHOC(Barra);
