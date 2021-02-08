import './App.css';
import { PureComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import List from './routes/List';
import Cab from './routes/Cab';
import EditForm from './routes/Form';
import 	{Message} from './components/Message';

class App extends PureComponent {
    render = () => {
        return <Router>
            <Message/>
            <Switch>
                <Route exact path='/'>
                    <List/>
                </Route>
                <Route exact path='/cab'>
                    <Cab/>
                </Route>
                <Route exact path='/form'>
                    <EditForm/>
                </Route>
            </Switch>
        </Router>
    }
};
export default App;
