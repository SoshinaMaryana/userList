import React from 'react';
import styled from "styled-components";

const StyledTable = styled.table`
   ${({beTable}) =>!beTable ? `
   	display: inline-block;
    vertical-align: middle` :
	`margin: 0 auto`
} ;
`;

export default ({ children, beTable, ...props }) => (
	<StyledTable beTable={beTable} { ...props } style={{}}>
		<thead></thead>
		<tbody>
			{children}
		</tbody>
	</StyledTable>
);
