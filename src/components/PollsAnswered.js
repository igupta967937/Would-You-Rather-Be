import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, Header, Label, Progress, Segment } from 'semantic-ui-react'

const UserVote = () => (
  <Label pointing='below' color='blue' >
    <div menu={{ float: 'right' }}>
      Your Vote
    </div>
  </Label>
);

export class PollsAnswered extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    return (
      <Fragment>
        <Header as='h3' textAlign='center'>
          Results:
          <Header.Subheader>Would you Rather.....?</Header.Subheader>
        </Header>
        <Segment textAlign='center'>
          {userVote === 'optionOne' && <UserVote />}
          <p>{question.optionOne.text}</p>
          <Progress
            percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
            progress
            indicating
          >
            {optionOneVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Segment textAlign='center'>
          {userVote === 'optionTwo' && <UserVote />}
          <p>{question.optionTwo.text}</p>
          <Progress
            percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            progress
            indicating
          >
            {optionTwoVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Form.Field>
          <Button fluid color='green' onClick={this.handleClick}>
            Back
          </Button>
        </Form.Field>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(PollsAnswered));