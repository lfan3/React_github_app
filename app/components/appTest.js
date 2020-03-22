import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import React from 'react'

const Home = ()=>(
    <h1>Home</h1>
)

const WillMatch = ()=> <h3>Matched</h3>

const NoMatch = (({location})=>(
    <div>
        <h3>No Match for <code>{location.pathname}</code></h3>
    </div>
))

class App extends React.Component {
    render() {
        return(
            <Router>
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/will-match'>will match</Link></li>
                    <li><Link to='/will-not-match'>will not match</Link></li>
                    <li><Link to='/also/will/not/match'>Also will not match</Link></li>
                </ul>
                <Switch>
                    <Route exact path='/' exact component = {Home}/>
                    <Route exact path='/will-match' component={WillMatch}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
            </Router>
        )
   
    }
}

export default App