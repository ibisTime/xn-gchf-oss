import React from 'react';
import { Form, Icon, Input, Button, Card, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '@redux/user';
import './login.css';

const FormItem = Form.Item;

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  handleSubmit = (e) => {
    // console.log(window.location.href);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(window.location.port);
        values.type = window.location.port === '2505' ? 'S'
        : window.location.port === '2506' ? 'B'
        : window.location.port === '2507' ? 'O'
        : window.location.port === '2508' ? 'P' : 'O';
        // this.setState({ loading: true })
        // values.type = 'P'; // 平台用户
        // values.type = 'B'; // 银行用户
        // values.type = 'O'; // 业主单位
        // values.type = 'S'; // 监管单位
        console.log(values.type);
        this.props.login(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <img src="../img/sy.png" className="big-img"/>
        <img src="../img/circle.png" className="big-circle"/>
        <img src="../img/biaoti.png" className="big-title"/>
        <span className="big-title">务工人员实名制分账平台</span>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        {/* {/* <Card title="登录" extra={<a href="#">More</a>} className="login-card"> */}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem className="login-form-item">
            {getFieldDecorator('loginName', {
              rules: [{
                required: true,
                message: '请输入用户名!'
              }]
            })(
              <div className="input-border">
                <Input prefix={<span style={{color: '#b0d1f6'}}>手机号</span>} placeholder="用户名" />
              </div>
            )}
          </FormItem>
          <FormItem className="login-form-item">
            {getFieldDecorator('loginPwd', {
              rules: [{
                required: true,
                message: '请输入密码!'
              }]
            })(
              <div className="input-border">
                <Input prefix={<span style={{color: '#b0d1f6'}}>密码</span>} type="password" placeholder="密码" />
              </div>
            )}
          </FormItem>
          <FormItem className="rem-pwd">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox className="remember-pwd"><span>记住密码</span></Checkbox>
          )}
        </FormItem>
          <FormItem>
            <Button htmlType="submit" loading={this.props.fetching} className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className="role">
            <img src="../img/qiye.png" />
            <span>企业端</span>
        </div>
        {/* </Card> */}
      </div>
    );
  }
}

export default Form.create()(Login);
