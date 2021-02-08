import styled from 'styled-components';
import {connect} from "react-redux";
import {memo} from "react";

const Title = styled.span`
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
	color: red;
    font-size: 10px;
`;

const Message = connect((state) => {
    const {
        info: {message}
    } = state;

    return {
        message
    };
})(memo(({
             message
         }) => {
    return <Title>{message}</Title>

}));
export default Message;