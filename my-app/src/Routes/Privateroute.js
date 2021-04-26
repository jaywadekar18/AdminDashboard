import React from 'react'; 
import {Route}  from 'react-router-dom';
import {withRouter} from 'react-router-dom'


const PrivateRoute = (props) => {
    const [auth, setAuth] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if(localStorage.auth) {
            setAuth(true)
            setLoaded(true)
        } else {
            setLoaded(true)
            props.history.push("/login")
        }
    },[props.auth]); 

    return (
        <React.Fragment>
            {loaded && auth &&
            <Route
                {...props}
                component={props.component} /> } 
        </React.Fragment>
    );
} 

export default withRouter((PrivateRoute));
  