import * as React from 'react';
import { Route, Switch } from 'react-router';
import DrawFromFanTrainer from './pages/DrawFromFanTrainer';
import DeckOrder from './pages/DeckOrder';

export default () => (
    <Switch>
        <Route path="/" exact={true} component={DeckOrder} />
        <Route path="/drawfromfan" component={DrawFromFanTrainer} />
    </Switch>
);
