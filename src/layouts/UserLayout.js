import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import { getRouteData } from '../utils/utils';
import logo from '../assets/logo.png';

const links = [];

const copyright = <div>Copyright &copy; 2017 成都苑东生物制药有限公司</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }
  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src={logo} />
                {/*<span className={styles.title}>苑东生物</span>*/}
              </Link>
            </div>
            <p className={styles.desc}>研发部培训学习系统</p>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <GlobalFooter className={styles.footer} links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
