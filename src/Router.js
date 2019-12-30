import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage.jsx';
import Details from './pages/details.jsx';
import Admin from './pages/admin.jsx';

export default class Router extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/details" component={Details} />
                        <Route exact path="/admin" component={Admin} />

                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}



