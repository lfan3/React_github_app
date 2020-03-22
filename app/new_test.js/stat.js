import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name : 'Tyler',
            friends : ['joh', 'lili']
        }
        this.updateName = this.updateName.bind(this)
        this.addFriend = this.addFriend.bind(this)
    }
    //how to do if i want to pass a parameter in the updateName(newName)??
    updateName(){
        this.setState(
            {name: 'mark'}
        )
    }
    addFriend(newFriend){
        this.setState((state)=>{
            return {
                friends: state.friends.concat(newFriend)
            }
        })
    }
    render() {
        this.addFriend('yiyi')
        return(
            <React.Fragment>
                <h1>Hello {this.state.name}</h1>
                <p>{this.state.friends}</p>
                <ul>
                    {this.state.friends.map((friend)=>
                       <li key={friend}>{friend}</li> )}
                </ul>
                <button onClick={this.updateName}> change Name </button>
                <button onClick={this.addFriend('zaz')}> add friends </button>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById('app')
);

