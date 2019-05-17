import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

class LoginPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.login();
  }

  login() {
    fetch(`${this.props.apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: this.state })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.token);
        this.setState({ username: data.username });
      });
  }

  render() {
    if (localStorage.getItem("token") !== null) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 101%;
          }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className="login-background">
          <Grid.Column style={{ maxWidth: 450 }}>
            <h2 className="logo-font login-logo" style={{ color: 'white'}}>
              <i className="podcast icon"></i>
              netcast
            </h2>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input 
                  fluid icon='mail' 
                  iconPosition='left' 
                  placeholder='Email' 
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name="password"
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button color="blue" fluid size='large'>
                  Sign In
                </Button>
              </Segment>
            </Form>
            <Message>
              <a href='#'>I forgot my username or password</a>
            </Message>
            <Message>
              New to us? <a href='/register'>Create an account.</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;