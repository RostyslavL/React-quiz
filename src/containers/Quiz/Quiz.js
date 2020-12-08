import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from  '../../axios/axios-qiuz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        currentQuestion: 0, 
        answerState: null,  // {[id]: 'success' || 'error'}
        isFinished: false, //for debuging
        results:{}, 
        quiz: [],
        loading: true
    }
fnAnswerClickHandler = answerId => {
    if(this.state.answerState){
        const key = Object.keys(this.state.answerState)[0]

        if(this.state.answerState[key]  === 'sucsess' ){
            return
        }
    }
    console.log('AnswerId:', answerId)
    const question = this.state.quiz[this.state.currentQuestion]
    const results = this.state.results
    if (question.rightAnswerId === answerId ) {
        if(!results[question.id]) {
            results[question.id] = 'success' 
        }
        this.setState( {answerState: {[answerId]: 'sucsess'}, results})

            const timeout = window.setTimeout( () => {

                if (this.isQuizFinnished()) {
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        currentQuestion:this.state.currentQuestion + 1,
                        answerState: null 
                    })
                }
                    window.clearTimeout(timeout)
            }, 1000)
    } else {
            results[question.id] = 'error'
            this.setState( {answerState: {[answerId]: 'error'}, results})
        }
    }
    

    isQuizFinnished(){
        return this.state.currentQuestion  + 1  === this.state.quiz.length
    }
    fnRetry = () => {
        return this.setState({ 
            currentQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount(){
        try{
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
            console.log(quiz)
        }
        catch(e){
            console.log(e)
        }
        
    }
    render(){
        return (
            <div className={classes.Quiz}>
                    <div className={classes.QuizWrapper}> 
                        <h1> QUIZ </h1>
                        {
                            this.state.loading 
                            ? <Loader />
                            : this.state.isFinished 
                            ?  <FinishedQuiz 
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    fnRetry={this.fnRetry}
                                />
                            :   <ActiveQuiz 
                                    answers={this.state.quiz[this.state.currentQuestion].answers}
                                    question={this.state.quiz[this.state.currentQuestion].question}
                                    onAnswerClick={this.fnAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerMumber={this.state.currentQuestion + 1}
                                    state = {this.state.answerState}
                                />
                        }
                    </div>
            </div>
        )
    }
}

export default Quiz

