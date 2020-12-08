import React, {Component} from 'react'
// import Backdrop from '../../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'
import classes from './Drawer.module.css'

const links = [
   {to:'/',label:'List', exaxt:true},
   {to:'/auth',label:'Authoristaion', exaxt:false},
   {to:'/quiz-creator',label:'Create A Quiz', exaxt:false},
]

class Drawer extends Component{

    clickHandler =() => {
        this.props.onClose()
    }


    renderLinks(){
        return links.map((link, index) => {
            return (
                <li key={index}>
                  <NavLink 
                    to = {link.to}
                    exaxt={link.exaxt}
                    activeClassName={classes.active}
                    onClick={this.clickHandler}
                  >
                    {link.label}
                  </NavLink>
                </li>
            )
        })
    }
    
    render(){
        const cls = [classes.Drawer]
        // (!this.props.isOpen) ? cls.push(classes.close) : null
        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {/* {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null} */}
            </React.Fragment>
        )
    }
}

export default Drawer