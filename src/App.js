import './App.css';
import LogIn from './containers/LogIn/LogIn';
import SignUp from './containers/SignUp/SignUp';
import Tracking from './containers/Tracking/Tracking';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import UpdateProfile from './containers/UpdateProfile/UpdateProfile';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import PrivateRoute from './containers/PrivateRoute';


function App() {
  return (
    <Router basename="/HabitTracker">
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={LogIn}/>
          <Route path="/signUp" component={SignUp}  />
          <PrivateRoute path="/updateProfile" component={UpdateProfile}  />
          <PrivateRoute path='/tracking' component={Tracking}  />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>

  );
}

export default App;
