import React from 'react'
import Proptypes from 'prop-types'

const styles = {
    content : {
        fontSize : '35px',
        position : 'absolute',
        left: 0,
        right : 0,
        marginTop : '20px',
        textAlign: 'center',
        color : 'pink'
    }
}
export default class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            content : this.props.text
        }
    }
    componentDidMount(){
        const {text, speed} = this.props
        this.interval = window.setInterval(()=>{
            this.state.content === `${text}...` ? this.setState({content :text }) : this.setState(({content}) => ({content : content + '.'}))
        }, speed)
    }
    componentWillUnmount(){
        window.clearInterval(this.interval)
    }
    render(){
        return(
            <p style={styles.content}>{this.state.content}</p>
        )   
    }
}

Loading.proptypes = {
    text : Proptypes.string.isRequired,
    speed :Proptypes.number.isRequired
}

Loading.defaultProtype = {
    text : 'Loading',
    speed : 200
}

