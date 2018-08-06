import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Auction from './components/Auctions';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Winners from './components/Winners';

export const routes = <Layout>
    <Route exact path='/' component={Auction} />
    <Route path='/winners' component={Winners} />
</Layout>;
