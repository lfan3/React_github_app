import React from 'react'
import PropTypes from 'prop-types'


export default function Card({header, subheader, avatar, href, name, children}){
    return( 
            <div className = 'card bg-light'>
                <h2 className='header-lg center-text'>
                    {header}
                </h2>
                <img
                    className='avatar'
                    src = {avatar}
                    alt = {`avatar for ${name}`}
                />
                {subheader && (
                    <h4 className='center-text'>
                        {subheader}
                    </h4>
                )}
                <h2 className='center-text'>
                    <a className='link' href={href}> {name} </a>
                </h2>
                {children}
            </div>
    )
}

Card.propTypes = {
    header : PropTypes.string,
    subheader : PropTypes.string,
    avatar : PropTypes.string,
    href : PropTypes.string,
    name : PropTypes.string
}