import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { Grid } from 'semantic-ui-react'
import ErrorPage from './ErrorPage'
import Home from './Home'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NavPage from './NavPage'
import PollNew from './PollNew'
import PollsUser from './PollsUser'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className='App'>
          {authedUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <NavPage />
              <ContentGrid>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/questions/bad_id' component={ErrorPage} />
                  <Route path='/questions/:question_id' component={PollsUser} />
                  <Route path='/add' component={PollNew} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route component={ErrorPage} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded='vertically' columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);