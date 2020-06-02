import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { FetchInventary } from './components/FetchInventary';
import { AddProduct } from './components/AddProduct';
import { AddSupplier } from './components/AddSupplier';
import { UpdateProduct } from './components/UpdateProduct';
import { FetchSupplier } from './components/FetchSupplier';

import './custom.css';
import './css/button-span.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <AuthorizeRoute path='/supplier' component={FetchSupplier} />
            <AuthorizeRoute path='/addsupplier' component={AddSupplier} />
            <AuthorizeRoute path='/inventary' component={FetchInventary} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <AuthorizeRoute path='/addproduct' component={AddProduct} />
            <AuthorizeRoute path='/updateproduct/:code/:size/:color' component={UpdateProduct} />
      </Layout>
    );
  }
}
