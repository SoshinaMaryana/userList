import React, {memo, useEffect,} from 'react';
import styled from 'styled-components';
import {
    TableWrap,
    TableRow,
    TableCell
} from '../../../../components/Table';
import {Typography} from '../../../../components/Typography';
import {withRouter} from 'react-router-dom';
import Store from "../../../../services/Store";
import {deleteUser} from "../../../../utils";

const Wraper = styled.div`
	position: relative;
`;
const User = withRouter(memo(({info, title, history}) => {
    const titles = Object.keys(info);

    const renderRow = () => {
        return titles.map((item, i) => {
            return (<>
                {item !== 'id' ? !!title  ? <TableCell key={`row-${i}-1`} cssStr={{
                        backgroundColor: '#11d',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        <Typography>
                            {item}
                        </Typography>
                    </TableCell> :
                    <TableCell key={`row-${i}-2`}>
                        <Typography>
                            {info[item]}
                        </Typography>
                    </TableCell> : ''}
            </>)
        })
    };
    const showUserInfo = () => {
        Store.setActionItem('activeUser')(Store.store.dispatch)({id: info.id});
        history.push('/cab')
    }
    const clearUser = () => {
        deleteUser(info.id)
    }

    return <TableWrap key={info.id} userId={info.id} needDeleteButton={!title} deleteCallback={clearUser} needEditButton={false}>
        <TableRow  onClick={showUserInfo} needHover>
            {titles.length > 0 &&
            renderRow()
            }
        </TableRow>
    </TableWrap>

}));

export default User;
