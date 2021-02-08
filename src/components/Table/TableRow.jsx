import React from 'react';
import styled from "styled-components";

const StyledTr = styled.tr`
   ${({needHover}) =>needHover && `&:hover{color: #11d}`} ;
`;

const TableRow = ({ children, needHover, ...props }) => {
    return (
        <StyledTr needHover={needHover} {...props} >
            {children}
        </StyledTr>
	);
};

export default TableRow;
