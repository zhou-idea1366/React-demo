
//登录容器组件

import {connect} from 'react-redux';

//引入登录UI组件
import Login from '../components/logo';

//引入action
import {login} from '../redux/actions';

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)