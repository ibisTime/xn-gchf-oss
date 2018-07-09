import React from 'react';
import { Collapse } from 'antd';
import { getUserId } from 'common/js/util';
import './contactWithUs.css';
const Panel = Collapse.Panel;

// class ContactWithUs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.text = 'https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg';
//   }
//   render() {
//     const options = {
//       fields: [{
//         field: 'oldLoginPwd',
//         title: '二维码',
//         type: 'img',
//         value: this.text,
//         readonly: true
//       }],
//       addCode: 631073
//     };
//     return (
//       <ModalDetail
//         title='联系我们'
//         visible={this.props.contactWithUsVisible}
//         hideModal={() => this.props.setContactWithUsVisible(false, event)}
//         options={options}
//         className="modal-blue"
//       />
//     );
//   }
// }

class ContactWithUs extends React.Component {
  constructor(props) {
    super(props);
    this.text = 'https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg';
    this.state = {
      modal1Visible: false,
      modal2Visible: false,
      contact: false,
      help: false
    };
  }
  componentDidMount() {
    // console.log(this.props.contactWithUsVisible);
    // console.log(this.props.contact);
    // console.log(this.props.help);
    // this.setState({ contact: this.props.contact, help: !this.props.contact });
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  tab(index) {
    this.props.setContactWithUsVisible(true, event, index === 1 ? 1 : 2);
    // index === 1 ? this.setState({ contact: true, help: false }) : this.setState({ help: true, contact: false });
  }
  render() {
    const panelStyle = {
      background: 'transparent'
    };
    return (
        <div className="modal-out ant-modal-mask" style={{ display: this.props.contactWithUsVisible ? 'block' : 'none' }}>
          <div className="my-modal">
            <div className="tab">
              <div className={['tab-item', this.props.contact && 'choose'].join(' ')} onClick={() => { this.tab(1); }}><span>联系我们</span></div>
              <div className={['tab-item', !this.props.contact && 'choose'].join(' ')} onClick={() => { this.tab(2); }}><span>操作指引</span></div>
              <div className="close" onClick={(e) => { this.props.setContactWithUsVisible(false, event); }}><img src="../img/close.png" alt=""/></div>
            </div>
            <div className="content">
              { this.props.contact
                  ? <div className="contact">
                    <div className="contact-top">
                      <p>软件客服微信：15372288898或扫描二维码添加</p>
                      <p>在线时间9：30--17：30</p>
                      <p>紧急情况可来电咨询</p>
                    </div>
                    <div className="contact-content">
                      <img src="../img/erweima.jpeg" alt=""/>
                    </div>
                  </div>
                  : this.props.kind === 'O'
                  ? <div className="help">
                        <Collapse accordion onChange={this.collapseChange} className="home-collapse1" defaultActiveKey={['1']}>
                          <Panel header="新建项目流程" key="1" style={panelStyle}>
                            <img src="../img/yz_xj_1.png" alt=""/>
                            <img src="../img/yz_xj_2.png" alt=""/>
                            <img src="../img/yz_xj_3.png" alt=""/>
                            <img src="../img/yz_xj_4.png" alt=""/>
                            <img src="../img/yz_xj_5.png" alt=""/>
                            <img src="../img/yz_xj_6.png" alt=""/>
                            <img src="../img/yz_xj_7.png" alt=""/>
                            <img src="../img/yz_xj_8.png" alt=""/>
                          </Panel>
                          <Panel header="建档操作流程" key="2" style={panelStyle}>
                            <img src="../img/yz_jd_1.png" alt=""/>
                            <img src="../img/yz_jd_2.png" alt=""/>
                            <img src="../img/yz_jd_3.png" alt=""/>
                            <img src="../img/yz_jd_4.png" alt=""/>
                            <img src="../img/yz_jd_5.png" alt=""/>
                            <img src="../img/yz_jd_6.png" alt=""/>
                          </Panel>
                          <Panel header="工资发放流程" key="3" style={panelStyle}>
                            <p>说明：工资条分为自动生成和手动生成，自动生成时间为新建项目时填写的【工资条形成时间】。员工需要有正常的考勤记录（存在上班打卡和下班打卡时间）才能生成工资条，工资条生成之后将发送给银行端进行工资代发。以下流程为手动生成工资条：</p>
                            <img src="../img/yz_gz_1.png" alt=""/>
                            <img src="../img/yz_gz_2.png" alt=""/>
                            <img src="../img/yz_gz_3.png" alt=""/>
                            <img src="../img/yz_gz_4.png" alt=""/>
                            <img src="../img/yz_gz_5.png" alt=""/>
                            <img src="../img/yz_gz_6.png" alt=""/>
                            <img src="../img/yz_gz_7.png" alt=""/>
                          </Panel>
                        </Collapse>
                      </div>
                      : this.props.kind === 'B'
                      ? <div className="help">
                        <Collapse accordion onChange={this.collapseChange} className="home-collapse1" defaultActiveKey={['1']}>
                          <Panel header="工资发放流程" key="1" style={panelStyle}>
                            <img src="../img/yh_gz_1.png" alt=""/>
                            <img src="../img/yh_gz_2.png" alt=""/>
                            <img src="../img/yh_gz_3.png" alt=""/>
                            <img src="../img/yh_gz_4.png" alt=""/>
                            <img src="../img/yh_gz_5.png" alt=""/>
                          </Panel>
                        </Collapse>
                      </div>
                          : this.props.kind === 'S' && <div className="help">
                        <Collapse accordion onChange={this.collapseChange} className="home-collapse1" defaultActiveKey={['1']}>
                          <Panel header="事件处理流程" key="1" style={panelStyle}>
                            <p>当银行端少发工资，并且业主端补发之后，可以在【异常查看】中看到相关处理信息，并将工资条转化为正常。</p>
                            <img src="../img/jg_yc_1.png" alt=""/>
                            <img src="../img/jg_yc_2.png" alt=""/>
                          </Panel>
                        </Collapse>
                      </div>
              }
            </div>
          </div>
        </div>
    );
  }
}
//
// ReactDOM.render(<App />, mountNode);

export default ContactWithUs;
