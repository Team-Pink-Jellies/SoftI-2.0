import React, { Component } from 'react';
import Question from '../../src/features/question/Question.jsx';
class QuestionBox extends Component {
  render() {
    return (
      <div>
        {/* <p>
          We will write questions here!
        </p> */}

        <Question></Question>

      </div>
    );
  }
}




export default QuestionBox;