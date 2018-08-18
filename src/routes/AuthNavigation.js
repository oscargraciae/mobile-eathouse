import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import decode from 'jwt-decode';

import api from '../config/api';
import { setUser } from '../actions/user';

// import Login from '../pages/Login';
import LoginNav from './Login';
import AppNavigator from './App';
import PublicTabs from './PublicTabs';


class AuthNavigation extends Component {

  async componentDidMount() {
    const { authentication } = this.props;
    if (authentication.isLogged) {
      const tokenDecode = decode(authentication.token);
      const user = await api.user.get(tokenDecode.id);
      this.props.setUser(user);
      console.log("authentication------>", user);
    }
  }

  render() {
    const { authentication } = this.props;
    if (authentication.isLogged) {
      axios.defaults.headers.common["Authorization"] = `JWT ${authentication.token}`;
      return <AppNavigator />;
    }

    // return <LoginNav />;
    return <PublicTabs />;
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps, { setUser })(AuthNavigation);
