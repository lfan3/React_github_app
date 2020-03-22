import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import './index.css'
import {ThemeProvider} from './contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Results from './components/Results'

const NoMatch = ({location})=>(
        <div className='Error'>
            404 There is no Match for <code>{location.pathname}</code>
        </div>
)
class App extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            theme : 'light',
            //mistake ** toggleTheme is also a function, so add ()=>{}
            toggleTheme: ()=>{
                this.setState(({theme})=>({
                    theme : theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }
    render(){
        return(
            <Router>
                <ThemeProvider value = {this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav/>
                            <Switch>
                                <Route exact path='/' component={Popular}/>
                                <Route exact path='/battle' component={Battle}/>
                                <Route path='/battle/result' component={Results}/>
                                <Route render= {()=>(
                                    <h1>404 Page Not found</h1>
                                )}/>
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);