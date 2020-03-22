import React from 'react'
import {battle} from '../utils/api'
import PropTypes from 'prop-types'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import {Tooltip_Hover} from './Tooltip'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

function ProfileList({profile}){
    return(
        <ul className='card-list'>
                {profile.name && (
                    <li>
                        <FaUser color='rgb(239,115,115)' size={22}/>
                        {profile.name}
                    </li>
                )}
                {profile.location && (
                    <li>
                        <Tooltip_Hover text = 'User Location'>
                            <FaCompass color='rgb(239,115,115)' size={22}/>
                            {profile.location}
                        </Tooltip_Hover>
                    </li>
                )}
                {profile.company && (
                    <li>
                        <Tooltip_Hover text = 'User Company'>
                            <FaBriefcase color='rgb(239,115,115)' size={22}/>
                            {profile.company}
                        </Tooltip_Hover>
                    </li>
                )}
                {profile.followers && (
                    <li>
                        <FaUsers color='rgb(239,115,115)' size={22}/>
                        {profile.followers}
                    </li>
                )}
                {profile.following && (
                    <li>
                        <FaUserFriends color='rgb(239,115,115)' size={22}/>
                        {profile.following}
                    </li>
                )}
            </ul>
    )        
}

ProfileList.prototype = {
    name : PropTypes.object
}
export default class Results extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            winner : null,
            loser : null,
            error : null,
            loading : true
        }
    }
    componentDidMount(){
        //mistake **, the in order to get an answer from a promise, we need a .then
        //console.log(battle(this.props))
        const {playerOne, playerTwo} = queryString.parse(this.props.location.search)
        battle([playerOne, playerTwo])
            .then((sortedPlayer)=>{
                this.setState({
                    winner : sortedPlayer[0],
                    loser : sortedPlayer[1],
                    error : null,
                    loading : false
                })
            }).catch(( {message} )=>{
                this.setState({
                    //winner : null,
                    //loser : null,
                    error : {message},
                    loading : false
                })
            })
        // .then((sortedPlayer)=>console.log(sortedPlayer))
    }
    render(){
        const {winner, loser, error, loading} = this.state
        if(error)
            return <p className='center-text error'>{error}</p>
        if(loading)
            return <Loading text = 'battle' speed = '280'/>
        {console.log(this.state)}
        return(
            <React.Fragment>
            <div className='grid space-around container-sm'>
                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Winner'}
                    avatar = {winner.profile.avatar_url}
                    name = {winner.profile.login}
                    subheader = {winner.score.toLocaleString()}
                    href = {winner.profile.html_url}
                >
                    <ProfileList profile = {winner.profile}/>
                </Card>

                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Loser'}
                    avatar = {loser.profile.avatar_url}
                    name = {loser.profile.login}
                    subheader = {loser.score.toLocaleString()}
                    href = {loser.profile.html_url}
                >
                    <ProfileList profile = {loser.profile}/>
                </Card>
            </div>
            <Link to = '/battle'
            className='btn btn-dark btn-space' 
            >
                Reset
            </Link>
            </React.Fragment>
        )
    }
}