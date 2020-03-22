import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'
import Card from './Card'
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Loading from './Loading'
import {Tooltip_Hover} from './Tooltip'

function LanguagesNav({selectedL, updateLanguage}){
    let languages = ['All', 'js', 'phyton', 'c', 'java', 'c++', 'html', 'css']
    return(
        <ul className='flex-center'>
            {languages.map((language)=>(
                <li key = {language}>
                   <button 
                    className = 'btn-clear nav-link'
                    //this should be a function after onClick
                    onClick = {()=>updateLanguage(language)}
                    style = {language === selectedL ? { color : 'red'} : null}>
                       {language}
                   </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selectedL : PropTypes.string.isRequired,
    updateLanguage : PropTypes.func.isRequired
}

function ReposGrid({repos}){
    return(
        <div className = 'grid space-around'>
            {repos.map((repos,index)=>{
                const {name, owner, html_url, stargazers_count, forks, open_issues} = repos
                const {login, avatar_url} = owner

                return (
                    <Card 
                    key = {`#${index + 1}`}
                    header = {`#${index + 1}`}
                    avatar = {avatar_url}
                    name = {login}
                    href = {html_url}
                    >
                        <ul className='card-list'>
                            <li>
                                <Tooltip_Hover text = 'user name'>
                                    <FaUser color='rgb(255,191,116)' size={22} />
                                    <a href={'https://github.com/'+login}>
                                        {login}
                                    </a>
                                </Tooltip_Hover>
                            </li>
                            <li>
                                <FaStar color='rgb(255,215,0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(255,191,116)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(255,191,116)' size={22} />
                                {open_issues.toLocaleString()} open_issues
                            </li>
                        </ul>
                    </Card>
                )
            })}
        </div>
    )
}

ReposGrid.propTypes = {
    repos : PropTypes.array.isRequired
}


export default class Popular extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedL : 'All',
            error : null,
            repos : {}
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedL)
    }
    updateLanguage(selectedL){
        this.setState({
            selectedL : selectedL,
            error : null
        })        
        if(!this.state.repos[selectedL]){
            fetchPopularRepos(selectedL)
            .then((data)=>{
                //es6 destructing object, and shorthand propety
                this.setState(({repos})=>({
                    repos : {
                        ...repos,
                        [selectedL] : data
                    }
                }))
            })
            .catch(()=>{
                console.warn('Error fetching repos: ', error)
                this.setState({error:'There is some error'})
            })
        }
        /*
        fetchPopularRepos(selectedL)
        .then((repos)=>this.setState({repos, error : null}))
        .catch(()=>{
            console.warn('Error fetching repos: ', error)
            this.setState({error:'There is some error'})
        })
        */
    }
    isLoading(selectedL){
        return (this.state.error === null && ! this.state.repos[selectedL]);
    }
    render(){
        const {selectedL, error, repos} = this.state
        return(
            <React.Fragment>
                <LanguagesNav selectedL= {selectedL} updateLanguage = {this.updateLanguage} />
                {this.isLoading(selectedL) && <Loading text='Fetching data'/>}
                {error && <p className='center-text error'>error</p>}
                {repos[selectedL] && <ReposGrid repos={repos[selectedL]}/>}
            </React.Fragment>
        )
    }
}