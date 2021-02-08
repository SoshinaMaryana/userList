import HTTPRequest from '../services/HTTPRequest/HTTPRequest';
import Store from '../services/Store';
import UsersList from '../routes/List/usersList.json';

export default async (id, data, isNew, goBack = () => {}) => {
    const request = new HTTPRequest();
    let res;
    try {
        res = isNew ? await request.postData('contact/', data) : await request.putData(`contact/:${id}`, data);
        goBack();
    } catch {
        Store.setActionItem('info')(Store.store.dispatch)({message: 'Server is unavailable now. You use local data.'});
        const list = Store.store.getState().list.list;
        let newList = [];
        if (isNew)
            newList = [...list, data]
        else {
            for(let i = list.length; i--;) {
                if (list[i].id === id) {
                    newList.push(data)
                } else {
                    newList.push(list[i])
                }
            }
        }
        Store.setActionItem('list')(Store.store.dispatch)({list: newList});
        //setTimeout(() => {goBack()},0)
        goBack();
    }


}