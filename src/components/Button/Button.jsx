import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
	${({beBlock}) => !beBlock ? `
	display: inline-block;
	vertical-align: middle;
	` : `margin: 20px auto;`}
	text-align: center;
	cursor: pointer;
	outline: none;
	min-width: 100px;
	height: 34px;
	line-height: 34px;
	color: #fff;
	background-color: #2dd;
	border-radius: 10px;
	width: 10%;
	&:hover{
		background-color: #11d;
	}
	${({cssStr}) => cssStr || ''}
`;

export default ({
                    className = '',
                    func,
                    onHover = () => {
                    },
                    beBlock,
                    ...props
                }) => {
    return (
        <Button
            {...props}
            beBlock={beBlock}
            func={func || onHover}
            onMouseEnter={onHover}/>

    )
};
