import React from 'react';
import $ from 'jquery';
import classNames from 'classNames';
import axios from 'axios';

require('./home.scss');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: null
    }
  }

  componentWillMount() {
    axios.get('/api/courses').then((res) => {
      this.setState({
        courses: res.data.result
      });
    });
  }

  constructCourse(courses) {
    return courses.map((course, i) => {
      return (
        <div key={i}>
          <hr />
          <h2>{course.title}</h2>
          <p>{course.desc}</p>
          <p> - {course.category} - </p>
          <img src={course.pic} />
          <hr />
        </div>
      );
    });
  }
  
  render() {
    const {
      courses
    } = this.state;

    return (
      <section id="home">
        { courses ? this.constructCourse.bind(this)(courses) : null }
      </section>
    );
  }
}

export default Home;
