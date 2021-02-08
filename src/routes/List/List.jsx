import {memo, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {loadInfo} from "../../utils";
import Users from './modules/Users';
import Button from '../../components/Button/Button';
import {withRouter} from 'react-router-dom';
import Store from "../../services/Store";

const Wrap = styled.div`
    position: relative;
	height: 40px;
	padding-top: 20px;
	width: 600px;
	margin: 0 auto;
`;
const Title = styled.h1`
    text-align: center;
    width: 600px;
	margin-left: auto;
	margin-right: auto;
`;

const List = withRouter(memo(({history}) => {

    useEffect(() => {
        loadInfo();

    }, []);


    return <>
        <Title>Common List</Title>
        <Users/>
        <Wrap>
            <Button style={{display: 'block', margin: '0 auto'}} onClick={() => {
                Store.setActionItem('activeUser')(Store.store.dispatch)({id: undefined});
                history.push('/form')
            }}>add new user</Button>
        </Wrap>

    </>

}));

export default List;
