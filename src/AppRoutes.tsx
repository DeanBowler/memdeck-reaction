import * as React from 'react';
import { Route, Switch } from 'react-router';
import DrawFromFanTrainer from './pages/DrawFromFanTrainer';
import DeckOrder from './pages/DeckOrder';
import OneShotTrainer from './pages/OneShotTrainer';
import WhichIsTrainer from './pages/WhichIsTrainer';
import WordRecall from './pages/WordRecall';
import Settings from './pages/Settings';

export default () => (
  <Switch>
    <Route path="/" exact={true} component={WhichIsTrainer} />
    <Route path="/order" exact={true} component={DeckOrder} />
    <Route path="/drawfromfan" component={DrawFromFanTrainer} />
    <Route path="/oneshot" component={OneShotTrainer} />
    <Route path="/whichis" exact={true} component={WhichIsTrainer} />
    <Route path="/wordrecall" exact={true} component={WordRecall} />
    <Route path="/settings" exact={true} component={Settings} />
  </Switch>
);
