import React from 'react'

export default function withHover(Component){
    return class WithHover extends React.Component{
                constructor(props){
                    super(props)
                    this.state= {
                        hovering : false
                    }
                    this.mouseOver = this.mouseOver.bind(this)
                    this.mouseOut = this.mouseOut.bind(this)
                }
                mouseOver(){
                    this.setState({
                        //when id is the key, we need to write [key] = value
                        //not not key = value --- wrong
                        hovering : true
                    })
                }
                mouseOut(){
                    this.setState({
                        hovering : false 
                    })
                }
                render(){
                    return(
                        <div 
                            onMouseOver = {()=>this.mouseOver()} 
                            onMouseOut = {()=>this.mouseOut()}
                        >
                            <Component hovering = {this.state.hovering} {...this.props}/>
                        </div>
                    )
                }
            }
}