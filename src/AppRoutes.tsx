import * as React from 'react';
import { Route, Switch } from 'react-router';
import DrawFromFanTrainer from './pages/DrawFromFanTrainer';
import DeckOrder from './pages/DeckOrder';
import OneShotTrainer from './pages/OneShotTrainer';
import WhichIsTrainer from './pages/WhichIsTrainer';

export default () => (
  <Switch>
    <Route path="/" component={WhichIsTrainer} />
    <Route path="/order" exact={true} component={DeckOrder} />
    <Route path="/drawfromfan" component={DrawFromFanTrainer} />
    <Route path="/oneshot" component={OneShotTrainer} />
  </Switch>
);
