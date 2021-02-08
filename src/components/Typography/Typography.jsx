import styled from 'styled-components';

export default styled.span`
	color: ${({ color }) => color || 'inherit'};
    font-family: ${({fontWeight = 'Demi'}) => `'Avenir${fontWeight}', 'Tahoma'`};
    font-size: 10px;
    ${({cssStr}) => cssStr || ''}
`;
