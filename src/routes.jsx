import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import AppContainer from './App';

import UserList from './components/Users'
import CompanySubscriptionList from './components/CompanySubscriptions'

const styles = {
    menu: { width: '20%', float: 'left'},
    menuUl: { listStyle: 'none'},
    content: { width: '80%', float: 'left'}
}
const Routes = (
    <Router>
        <div>
            <div style={styles.menu}>
                <ul style={styles.menuUl}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/plans">Plans</Link></li>
                    <li><Link to="/subscribers">Subscribers</Link></li>
                </ul>
            </div>
            <div style={styles.content}>
                <Route exact path="/" component={AppContainer} />
                <Route path="/plans" component={CompanySubscriptionList} />
                <Route path="/subscribers" component={UserList} />
            </div>
        </div>
    </Router>
);

export default Routes;