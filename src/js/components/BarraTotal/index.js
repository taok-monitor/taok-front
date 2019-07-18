import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

import Cartao from '../Cartao';
import { withBarHOC } from '../HOCS/withBarHOC';

function BarraTotal(props) {
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
                                    label: 'Consumo total por mês',
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
                    <Cartao orgao="Total" valor={totalAcumulado} />
                </Col>
            </Row>
        </Fragment>
    );
}

BarraTotal.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    valores: PropTypes.arrayOf(PropTypes.any).isRequired,
    totalAcumulado: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    getFormattedLabel: PropTypes.func.isRequired,
};

export default withBarHOC(BarraTotal);
