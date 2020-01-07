import Home from "../home/Home.js";
import UserHome from "../user/UserHome.js";
import AddExpensive from "..//Expensive/AddExpensive.js";
import Login from "../Auth/Login.js";
import SignUp from "../Auth/SignUp.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header.js";
import CurrentMonthStatus from "../pages/Status/CurrentMonthStatus";
import ExpendatureDetails from "../pages/Expensive/ExpendatureDetails.js";
import SelecteMonthExpendature from '../pages/Expensive/SelectedMonthExpendature/SelecteMonthExpendature.js'
export default function Router() {
  function routChange() {
  }

  return (
    <Header>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/userhome" component={UserHome} />
          <Route exact path="/addexpensive" component={AddExpensive} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/user/expendaturedetail"
            component={ExpendatureDetails}
          />
          <Route
            exact
            path="/user/selectmonth"
            component={ExpendatureDetails}
          />
          <Route
            exact
            path="/user/monthStatus"
            component={CurrentMonthStatus}
          />
        </Switch>
      </Router>
    </Header>
  );
}
