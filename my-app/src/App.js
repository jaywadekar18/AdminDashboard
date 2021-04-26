import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Members from './Member/Members';
import Pass_conform_Admin from './Password_Comformation/Pass_conform_Admin.js'
import Pass_conform_Service from './Password_Comformation/Pass_conform_Service'
import login from './login/Login';
import Service_partner from './Service/Service-partners'
import Categories from './Category/Categories'
import Service from './Service/Services'
import Privateroute from './Routes/Privateroute'
import { createBrowserHistory } from "history"; 

const hist = createBrowserHistory();


function App() {
  return (

    <Router>
      <Switch>
        <Privateroute exact path="/admin/categories" component={Categories} />
        <Privateroute exact path="/admin/members" component={Members} />
        <Privateroute exact path="/admin/service-partners" component={Service_partner} />
        <Privateroute exact path="/admin/services" component={Service} />

        <Route exact path="/admin/pass_conform" component={Pass_conform_Admin} />
        <Route exact path="/service/pass_conform" component={Pass_conform_Service} />
        <Route exact path="/login" component={login} />

        <Redirect from="/" to="/login" />
      </Switch>
    </Router>

  )
}

export default App;
