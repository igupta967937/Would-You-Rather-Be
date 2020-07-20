import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid, Header, Image, Label, Segment } from 'semantic-ui-react'
import PollQuestion from './PollQuestion'
import PollsAnswered from './PollsAnswered'
import PollsFeed from './PollsFeed'

const pollTypes = {
  POLLS_FEED: 'POLLS_FEED',
  POLL_QUESTION: 'POLL_QUESTION',
  POLLS_ANSWERED: 'POLLS_ANSWERED'
};

const PollPage = props => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLLS_FEED:
      return <PollsFeed question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} />;
    case pollTypes.POLLS_ANSWERED:
      return <PollsAnswered question={question} />;
    default:
      return;
  }
};

export class PollsUser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    pollType: PropTypes.string.isRequired,
    unanswered: PropTypes.bool.isRequired,
    question_id: PropTypes.string.isRequired
  };
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null
    } = this.props;

    if (badPath === true) {
      return <Redirect to='/questions/bad_id' />;
    }

    return (
      <Segment.Group>
        <Header as='h5' textAlign='left' block attached='top'>
          <Label color='orange' ribbon='right'>
            {author.name}
          </Label>
        </Header>
        <Grid padded centered columns={2}>
          <Grid.Row>
            <Image src={author.avatarURL} size='tiny' centered />
          </Grid.Row>
          <Grid.Column>
            <PollPage
              pollType={pollType}
              question={question}
              unanswered={unanswered}
            />
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLLS_FEED;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authedUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLLS_ANSWERED;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  };
}

export default connect(mapStateToProps)(PollsUser)