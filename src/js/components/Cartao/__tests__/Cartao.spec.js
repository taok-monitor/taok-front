import React from 'react';
import { render } from '@testing-library/react';

import Cartao from '../Cartao';

describe('<Cartao />', () => {
    it('should render correctly with props', () => {
        const props = {
            orgao: 'Hospital Geral',
            valor: '50000',
        };

        const { container, getByText } = render(<Cartao {...props} />);

        expect(getByText(props.valor)).toBeInTheDocument();
        expect(getByText(props.orgao)).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });
});
