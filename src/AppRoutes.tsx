import * as React from 'react';
import { Route, Switch } from 'react-router';
import DrawFromFanTrainer from './pages/DrawFromFanTrainer';

export default () => (
    <Switch>
        <Route path="/" exact={true} component={DrawFromFanTrainer} />
        <Route path="/drawfromfan" component={DrawFromFanTrainer} />
    </Switch>
);
