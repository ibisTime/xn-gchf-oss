import React from 'react';
import cookies from 'browser-cookies';
import { getProjectList, getProjectStatus } from 'api/project';
import { dateFormat } from 'common/js/util';

class Map3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      stop: false,
      start: false
    };
    this.markerClick = this.markerClick.bind(this);
    this.addProject = this.addProject.bind(this);
  }
  componentDidMount() {
    Promise.all([
      getProjectList(),
      getProjectStatus()
    ]).then(([data, statusData]) => {
      this.map = new AMap.Map('container', {
        zoom: 6,
        center: [112.868904, 39.923423]
      });
      var lnglats = [];
      var contents = [];
      data.map((item) => {
        statusData.map((v) => {
          if(item.status === v.dkey) {
            var temp = [];
            var content = '<p style="font-size: 10px">';
            content += item.name + '</br>' + item.chargeUser + '</br>' + item.province + item.city + item.area + item.address + '</br>';
            content += '工作时间：' + item.attendanceStarttime + '-' + item.attendanceEndtime + '</br>';
            content += '项目开始时间：' + dateFormat(item.startDatetime) + '</br>';
            if(item.salaryDatetime) {
              content += '项目结束时间：' + dateFormat(item.endDatetime) + '</br>';
            }
            content += '项目状态：' + v.dvalue + '</br></p>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/hetong/wugong?code=' + item.code + '">查看务工人员合同</a></br>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/people/wugong?code=' + item.code + '">务工人员</a></br>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/people/wugong/addedit?projectCode=' + item.code + '">添加务工人员</a>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/newProj/project/kaoqin?projectCode=' + item.code + '">查看考勤</a>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/newProj/project/salary?projectCode=' + item.code + '">工资明细</a>';
            content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/addedit?v=1&projectCode=' + item.code + '">项目详情</a>';
            if(item.status !== '1' && item.status !== '2') { // 查累计发薪
              content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/leijifaxin?v=1&projectCode=' + item.code + '">查询累计发薪</a>';
            }
            if(!item.endDatetime && item.status === '3') { // 设置项目结束时间
              content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/end?v=1&projectCode=' + item.code + '">设置项目结束时间</a>';
            }
            if (v.dkey === '0') { // 修改
              content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/addedit?projectCode=' + item.code + '">修改项目</a>';
            }
            if (v.dkey === '1') { // 审核
              content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/check?projectCode=' + item.code + '">审核项目</a>';
            }
            if (v.dkey === '3') { // 在建的项目可以停工和打卡
              content += '<a class="ant-btn" href="' + location.origin + '/projectManage/project/stop?stop=1&projectCode=' + item.code + '">项目停工</a>';
              content += '<a type="button" class="ant-btn" href="' + location.origin + '/projectManage/project/daka?projectCode=' + item.code + '">打卡</a>';
            }
            if (v.dkey === '4') { // 停工的项目可以重新开工
              content += '<a type="button" class="ant-btn"href="' + location.origin + '/projectManage/project/stop?start=1&projectCode=' + item.code + '">重新开工</a>';
            }
            temp.push(item.latitude);
            temp.push(item.longitude);
            lnglats.push(temp);
            contents.push(content);
          }
        });
      });
      this.infoWindow = new AMap.InfoWindow();
      for(var i = 0, marker; i < lnglats.length; i++) {
          marker = new AMap.Marker({
              position: lnglats[i],
              map: this.map
          });
          marker.content = contents[i];
          // 给Marker绑定单击事件
          marker.on('click', this.markerClick);
      }
    //   var lnglats = [// 也可以使用LngLat对象
    //     [111.368904, 39.923423], [112.382122, 39.921176],
    //     [113.387271, 39.922501], [114.398258, 39.914600]
    // ];
    });
  }
  markerClick(e) {
    this.infoWindow.setContent(e.target.content);
    this.infoWindow.open(this.map, e.target.getPosition());
  }
  addProject() {
    this.props.history.push(`/projectManage/project/addedit`);
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
        { cookies.get('loginKind') === 'O'
        ? <div className="tools-wrapper" style={{'margintop': '8px'}}><button onClick={this.addProject} type="button" className="ant-btn"><span>新增项目</span></button></div>
        : null }
        <div id="container" style={{width: '100%', height: '400px'}}></div>
      </div>
    );
  }
}

export default Map3;
