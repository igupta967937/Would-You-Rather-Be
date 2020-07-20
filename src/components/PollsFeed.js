import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'

export class PollsFeed extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };
  state = {
    viewPoll: false
  };
  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const buttonContent = unanswered === true ? 'Answer Poll' : 'Results'

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Segment>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header color='purple' textAlign='center'>
                  {question.optionOne.text}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header color='orange' textAlign='center'>
                  {question.optionTwo.text}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button
          color='teal'
          content={buttonContent}
          fluid
          onClick={this.handleClick}
        />
      </Fragment>
    );
  }
}

export default PollsFeed;