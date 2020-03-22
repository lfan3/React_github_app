import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import {ThemeConsumer} from '../contexts/theme'
import {Link} from 'react-router-dom'

//learning how stat controle the output of submit
//1, onchange==taping, it will change the stats
//2, onsubmit will be controled by stats
// conclusion: the output of INPUT formulaire is controlled by stats
function Instructions(){
    return(
        <div className='instructions-container'>
            <h1 className='text-center header-lg'>
                Instructions
            </h1>
            <ThemeConsumer>
                {({theme})=>(
                    <ol className='container-sm grid center-text battle-instructions'>
                        <li>
                            <h3 className='header-sm'>Enter two Github users</h3>
                            <FaUserFriends className={`bg-${theme}`} color='rgb(255,191,116)' size={100}/>
                        </li>
                        <li>
                            <h3 className='header-sm'>Enter two Github users</h3>
                            <FaFighterJet className={`bg-${theme}`} color='#727272' size={100}/>
                        </li>
                        <li>
                            <h3 className='header-sm'>Enter two Github users</h3>
                            <FaTrophy className={`bg-${theme}`} color='{255, 215,0}' size={100}/>
                        </li>
                    </ol>
                )}
                
            </ThemeConsumer>

        </div>
    )
}

class PlayerInput extends React.Component {
    //mistake *** forget props in constructor's parameter
    constructor(props){
        super(props)
        this.state = {
            username : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }
    handleChange(event){
        /**mitake this.setState(), not this.setState = {} */
        this.setState({
            username : event.target.value
        })
    }
    render() {
        return(
            <ThemeConsumer>
                {({theme})=>(
                    <form className='column player' onSubmit={this.handleSubmit}>
                    <label htmlFor='username' className='player-label'>
                        {this.props.label}
                    </label>
                    <div className='row player-inputs'>
                    <input
                        type='text'
                        id='username'
                        className={`input-${theme}`}
                        placeholder='github username'
                        autoComplete='off'
                        value = {this.state.username}
                        //mistake *** not this.handleChange
                        onChange = {this.handleChange}
                    />
                    <button 
                        className={`btn btn-${theme}`}
                        type='submit'
                        disabled = {!this.state.username}
                    >
                    submit
                    </button>
                    </div>
                </form>
                )}
            </ThemeConsumer>

        )}
}

PlayerInput.propTypes = {
    //***mistake, isRequired, not isRequire */
    onSubmit : PropTypes.func.isRequired,
    label : PropTypes.string.isRequired
}

function PlayerPreview({username, onReset, label}){
    return(
        <div className='column player'>
            <h3 className='player-label'>
                {label}
            </h3>
            <div className = 'row bg-light'>
                <div className = 'player-info'>
                    <img
                        className='avatar-small'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={username}
                    />
                    <a
                        href = {`https://github.com/${username}`}
                        className='link'
                    >
                        {username}
                    </a>
                </div>
                <button className='btn-clear flex-center' onClick = {onReset}>
                   <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                </button>
            </div>
 
        </div>
    )
}

PlayerPreview.propTypes = {
    username : PropTypes.string.isRequired,
    onReset : PropTypes.func.isRequired,
    label : PropTypes.string.isRequired
}
export default class Battle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playerOne : null,
            playerTwo : null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSubmit(id, player){
        this.setState({
            [id] : player
        })
    }
    handleReset(id){
        this.setState({
            [id] : null
        })
    }
    render(){
        const {playerOne, playerTwo} = this.state    
        return(
            <React.Fragment>
                <Instructions />
                <div className = 'players-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className='row space-around'>
                        {playerOne === null ?
                        <PlayerInput
                            label='Player One'
                            onSubmit={(player)=>this.handleSubmit('playerOne', player)}
                        /> : 
                        <PlayerPreview
                            username = {playerOne}
                            onReset = {()=>this.handleReset('playerOne')}
                            label = 'player One'
                        />
                        }
                        {playerTwo === null ? 
                        <PlayerInput
                            label='Player Two'
                            onSubmit={(player)=>this.handleSubmit('playerTwo', player)}
                        /> :
                        <PlayerPreview
                            username = {playerTwo}
                            onReset = {()=>this.handleReset('playerTwo')}
                            label = 'player Two'
                        />
                        }
                    </div>
                    {playerOne && playerTwo && (
                       //mistake, can not change state like this, must use setState
                       // <button onClick = {(battle)=> ({battle : true})}> </button>
                        <Link
                            className = 'btn btn-dark btn-space'
                            to = {{
                                pathname: '/battle/result',
                                search:`?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                        >
                                Battle
                        </Link>
                    )}
                </div>
            </React.Fragment>
        )
    }
}