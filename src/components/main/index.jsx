/*
 应用主界面路由组件
 */

import React ,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../../containers/laoban';
import Dashen from '../../containers/dashen';
import Personal from '../../containers/personal';
import Message from '../../containers/message';
import NavFooter from '../../components/nav-footer';
import {getRedirectPath} from '../../utils';

class Main extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired
  }

  navList = [
    {
      path:'/laoban',
      component:Laoban,
      title:'大神列表',
      icon:'dashen',
      text:'大神'
    },
    {
      path:'/dashen',
      component:Dashen,
      title:'老板列表',
      icon:'laoban',
      text:'老板'
    },
    {
      path:'/message',
      component:'Message',
      title:'消息了列表',
      icon:'message',
      text:'消息'
    },
    {
      path:'/personal',
      component:'Personal',
      title:'用户中心',
      icon:'personal',
      text:'个人'

    }

  ]

  /*
   1. 本地没有cookie，跳转到登录页面（用户没有登录，一上来输入网址访问）
   2. 本地有cookie ， redux没有状态数据（用户登录了，刷新了页面），根据cookie发送请求请求当前用户的状态数据，保存在redux
   3. 本地有cookie ，并且redux有数据， 直接使用
   */

   render () {
     // 1. 本地没有cookie，跳转到登录页面（用户没有登录，一上来输入网址访问）
     const userid = Cookies.get('userid');
     if (!userid) {
        return <Redirect to='/login'/>
     }
     // 2. 本地有cookie ， redux没有状态数据（用户登录了，刷新了页面），根据cookie发送请求请求当前用户的状态数据，保存在redux
     const {user} = this.props;
     if (!user._id) {
       //发送请求，请求用户的数据，保存在redux中
       this.props.getUserInfo();
       return <div>loading...</div>
     }

     // 3. 本地有cookie ，并且redux有数据， 直接使用
     // 如果用户直接访问 / 路径，没有界面显示，重定向到/laoban  /dashen /laobanInfo  /dashenInfo
     //获取当前路由路径
     const {pathname} = this.props.location;

     if (pathname === '/') {
       return <Redirect to={getRedirectPath(user.type, user.header)}/>
     }

     const {navList} =this;
     if (user.type === 'dashen') {
       //如果当前type是dashen显示老板按钮
       navList[0].hide = true
     } else {
       //如果当前type是laoban显示大神按钮
       navList[1].hide = true
     }

     //当前路由路径对应显示的nav对象
     const currentNav = navList.find(nav => pathname === nav.path);



     return(
         <div>
           {currentNav ? <NavBar>{currentNav.title}</NavBar> : ''}

           <Switch>
             <Route path="/laobanInfo" component={LaobanInfo}/>
             <Route path="/dashenInfo" component={DashenInfo}/>
             <Route path="/dashen" component={Dashen}/>
             <Route path="/laoban" component={Laoban}/>
             <Route path="/message" component={Message}/>
             <Route path="/personal" component={Personal}/>

           </Switch>
           {currentNav ? <NavFooter navList={navList}/> : ''}

         </div>
     )
   }
 }
export default Main;