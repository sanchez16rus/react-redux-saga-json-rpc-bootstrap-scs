import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import Actions from '../actions';

class Login extends Component {

  constructor(props) {
    super(props)

    this.handlerFormSubmit = this.handlerFormSubmit.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentWillMount() {
    this.setState({login: '', passworw:''});
  }

  handlerFormSubmit(e) {
    e.preventDefault();
    var {login, password} = this.state;
    this.props.dispatch(Actions.getAuthorizationAction({login, password}));
  }

  onChangeLogin(e){
    let {login} = this.state;
    
    login = e.target.value;
    this.setState({login});
  }

  onChangePassword(e) {
    let {password} = this.state;
    
    password = e.target.value;
    this.setState({password});
  }

  render() {

    const { sessionInfo } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4"/>
          <div className="col-md-4 col-lg-4">
            <div className="card-body">
              <Form onSubmit={ (e) => this.handlerFormSubmit(e) }>
                <FormGroup>
                  <Label for="firstName">Login</Label>
                  <Input type="text" name="firstName" required placeholder="Enter Login" 
                          value={this.state.login} 
                          onChange={this.onChangeLogin} />
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" required placeholder="Enter Password" 
                          value={this.state.password} 
                          onChange={this.onChangePassword} />
                </FormGroup>
                <button className="btn btn-success">Sign in</button>
              </Form>
              <br/>
              <div className="div_center">
                <Alert color="success">demo/12345678</Alert>
              </div>
              {
                sessionInfo.errorMessage ? 
                (
                  <div className="div_center">
                  
                    <Alert color="danger">{sessionInfo.errorMessage}</Alert>
                  </div>
                )
                : ' '
              }
              
            </div>
          </div>
          
          <div className="col-md-4 col-lg-4"/>
        </div>
      </div>
      
    );
  }
};

Login.propTypes = {
  sessionInfo: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
{
  sessionInfo: state.sessionInfo
})

export default connect(mapStateToProps)(Login);