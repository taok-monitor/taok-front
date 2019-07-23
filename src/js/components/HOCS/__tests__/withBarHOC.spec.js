/* eslint-disable react/prop-types */
import React from 'react';
import { render, wait, cleanup, fireEvent } from '@testing-library/react';
import { withBarHOC, getFormattedLabel } from '../withBarHOC';
import * as Util from '../../Util';

jest.mock('axios', () => ({
    get: () => {
        return Promise.resolve({
            data: [
                {
                    labels: ['HMZAN'],
                    valores: [46445.82],
                },
            ],
        });
    },
}));

const defaultProps = {
    orgaos: [],
    mesAnoInicial: '062019',
    mesAnoFinal: '072019',
    api: 'somewhere.com',
};

const tooltipItem = {
    index: 0,
    datasetIndex: 0,
};

const data = {
    labels: ['IJF'],
    datasets: [
        {
            data: [1000],
        },
    ],
};

/**
 * This is a fake component for us simulate the behaviour from
 * `withBarHOC`.
 */
const MockedBar = withBarHOC(
    class extends React.Component {
        constructor() {
            super();

            this.state = {};
            this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        }

        handleOnMouseEnter() {
            this.setState({
                formattedLabel: this.props.getFormattedLabel(tooltipItem, data),
            });
        }

        render() {
            return (
                <div>
                    <p>Total acumulado: {this.props.totalAcumulado}</p>
                    <p>Mes e ano inicial: {this.props.mesAnoInicial}</p>
                    <p>Mes e ano final: {this.props.mesAnoFinal}</p>
                    <button
                        type="button"
                        onMouseEnter={this.handleOnMouseEnter}
                    >
                        onMouseEnter to call getFormattedLabel
                    </button>
                    {this.state.formattedLabel && (
                        <p>{this.state.formattedLabel}</p>
                    )}
                </div>
            );
        }
    }
);

afterEach(cleanup);

describe('withBarHOC', () => {
    it('should render correctly and pass props down', async () => {
        const { container, getByText } = render(
            <MockedBar {...defaultProps} />
        );

        await wait(() => {
            expect(
                getByText('Total acumulado: R$ 46.445,82')
            ).toBeInTheDocument();
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('should get data again when props change', async () => {
        const { rerender, container, getByText } = render(
            <MockedBar {...defaultProps} />
        );

        await wait(() => {
            expect(
                getByText('Total acumulado: R$ 46.445,82')
            ).toBeInTheDocument();
            expect(getByText('Mes e ano inicial: 062019')).toBeInTheDocument();
            expect(getByText('Mes e ano final: 072019')).toBeInTheDocument();
            expect(container.firstChild).toMatchSnapshot();
        });

        rerender(
            <MockedBar
                {...defaultProps}
                mesAnoInicial="072019"
                mesAnoFinal="082019"
            />
        );

        await wait(() => {
            expect(getByText('Mes e ano inicial: 072019')).toBeInTheDocument();
            expect(getByText('Mes e ano final: 082019')).toBeInTheDocument();
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('should call `getFormattedLabel` onMouseEnter', async () => {
        const { container, getByText } = render(
            <MockedBar {...defaultProps} />
        );

        const button = getByText('onMouseEnter to call getFormattedLabel');

        fireEvent.mouseEnter(button);

        await wait(() => {
            expect(
                getByText(getFormattedLabel(tooltipItem, data))
            ).toBeInTheDocument();
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
