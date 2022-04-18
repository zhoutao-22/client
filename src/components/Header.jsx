import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Balloon } from '@alifd/next';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/styled-menu';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from './../menuConfig';
import Logo from './logo/components/Logo';
import NoticeUtils from '@utils/NoticeUtils';
import {SessionContext} from '@api/Application';
import ChangePwdDialog from '@components/framework/dialog/ChangePwdDialog';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { CompassOutlined, IdcardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';

@withRouter
export default class Header extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        changePwdVisiable: false,
    };
  }

  logout= (e) => {
  }
  
  changePassword = (e) => {
    e.preventDefault();
    this.setState({changePwdVisiable: true})
  } 
  
  canelChangePwd = () => {
    this.setState({changePwdVisiable: false})
  }
  
  changePwdOk = () => {
    NoticeUtils.showSuccess();
    this.setState({changePwdVisiable: false})
  }
  
  render() {
    let sessionContext = SessionContext.getSessionContext();
    if (!sessionContext) {
      NoticeUtils.showNotice("请先登陆");
      this.props.history.push('/');
    }
    
    const { width, theme, isMobile, className, style } = this.props;
    return (
      <div>
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <LegacyIcon type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <LegacyIcon type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <Avatar size="large" icon={<UserOutlined />} className="user-avatar"/>
                 <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {sessionContext ? sessionContext.username + ":" + sessionContext.description : ""}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px', color: '#999' }}
                  >
                    {sessionContext ? sessionContext.orgName : ""}
                  </span>
                </div>
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <UserOutlined size="small" />{I18NUtils.getClientMessage(i18NCode.HomePage)}
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/" onClick={this.changePassword}>
                  <IdcardOutlined size="small" />{I18NUtils.getClientMessage(i18NCode.ChangePwd)}
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <SettingOutlined size="small" />{I18NUtils.getClientMessage(i18NCode.Setting)}
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/" onClick={this.logout}>
                  <CompassOutlined size="small" />{I18NUtils.getClientMessage(i18NCode.Exit)}
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
      <ChangePwdDialog object={{}} destroyOnClose onOk={this.changePwdOk} onCancel={this.canelChangePwd} visible={this.state.changePwdVisiable} />
      </div>
    );
  }
}
