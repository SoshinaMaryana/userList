import React, {memo, useEffect, useState} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {TableCell, TableWrap, TableRow} from "../../components/Table";
import {Typography} from "../../components/Typography";
import {withRouter} from 'react-router-dom';
import {deleteUser, getUserInfo} from "../../utils";

const Title= styled.h1`
   text-align: center;
`;

const Cab = connect((state) => {
    const {
        activeUser: {id}
    } = state;

    return {
        id
    };
})(withRouter(memo(({
                        id,
                        history
                    }) => {
    const [userInfo, setUserInfo] = useState({});

    const editUser = () => {
        history.push('/form')
    };
    const clearUser = () => {
        deleteUser(id);
        history.goBack();
    }

    useEffect(async() => {
        const info = await getUserInfo(id);
        setUserInfo(info);
    }, []);

    const renderRow = () => {
        return Object.keys(userInfo).map((item, i) => {
            return (<>
                {item !== 'id' && <TableRow>
                    <TableCell key={`row-${i}-1`} cssStr={{
                        backgroundColor: '#11d',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        <Typography>
                            {item}
                        </Typography>
                    </TableCell>
                    <TableCell key={`row-${i}-2`} cssStr={{border: '1px solid #1df',width: '200px' }}>
                        <Typography>
                            {userInfo[item]}
                        </Typography>
                    </TableCell>
                </TableRow>}
            </>)
        })
    };

    return <>
        <Title>User Info</Title>
        {!!userInfo && <TableWrap key={userInfo.id} needDeleteButton needEditButton deleteCallback={clearUser} editCallback={editUser}>
        {renderRow()}
    </TableWrap>}</>
})));

export default Cab;
