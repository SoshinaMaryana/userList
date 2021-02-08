import HTTPRequest from '../services/HTTPRequest/HTTPRequest';
import Store from '../services/Store';
import UsersList from '../routes/List/usersList.json';

export default async () => {
    const request = new HTTPRequest();
    let newList = [];
    try {
        newList = await request.getData('contact/');
    } catch {
        Store.setActionItem('info')(Store.store.dispatch)({message: 'Server is unavailable now. You use local data.'});
        const list = Store.store.getState()?.list?.list;
        newList = !list ? UsersList.list : list;
    }
    Store.setActionItem('list')(Store.store.dispatch)({list: newList});

}