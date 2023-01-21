import React,{ Component } from 'react';
import QuestionBox from './QuestionBox';

class Home extends Component{
  render () {
    return (
      <div>
        <QuestionBox />
        <button>Start</button>
      </div>
    )
  }
  

}
export default Home;