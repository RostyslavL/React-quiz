import React from 'react'
import classes from './AnswersItem.module.css'

const AnswersItem = props => { 
const  clsArray = [classes.AnswersItem]

   if ( props.state) {clsArray.push(classes[props.state]) }

    return (
        <li 
            className={clsArray.join(' ')} 
            onClick = {() => props.onAnswerClick(props.answer.id)}
            >
            { props.answer.text}
        </li>
    )
}

export default AnswersItem