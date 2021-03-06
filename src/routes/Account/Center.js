import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {NavBar, List, Badge, Icon} from 'antd-mobile';
import classnames from 'classnames';
import styles from './Center.less';


@connect(state => ({
  currentUser: state.user.currentUser,
  notices: state.global.notices,
  errorNum:state.global.errorNum
}))
export default class CenterComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noMsgNum: 0,  //未读消息条数
      errorNum: 0,  //错题数量
      showUpdPwd: false,  //是否显示修改密码按钮
      loginItem: {},
    }
    this.setMessageNoReadNum = this.setMessageNoReadNum.bind(this);
    this.setErrorRecord = this.setErrorRecord.bind(this);
  }

  componentWillMount() {
    this.setMessageNoReadNum();
    this.setErrorRecord();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  //查询设置消息的未读数
  setMessageNoReadNum = () => {
    this.props.dispatch({
      type: 'global/fetchNotices'
    });
  };

  //查询错题数量
  setErrorRecord = () => {
    this.props.dispatch({
      type:'global/fetchErrorTotalNum'
    })
  };


  render() {
    const {currentUser, notices = [],errorNum = 0} = this.props;
    console.log('notices',notices);
    return (
      <div className={styles.center_component}>
        <NavBar
          mode='dark'
          onLeftClick={() => window.location.href = '#/'}
          icon={<Icon type="left"/>}>个人中心</NavBar>

        <div className={styles.center_container}>
          <div className={styles.center_header}>
            <div className={styles.center_header_content}>
              <div className={styles.header_img}>
                {((currentUser.name || '').replace(/(^\s*)|(\s*$)/g, "").substr(0, 1) || '').toLocaleUpperCase()}
              </div>
            </div>
            <p className={styles.center_header_name}>{(currentUser.name || '')}</p>
          </div>

          <List>
            <List.Item
              extra={(currentUser.name || '')}
              thumb={<i className={classnames(styles.carmeIcon, styles.username)}>&#xe636;</i>}
            >
              姓名
            </List.Item>
            <List.Item
              extra={(currentUser.phone || '')}
              thumb={<i className={classnames(styles.carmeIcon, styles.tel)}>&#xe737;</i>}
            >
              联系电话
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className={styles.carmeIcon}>&#xe692;</i>}
              onClick={() => {
                window.location.href = '#/account/pwd';
              }}
            >
              修改密码
            </List.Item>
          </List>

          <List>
            <List.Item
              arrow='horizontal'
              thumb={<i className={classnames(styles.carmeIcon, styles.exam)}>&#xe61b;</i>}
              onClick={() => {
                window.location.href = '#/account/test/record';
              }}
            >
              考试记录
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className={classnames(styles.carmeIcon, styles.wrong_title)}>&#xe62a;</i>}
              onClick={() => {
                window.location.href = '#/account/error/record';
              }}
              extra={<Badge text={errorNum} overflowCount={99}/>}
            >
              错题汇总
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className={classnames(styles.carmeIcon, styles.message)}>&#xe628;</i>}
              onClick={() => {
                window.location.href = '#/account/message';
              }}
              extra={notices.length === 0 ? null : <Badge text={notices.length} overflowCount={99}/>}
            >
              我的消息
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className={classnames(styles.carmeIcon, styles.ranking)}>&#xe638;</i>}
              onClick={() => {
                window.location.href = '#/account/credit';
              }}
            >
              我的学分
            </List.Item>
            <List.Item
              arrow='horizontal'
              thumb={<i className={classnames(styles.carmeIcon, styles.ranking)}>&#xe6f1;</i>}
              onClick={() => {
                window.location.href = '#/account/rank';
              }}
            >
              我的排名
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}
