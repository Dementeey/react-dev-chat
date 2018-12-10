import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  GridColumn,
} from 'semantic-ui-react';
import firebase from '../../../helpers/firebase';
import messages from '../../../helpers/allMessages';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  isFormValid = () => {
    const { password, passwordConfirmation } = this.state;
    const errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: messages.fillAll };
      this.setState({ errors: errors.concat(error) });
      return false;
    }

    if ((password.length < 6 || password.length > 32)
      || (passwordConfirmation.length < 6 || passwordConfirmation.length > 32)) {
      error = {
        message: `
          ${messages.passInvalid}.
          ${messages.passMust}.`,
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    }

    if (password !== passwordConfirmation) {
      error = { message: messages.passMiss };
      this.setState({ errors: errors.concat(error) });
      return false;
    }

    this.setState({ errors: '' });
    return true;
  };

  isFormEmpty = ({
    username, email, password, passwordConfirmation,
  }) => !username.length || !email.length || !password.length || !passwordConfirmation.length;

  displayErrors = errors => errors.map(elem => <p key={elem.message.length}>{elem.message}</p>)

  handleInputError = (errors, name) => errors.some(error => error.message.toLowerCase().includes(name))
    ? 'error'
    : '';


  handleSubmit = (event) => {
    if (!this.isFormValid()) return;

    this.setState({ errors: [], loading: true });
    event.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        /* eslint-disable no-console */
        console.log('====================================');
        console.log(createdUser);
        console.log('====================================');
      })
      .catch((error) => {
        this.setState(prevState => ({ errors: prevState.errors.concat(error), loading: false }));
      });
  }

  render() {
    const {
      email,
      errors,
      loading,
      username,
      password,
      passwordConfirmation,
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="App">
        <GridColumn style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon name="puzzle piece" color="blue" />
            Register for DevChat
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, 'email')}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, 'password')}

              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}

              />

              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color="blue"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {!!errors.length && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}

          <Message>
            Already a user?
            {' '}
            <Link to="/login">Login</Link>
          </Message>
        </GridColumn>
      </Grid>
    );
  }
}

export default Register;
