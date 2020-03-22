import React from 'react'
import PropTypes from 'prop-types'
import Hover from './Hover'
import withHover from './withHover'

const styles = {
    container:{
        position : 'relative',
        display : 'flex'
    },
    tooltip : {
        boxSizing : 'border-box',
        position : 'absolute',
        width : '160px',
        bottom : '100%',
        left : '50%',
        marginLeft : '-80px',
        borderRadius : '3px',
        backgroundColor : 'hsla(0, 0%, 20%, 0.9)',
        padding : '7px',
        marginBottom : '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px'
    }
}
/*********************Render Promps methode ********************/
export function Tooltip_Hover({text, children}){
    return(
        <Hover>
            {//mistake (hovering)=>(<div>something</div>)
             //Or (hovering)=>{return(<div></div>)}
             //not (hovering)=>{<div></div>}
            (hovering)=>{ 
                return( 
                <div style = {styles.container}> 
                    {hovering && <div style = {styles.tooltip}> {text} </div>}
                    {children}
                </div>
                )
            }}
        </Hover>
    ) 
}

Tooltip_Hover.propTypes = {
    text: PropTypes.string,
}
/*****************Higer order component methode *************** */
//often mistake *** {text, children, hovering}, not forget the {}
function Tooltip_withHover({text, children, hovering}){
    return(
        <div style = {styles.container}> 
            {hovering && <div style = {styles.tooltip}> {text} </div>}
            {children}
        </div>
    ) 
}
Tooltip_withHover.propTypes = {
    text : PropTypes.string.isRequired,
    hovering : PropTypes.bool.isRequired
}
//export default withHover(Tooltip)
/****************end  of Higer Order Component Methode ********** */

