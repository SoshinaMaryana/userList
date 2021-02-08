import {memo} from 'react';
import {connect} from 'react-redux';
import User from './User';

const Users = connect((state) => {
    const {
        list
    } = state;

    return {
        list
    };
})(memo(({
             list
         }) => {

    const renderItems = () => {
        return list.list.map((item, i) => {
            const {id, first_name, last_name, birth_date} = item;
            let shortItem = {
                id, first_name, last_name, birth_date
            }
            return (
                <User info={shortItem} />
            )
        });
    };

    const renderTitles = () => {
        const {id, first_name, last_name, birth_date} = list.list[0];
        let shortItem = {
            id, first_name, last_name, birth_date
        }
        return <User title info={shortItem}/>
    };

    return <>
        {list?.list?.length > 0 &&
        <>
            {renderTitles()}
            {renderItems()}
        </>

        }
    </>
}));

export default Users;
