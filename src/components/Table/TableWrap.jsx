import React from 'react';
import {Table} from "./index";
import Button from "../Button/Button";
import styled from "styled-components";

const Wraper = styled.div`
	position: relative;
	width: 600px;
	margin: ${({needMargin}) => needMargin ? '10%' : '0'} auto 0;
`;
const TableWrap = ({ children, userId, needDeleteButton, needEditButton, editCallback = () => {}, deleteCallback= () => {} }, ...props) => {
    return (
        <Wraper key={props.key} needMargin={!needDeleteButton}>
            <Table style={{borderCollapse: 'collapse'}} beTable={needEditButton}>
                {children}
            </Table>
            {!!needDeleteButton && <Button onClick={deleteCallback} beBlock={!!needEditButton}>delete user</Button>}
            {!!needEditButton && <Button onClick={editCallback} beBlock={!!needEditButton}>edit user</Button>}
        </Wraper>
	);
};

export default TableWrap;
