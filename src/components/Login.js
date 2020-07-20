import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Dimmer, Form, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react'

export class Login extends Component {
  state = {
    loading: false
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };
  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginLayout
            form={<ConnectLoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
      </Fragment>
    );
  }
}

const LoginLayout = ({ form, loading }) => (
  <div>
    <Grid padded textAlign='center'>
      <Grid.Row>
        <Grid.Column>
          {loading === true && (
            <Dimmer active >
              <Loader content='Loading' />
            </Dimmer>
          )}
          <Header as='h1' icon textAlign='center' color='purple'>
            <Header.Content>Would You Rather?!</Header.Content>
            <Icon name='users' circular />
          </Header>
          <Header as='h4'textAlign='center' color='orange'>Select a Friend</Header>
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

class LoginForm extends Component {
  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };
  state = {
    value: ''
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { onLoading, setAuthedUser } = this.props;
    const authedUser = this.state.value;

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setAuthedUser(authedUser));
  };
  generateDropdownData = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Dropdown
          placeholder='Friend List'
          fluid
          selection
          scrolling
          options={this.generateDropdownData()}
          value={value}
          onChange={this.onChange}
          required
        />
        <Form.Button
          color='teal'
          content='Login'
          disabled={disabled}
          fluid
          value={value}
        />
        <footer textAlign='center'>
          <a href='https://github.com/udacity/reactnd-project-would-you-rather-starter'>
            Udacity React Nanodegree: Would you Rather?!
          </a>
        </footer>
      </Form>
    );
  }
}

const ConnectLoginForm = connect(mapStateToProps, { setAuthedUser })(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Login;