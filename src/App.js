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
import AnswerDetails from './AnswerDetails'
import Followers from './Followers'
import Following from './Following';

function App() {

  return (
    <Router>
      <AuthProvider>
        <FirebaseDatabaseProvider>
          <div className="App">
              <Switch>
                <CheckIfLogedRoute exact path="/" component={Signup} />
                <CheckIfLogedRoute exact path="/login" component={Login} />
                <CheckIfLogedRoute exact path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/user/:user" component={Profile} />
                <PrivateRoute exact path="/user/:user/followers" component={Followers} />
                <PrivateRoute exact path="/user/:user/following" component={Following} />
                <PrivateRoute exact path="/user/:user/:id" component={TweetDetails} />
                <PrivateRoute exact path="/user/:user/:id/:answerId" component={AnswerDetails} />
                <PrivateRoute path="*" component={NotFound} />
              </Switch>
          </div>
        </FirebaseDatabaseProvider>
      </AuthProvider>
    </Router>
  
  );
}

export default App;
