import React from 'react';
import cookies from 'browser-cookies';
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
  constructor(props) {
    super(props);
    this.state = {
      storePwd: true
    };
    this.type = window.location.port === '2505' ? 'S'
      : window.location.port === '2506' ? 'B'
      : window.location.port === '2507' ? 'O'
      : window.location.port === '2508' ? 'P' : 'O';
    this.onChange = this.onChange.bind(this);
    if(cookies.get('loginName') && cookies.get('loginName') !== null && cookies.get('loginName') !== undefined) {
      this.initName = cookies.get('loginName');
    }
    if(cookies.get('loginPwd') && cookies.get('loginPwd') !== null && cookies.get('loginPwd') !== undefined) {
      this.initPwd = cookies.get('loginPwd');
    }
  }
  onChange(e) {
    this.setState({ 'storePwd': e.target.checked });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.type = window.location.port === '2505' ? 'S'
        : window.location.port === '2506' ? 'B'
        : window.location.port === '2507' ? 'O'
        : window.location.port === '2508' ? 'P' : 'B';
        // this.setState({ loading: true })
        // values.type = 'P'; // 平台用户
        // values.type = 'B'; // 银行用户
        // values.type = 'O'; // 业主单位
        // values.type = 'S'; // 监管单位
        values.type = this.type;
        this.props.login(values, this.state.storePwd);
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
              }],
              initialValue: this.initName
            })(
              <div className="input-border">
                <Input defaultValue={this.initName} prefix={<span style={{color: '#b0d1f6'}}>登录名</span>} placeholder="登录名" />
              </div>
            )}
          </FormItem>
          <FormItem className="login-form-item">
            {getFieldDecorator('loginPwd', {
              rules: [{
                required: true,
                message: '请输入密码!'
              }],
              initialValue: this.initPwd
            })(
              <div className="input-border">
                <Input defaultValue={this.initPwd}prefix={<span style={{color: '#b0d1f6'}}>密码</span>} type="password" placeholder="密码" />
              </div>
            )}
          </FormItem>
          <FormItem className="rem-pwd">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox className="remember-pwd" onChange={this.onChange}><span>记住密码</span></Checkbox>
          )}
        </FormItem>
          <FormItem>
            <Button htmlType="submit" loading={this.props.fetching} className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
        <div className="role">
            { this.type === 'S'
              ? <div><img src="../img/jianguan.png" /><span>监管单位端</span></div>
              : this.type === 'O'
              ? <div><img src="../img/qiye.png" /><span>业主端</span></div>
              : this.type === 'B'
              ? <div><img src="../img/yinhang.png" /><span>银行端</span></div>
              : <div><img src="../img/qiye.png" /><span>平台端</span></div>
            }
        </div>
        {/* </Card> */}
      </div>
    );
  }
}

export default Form.create()(Login);
