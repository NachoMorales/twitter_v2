import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TweetDetails from './TweetDetails';
import NotFound from './NotFound';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import CheckIfLogedRoute from './CheckIfLogedRoute';

function App() {

  return (
    <Router>
      <AuthProvider>
        <FirebaseDatabaseProvider>
          <div className="App">
            <div className="content">
              <Switch>
                <CheckIfLogedRoute exact path="/" component={Signup} />
                <CheckIfLogedRoute exact path="/login" component={Login} />
                <CheckIfLogedRoute exact path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/user/:user" component={Profile} />
                <Route path="/user/:user/:id">
                  <TweetDetails />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </div>
        </FirebaseDatabaseProvider>
      </AuthProvider>
    </Router>
  
  );
}

export default App;
