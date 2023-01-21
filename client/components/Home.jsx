import React,{ Component } from 'react';
import QuestionBox from './QuestionBox';


  class Home extends Component{
    constructor(props) {
      super(props);
      this.state = {show: false};
    }
    
    clickStart = () => {
      this.setState({show: true});
      console.log(this.state);
    }

    render () {
      return (
        <div>
            {this.state.show && <QuestionBox />}
          <button onClick={this.clickStart}>Start</button>
        </div>
      )
    } 
}
export default Home;