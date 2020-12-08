import React from 'react'
import clasess from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const finishedQuiz = props => {
    const successAnswers = Object.keys(props.results).reduce((total, key) => {
      if(props.results[key] === 'success' ){
          total++
        }  
        return total
    }, 0)
    return (
        <div className={clasess.FinishedQuiz}>
            <ul>    
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        (props.results[quizItem.id] === 'error') ? ('fa-times') : ('fa-check'),
                            clasess[props.results[quizItem.id]]
                        ]
                        return(
                            <li
                                key={index}
                            >
                                <strong>{index + 1} </strong>.&nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                })}

            </ul>
            <p>Correct Answers {successAnswers} From : {props.quiz.length} </p>
                <div>
                    {/* <button onClick={props.fnRetry}> Try Again </button> */}
                    <Button onClick={props.fnRetry} type="primary">
                        Try Again 
                    </Button>
                    <Link to={'/'}>
                        <Button  type="success">
                            Go to Question List 
                        </Button>
                     </Link>
                </div>
        </div>
    )
}

export default finishedQuiz