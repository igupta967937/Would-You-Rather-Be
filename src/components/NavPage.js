import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Container, Icon, Image, Menu, Responsive } from 'semantic-ui-react';

class NavPage extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthedUser(null);
  };

  render() {
    const { authedUser, users } = this.props
    return (
      <Container fluid padded>
        <Responsive as={Menu} pointing icon='labeled'>
          <Menu.Item name='home' as={NavLink} to='/' exact>
          <Icon name='home' color='teal' />
            Home
          </Menu.Item>
          <Menu.Item name='PollNew' as={NavLink} to='/add'>
            <Icon name='plus square' color='orange' />
            Add Question
          </Menu.Item>
          <Menu.Item name='leaderboard' as={NavLink} to='/leaderboard'>
            <Icon name='gem outline' color='purple' />
            Leaderboard
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Image src={users[authedUser].avatarURL} avatar />
                {users[authedUser].name}
            </Menu.Item>
            <Menu.Item name='logout' content='Logout' onClick={this.handleLogout}>
             <Icon name='sign-out' color='orange' />
                Logout
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
      </Container>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps, { setAuthedUser })(NavPage);