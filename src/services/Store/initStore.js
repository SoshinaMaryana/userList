import Store from './index';
import UsersList from "../../routes/List/usersList.json";

export default function () {
	new Store([
		// Store.reducerItem('focus', initFocusProps),
		Store.reducerItem('list', {list: UsersList.list}),
		Store.reducerItem('activeUser', {id: "1"}),
		Store.reducerItem('info', {}),
	])
}
