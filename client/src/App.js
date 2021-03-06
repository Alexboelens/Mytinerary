import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cities from './components/Cities'
import Mytineraries from './components/Mytineraries'
import store from './components/redux/store'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount';
import Favourites from './components/Favourites'

class App extends React.Component{
 
  render(){
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="website-container">

        <Navbar />
    

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/cities' component={Cities}/>
        <Route path='/cities/mytineraries' component={Mytineraries}/>
        <Route path='/cities/:city' component={Mytineraries} />
        <Route path='/user/register' component={CreateAccount} />
        <Route path='/user/favourites' component={Favourites} />
        <Route exact path='/user/login' component={Login} />
        <Route exact path='/google/auth/redirect' component={Home} />

      </Switch>
     </div>
     </BrowserRouter>
     </Provider>
    );
  }
 
}


export default App;
