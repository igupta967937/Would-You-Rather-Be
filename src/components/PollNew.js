import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dimmer, Divider, Form, Grid, Header, Loader, Segment} from 'semantic-ui-react'
import { handleSaveQuestion } from '../actions/questions'

export class PollNew extends Component {
  static propTypes = {
    authedUser: PropTypes.string,
    handleSaveQuestion: PropTypes.func
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { authedUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authedUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {

    if (this.state.validSubmit === true) {
      return <Redirect to='/' />;
    }
    return (
      <Segment.Group>
        <Header as='h3' textAlign='center' attached='top'>
          Would you Rather.....?
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content='Loading' />
              </Dimmer>
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id='option1'
                placeholder='Enter first option'
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id='option2'
                placeholder='Enter second option'
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button fluid color='orange'>Submit</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}


export default connect( mapStateToProps, {handleSaveQuestion})(PollNew);