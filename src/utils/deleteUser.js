import HTTPRequest from '../services/HTTPRequest/HTTPRequest';
import Store from '../services/Store';
import loadInfo from "./loadInfo";

export default async (id) => {
    const request = new HTTPRequest();
    try {
        await request.deleteData(`contact/:${id}`);
        await loadInfo()
    } catch {
        const list = Store.store.getState().list.list;
        const newList = [];
        for(let i = list.length; i--;) {
            if (list[i].id !== id) {
                newList.push(list[i]);
            }
        }
        Store.setActionItem('list')(Store.store.dispatch)({list: newList});
    }
};