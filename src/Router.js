import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage.jsx';
import Admin from './pages/admin.jsx';
import ProjectDetail from './pages/details.jsx';

export default class Router extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/admin" component={Admin} />
                        <Route path="/projects/:id" component={ProjectDetail} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}



