import React from 'react';
import cookies from 'browser-cookies';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import { Switch, Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  getMenuList,
  setTopCode,
  setSubMenuCode,
  setSubOpenCode,
  clearSubOpenCode,
  restoreSubOpenCode
} from '@redux/menu';
import { logout } from 'common/js/fetch';
import { getUserName } from 'common/js/util';
import asyncComponent from '../async-component/async-component';
import ROUTES from 'src/route';
import './dashboard.css';
import logo from './logo.svg';

const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;
const Home = asyncComponent(() => import('../../container/home/home'));
const Role = asyncComponent(() => import('../../container/security/role/role'));

@connect(
  state => state.menu,
  { getMenuList, setTopCode, setSubMenuCode, setSubOpenCode, clearSubOpenCode, restoreSubOpenCode }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleTopMenuClick = this.handleTopMenuClick.bind(this);
    this.handleSubMenuClick = this.handleSubMenuClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }
  componentDidMount() {
    this.props.getMenuList();
  }
  toggle() {
    if (this.state.collapsed) {
      this.props.restoreSubOpenCode();
    } else {
      this.props.clearSubOpenCode();
    }
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  handleTopMenuClick(e) {
    if (e.key) {
      this.props.setTopCode(e.key);
      let leftMenu = this.props.top2SubObj[e.key][0];
      leftMenu = leftMenu.children ? leftMenu.children[0] : leftMenu;
      let url = leftMenu.url.split('.')[0];
      this.props.history.push(url);
    }
  }
  handleSubMenuClick(e) {
    if (e.key) {
      this.props.setSubMenuCode(e.key);
      let url = this.props.menus[e.key].url.split('.')[0];
      this.props.history.push(url);
    }
  }
  handleTitleClick(e) {
    if (e.key) {
      this.props.setSubOpenCode(e.key);
    }
  }
  getRoutes() {
    return ROUTES.map(v => <Route key={v.path} exact path={v.path} component={v.component}></Route>);
  }
  getBreadcrumb() {
    if (!this.props.topMenuCode || !this.props.subMenuCode) {
      return null;
    }
    let menuArr = [
      this.props.menus[this.props.topMenuCode],
      this.props.menus[this.props.menus[this.props.subMenuCode].parentCode],
      this.props.menus[this.props.subMenuCode]
    ];
    if (this.props.menus[this.props.subMenuCode].parentCode === this.props.topMenuCode) {
      menuArr.splice(1, 1);
    }
    return menuArr.map(v => (
      <Breadcrumb.Item key={v.code}>
        {v.url !== '#'
          ? <Link to={v.url.split('.')[0]}>
            {v.name}
          </Link> : v.name}
      </Breadcrumb.Item>
    ));
  }
  getUserName() {
    return getUserName();
  }
  logout = () => { logout(); }
  render() {
    const innerCls = this.props.topMenuCode ? '' : 'hidden';
    let rightCls = 'right-layout';
    if (!this.props.topMenuCode) {
      rightCls += ' full-right-content';
    } else if (this.state.collapsed) {
      rightCls += ' collapsed';
    }

    const menu = (
      <Menu>
      <Menu.Item>
      <div onClick={this.logout}>退出登录</div>
      </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="dashboard-layout">
        <Header className="header">
          <div className="logo">
            <img src={logo} alt=""/>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            onClick={this.handleTopMenuClick}
            selectedKeys={[this.props.topMenuCode]}
          >
            {this.props.topMenuList.map(v => (
              <Item key={v.code}>{v.name}</Item>
            ))}
          </Menu>
          <div className="dropdown">
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{getUserName()}</Button>
              </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            className={`left-slider ${innerCls}`}
          >
            <Menu
              mode="inline"
              selectedKeys={[this.props.subMenuCode]}
              openKeys={[...this.props.subOpenCode]}
              onClick={this.handleSubMenuClick}
              inlineCollapsed={this.state.collapsed}
            >
              {this.props.subMenuList.map(v => (
                v.children ? (
                  <SubMenu
                    key={`${v.code}`}
                    onTitleClick={this.handleTitleClick}
                    title={<span><Icon type="desktop"/><span>{v.name}</span></span>}
                  >
                    {v.children.map(c => <Item key={c.code}>{c.name}</Item>)}
                  </SubMenu>
                ) : (
                  <Item key={v.code}>
                    <Icon type="" />
                    <span>{v.name}</span>
                  </Item>
                )
              ))}
            </Menu>
          </Sider>
          <Layout className={rightCls}>
            <Icon
              className={`trigger ${innerCls}`}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Breadcrumb className={innerCls} style={{ margin: '16px 0', paddingLeft: 30 }}>
              {this.getBreadcrumb()}
            </Breadcrumb>
            <Content className="right-content">
              <Switch>
                <Route exact path="/" render={() => (
                  cookies.get('loginKind') === 'B' ? (
                  <Redirect to="/home"/>
                ) : (
                  <Redirect to="/system/role"/>
                  )
                )}/>
                {this.props.topMenuList.length ? this.getRoutes() : null}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
