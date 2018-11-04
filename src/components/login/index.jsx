/*
 用户登陆的路由组件
 */

import React,{Component} from 'react';
import {NavBar,Button,List,InputItem,WingBlank,WhiteSpace} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../logo';


class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  state = {
    username:'',
    password :''
  };

  handleChange = (name,val) => {
    //更新状态
    this.setState ({
      [name]:val
    })
  };

  login = async () => {

    //发送ajax请求
    this.props.login(this.state);
  };

  goRegister = () => {
    //跳转到注册页面，编程式导航
    this.props.history.replace('/register');

  };

  render () {
    const {msg, redirectTo} = this.props.user;
    if (redirectTo) {
      //编程式导航
      // this.props.history.replace(redirectTo);
      //路由链接跳转
      return <Redirect to={redirectTo} />
    }

     return(
         <div>
           <NavBar>硅谷直聘</NavBar>
           <Logo />
           {msg ? <p className='err-msg'>{msg}</p> : ''}
           <WingBlank>
             <from>
               <List >
                 <WhiteSpace size="lg" />
                 <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username',val)}>用户名：</InputItem>
                 <WhiteSpace size="lg" />
                 <InputItem placeholder="请输入密码" type="password" onChange={val => this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                 <WhiteSpace size="lg" />

                 <Button type="primary" onClick={this.login}>登录</Button>
                 <WhiteSpace size="lg" />
                 <Button onClick={this.goRegister}>还没有账户</Button>

               </List>
             </from>

           </WingBlank>
         </div>
     )
  }
}
export default Login;