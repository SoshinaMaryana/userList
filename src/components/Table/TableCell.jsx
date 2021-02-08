import styled from 'styled-components';

export default styled.td`
    padding: ${({collapse}) => collapse ? 0 : '8px 20px'};
    box-sizing: border-box;
    width: 100px;
    ${({cssStr}) => cssStr || ''}
`;