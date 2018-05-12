import React from 'react';
import cookies from 'browser-cookies';
import fetch from 'common/js/fetch';
import { getProjectList, getProjectStatus } from 'api/project';
import { showWarnMsg, dateFormat } from 'common/js/util';
import { getUserDetail } from 'api/user';

class Map3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      stop: false,
      start: false,
      companyCode: ''
    };
    this.markerClick = this.markerClick.bind(this);
    this.addProject = this.addProject.bind(this);
    this.Statistics = this.Statistics.bind(this);
    this.addWorkers = this.addWorkers.bind(this);
    this.attendance = this.attendance.bind(this);
  }
  componentDidMount() {
    if (cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
        this.createMap(data.companyCode);
      });
    } else {
      this.createMap();
    }
  }
  createMap(companyCode) {
    Promise.all([
      getProjectList(cookies.get('loginKind'), companyCode),
      getProjectStatus()
    ]).then(([data, statusData]) => {
      this.map = new AMap.Map('container', {
        zoom: 4,
        center: [108.868904, 39.923423]
      });
      var lnglats = [];
      var contents = [];
      var Mcode = [];
      data.map((item) => {
        statusData.map((v) => {
          if (item.status === v.dkey) {
            // fetch(631358, { code: item.code, updater: '' }).then((data) => {
            var temp = [];
            var code = [];
            var content = '<p style="font-size: 10px">';
            // content += data.lastMonthSalary + '</br>';
            content += item.name + '</br>' + item.chargeName + '</br>' + item.province + item.city + item.area + item.address + '</br>';
            content += '工作时间：' + item.attendanceStarttime + '-' + item.attendanceEndtime + '</br>';
            content += '项目开始时间：' + dateFormat(item.startDatetime) + '</br>';
            if (item.salaryDatetime) {
              content += '项目结束时间：' + dateFormat(item.endDatetime) + '</br>';
            }
            content += '项目状态：' + v.dvalue + '</br></p>';
            // console.log(content);
            temp.push(item.latitude);
            temp.push(item.longitude);
            lnglats.push(temp);
            code = item.code;
            contents.push(content);
            Mcode.push(code);
            // });
          }
        });
      });
      this.infoWindow = new AMap.InfoWindow();
      for (var i = 0, marker; i < lnglats.length; i++) {
        marker = new AMap.Marker({
          position: lnglats[i],
          map: this.map
        });
        marker.content = contents[i];
        marker.code = Mcode[i];
        // 给Marker绑定单击事件
        marker.on('click', this.markerClick);
      }
    });
  }
  markerClick(e) {
    this.code = e.target.code;
    this.infoWindow.setContent(e.target.content);
    this.infoWindow.open(this.map, e.target.getPosition());
  }
  addProject() {
    this.props.history.push(`/projectManage/project/addedit`);
  }
  Statistics() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/newProj/project/detail?v=1&code=${this.code}`);
  }
  addWorkers() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/people/wugong/addedit?projectCode=${this.code}`);
  }
  attendance() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/newProj/project/kaoqin?projectCode=${this.code}`);
  }
  wages() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/newProj/project/salary?projectCode=${this.code}`);
  }
  proDetail() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/addedit?v=1&projectCode=${this.code}`);
  }
  allWages() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/leijifaxin?v=1&projectCode=${this.code}`);
  }
  overTime() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/end?v=1&projectCode=${this.code}`);
  }
  editPro() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/addedit?projectCode=${this.code}`);
  }
  checkPro() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/check?v=1&projectCode=${this.code}`);
  }
  overPro() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/stop?stop=1&projectCode=${this.code}`);
  }
  kCard() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/daka?projectCode=${this.code}`);
  }
  aWork() {
    if (!this.code) {
      showWarnMsg('请选择一条记录！');
      return;
    };
    this.props.history.push(`/projectManage/project/stop?start=1&projectCode=${this.code}`);
  }
  render() {
    const options = {
      fields: [{
        field: 'remark',
        title: '备注'
      }],
      beforeSubmit: (param) => {
        param.code = this.projectCode;
        param.updater = cookies.get('userId');
        return param;
      },
      addCode: this.addCode
    };
    return (
      <div>
        <div>
          {cookies.get('loginKind') === 'O' || cookies.get('loginKind') === 'S'
            ? (<div><div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.addProject} type="button" className="ant-btn"><span>新增项目</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.Statistics} type="button" className="ant-btn"><span>统计信息</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.addWorkers} type="button" className="ant-btn"><span>办理入职</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.attendance.bind(this)} type="button" className="ant-btn"><span>查看考勤</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.wages.bind(this)} type="button" className="ant-btn"><span>工资明细</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.proDetail.bind(this)} type="button" className="ant-btn"><span>项目详情</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.allWages.bind(this)} type="button" className="ant-btn"><span>查询累计发薪</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.editPro.bind(this)} type="button" className="ant-btn"><span>修改项目</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.checkPro.bind(this)} type="button" className="ant-btn"><span>审核项目</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.overPro.bind(this)} type="button" className="ant-btn"><span>项目停工</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.kCard.bind(this)} type="button" className="ant-btn"><span>打卡</span></button></div>
              <div className="tools-wrapper" style={{ 'margintop': '8px', 'display': 'inline-block' }}><button onClick={this.aWork.bind(this)} type="button" className="ant-btn"><span>重新开工</span></button></div>
            </div>)
            : null}
        </div>
        <div id="container" style={{ width: '100%', height: '400px' }}>
          <input id='input' />
        </div>
      </div>
    );
  }
}

export default Map3;