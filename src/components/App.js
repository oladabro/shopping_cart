import Basket from './Basket';
import NavBar from './NavBar';
import OrderSubmitted from './OrderSubmitted';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BasketContextProvider from '../context/BasketContext';

function App() {
  return (
    <BasketContextProvider>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <NavBar />
              <Basket />
            </Route>
            <Route path='/submitted'>
              <OrderSubmitted />
            </Route>
          </Switch>
        </div>
      </Router>
    </BasketContextProvider>
  );
}

export default App;
