import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form, Header, Radio } from 'semantic-ui-react'
import { handleSaveQuestionAnswer } from '../actions/users'

export class PollQuestion extends Component {
   static propTypes = {
    authedUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };
  state = {
    value: ''
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment>
        <Header as='h4'>Would you rather.....?</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
              <Radio
                color='orange'
                label={question.optionOne.text}
                value='optionOne'
                checked={this.state.value === 'optionOne'}
                onChange={this.handleChange}
              /><br />
              <Radio
                color='purple'
                label={question.optionTwo.text}
                value='optionTwo'
                checked={this.state.value === 'optionTwo'}
                onChange={this.handleChange}
              />
          </Form.Field>
          <Form.Field>
            <Button fluid color='purple' disabled={disabled} content='Submit' />
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(PollQuestion);