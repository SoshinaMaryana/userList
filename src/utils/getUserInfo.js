import HTTPRequest from '../services/HTTPRequest/HTTPRequest';
import Store from '../services/Store';
import UsersList from '../routes/List/usersList.json';

export default async (id) => {
    const request = new HTTPRequest();
    try {
         return await request.getData(`contact/:${id}`);
    } catch {
        Store.setActionItem('info')(Store.store.dispatch)({message: 'Server is unavailable now. You use local data.'});
        const list = Store.store.getState().list.list;
        for(let i = list.length; i--;) {
            if (list[i].id === id) {
                return list[i]
            }
        }
    }

}