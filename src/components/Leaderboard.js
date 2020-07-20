import React, { Component, Fragment } from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { Card, Divider, Grid, Image, Label, Segment } from 'semantic-ui-react'

export class Leaderboard extends Component {
  static propType = {
    leaderboardData: PropType.array
  };
  render() {
    const { leaderboardData } = this.props;

    return (
      <Fragment>
        {leaderboardData.map(user => (
          <Segment.Group key={user.id}>
            <Label ribbon='left' icon='star' color='violet'>
              {user.name}
            </Label>
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Image src={`${user.avatarURL}`} rounded size='small' />
                </Grid.Column>
                <Grid.Column width={8} verticalAlign='middle'>
                  <Grid>
                    <Grid.Column width={12}>Answered</Grid.Column>
                    <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created</Grid.Column>
                    <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign='center'>
                  <Card fluid color='orange'>
                    <Card.Content header='Total' textAlign='center' />
                    <Card.Content>
                      <Label circular color='teal' size='huge'>
                        {user.questionCount + user.answerCount}
                      </Label>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData
  };
}

export default connect(mapStateToProps)(Leaderboard)