
import  React, { Component } from 'react';

import { Input, Button, Form } from 'antd';
import IconUtils from '@api/utils/IconUtils';
import LanguageField from '@components/framework/field/LanguageField';
import OrgField from '@components/framework/field/OrgField';
import I18NUtils from '@api/utils/I18NUtils';
import {i18NCode} from '@api/const/i18n';
import UserManagerRequest from '@api/user-manager/UserManagerRequest';
import { SessionContext } from '@api/Application';

const FormItem = Form.Item;

export default class UserLoginForm extends Component {

    static displayName = 'UserLoginForm';

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            language: "Chinese",
            org: "1",
        };
    }

    handleLogin = (values) => {
        let self = this;
        let object = {
            user: values,
            success: function(responseBody) {
                self.props.handleOk(responseBody, values.org, values.language)
            }
        }
        UserManagerRequest.sendLoginRequest(object);
    }

    buildLoginForm = () => {
      const {checkUserFlag} = this.props;
      if (checkUserFlag) {
        return this.buildCheckUserForm();
      } else {
        return this.buildIndexLoginForm();
      }
    }

    /**
     * 重新登录或者验证用户的form表单。只具备相关填写密码的功能
     */
    buildCheckUserForm = () => {
      const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18},
      };
      return (
          <Form initialValues={{
                    username: {initialValue: SessionContext.getUsername()}
                }}>
                  
            <FormItem {...formItemLayout} 
                      name = "username" 
                      label={I18NUtils.getClientMessage(i18NCode.Username)}>
                
                <Input disabled/>
            </FormItem>

            <FormItem {...formItemLayout} 
                      name = "password" 
                      label={I18NUtils.getClientMessage(i18NCode.Password)}  
                      rules={[{
                          required: true
                      }]}>

                  <Input type="password"/>
            </FormItem>
          </Form> 
      )
    }

    /**
     * 主页上的登录的表单。具备选择Org/语言以及登录按钮
     */
    buildIndexLoginForm = () =>{
      return(<Form  initialValues={{ 
                        username: this.state.username, 
                        password: this.state.password, 
                        org: this.state.org,
                        language: this.state.language
                    }}
                    onFinish = {this.handleLogin}>
              <div>
                <FormItem name="username" rules={[{required: true}]}>
                    <Input prefix={IconUtils.buildIcon("icon-renyuan")} maxLength={20}/>
                </FormItem>

                <FormItem name="password" rules={[{required: true}]}>
                    <Input prefix={IconUtils.buildIcon("lock")}  type="password"/>
                </FormItem>

                <FormItem rules={[{required: true}]}>
                    {IconUtils.buildIcon("icon-location", "", styles.selectIcon)}
                    <FormItem name="org" rules={[{required: true}]} noStyle>
                      <OrgField style={styles.formSelect} />
                    </FormItem>
                </FormItem>

                <FormItem rules={[{required: true}]}>
                    {IconUtils.buildIcon("icon-language", "", styles.selectIcon)}
                    <FormItem name="language" rules={[{required: true}]} noStyle>
                        <LanguageField style={styles.formSelect}/>
                    </FormItem>
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={styles.submitBtn}>
                      {I18NUtils.getClientMessage(i18NCode.Login)}
                    </Button>
                </FormItem>
              </div>
      </Form>);
    }

    render() {
        return (
            <div>
                {this.buildLoginForm()}
            </div>
        )
    }

}
const styles = {
    formItems:{
      
    }, 
    formSelect: {
      marginLeft: "20px",
      width: "90%"
    },
    selectIcon: {
      position: 'absolute',
      left: '-4px',
      top: '10px',
      color: '#999',
    },
  
    submitBtn: {
      width: '240px',
      background: '#3080fe',
      borderRadius: '28px',
    },
    tips: {
      textAlign: 'center',
    },
    link: {
      color: '#999',
      textDecoration: 'none',
      fontSize: '13px',
    },
    line: {
      color: '#dcd6d6',
      margin: '0 8px',
    },
  };