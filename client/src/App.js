import { BrowserRouter as Router, Switch,Route} from 'react-router-dom'

/*Routing
*========= */
import PrivateRoute from "./components/routing/PrivateRoute";

/*Screens
*========= */

import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Header from "./components/screens/Header";
import Blog from "./components/screens/Blog";
import axios from "axios";
import DetailPostScreen from "./components/screens/DetailPostScreen";
import UpdatePost from "./components/screens/UpdatePost";

/*console.log( localStorage.getItem('authToken')!=null)*/

const App = () => {
  return (
      <Router>

        <div className={"app"}>

          <Switch>

              <PrivateRoute exact path={'/'} component={PrivateScreen}/>
            <Route exact path={'/login'} component={LoginScreen}/>
            <Route exact path={'/register'} component={RegisterScreen}/>
            <Route exact path={'/forgot-password'} component={ForgotPasswordScreen}/>
            <Route exact path={'/reset-password/:resetToken'} component={ResetPasswordScreen}/>
              <Route exact path={'/:id'} component={Blog}/>
              <Route exact path={'/post/:id'} component={DetailPostScreen}/>
              <Route exact path={'/post/update/:id'} component={UpdatePost}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
