import {connect} from 'react-redux';

import Dashen from '../components/dashen';
import {getUserList} from '../redux/actions';

export default connect (
    state => ({useList:state.userList}),
    {getUserList}
)(Dashen);