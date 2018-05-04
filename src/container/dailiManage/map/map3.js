import React from 'react';
import fetch from 'common/js/fetch';
import { getProjectList } from 'api/project';
import { dateFormat } from 'common/js/util';

class Map3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.markerClick = this.markerClick.bind(this);
    this.addProject = this.addProject.bind(this);
  }
  componentDidMount() {
    getProjectList().then(data => {
      console.log(data);
      this.map = new AMap.Map('container', {
        zoom: 6,
        center: [112.868904, 39.923423]
    });
      var lnglats = [];
      var contents = [];
      data.map((item) => {
        var temp = [];
        var content = '<p style="font-size: 10px">';
        content += item.name + '</br>' + item.chargeUser + '</br>' + item.province + item.city + item.area + item.address + '</br>';
        content += item.attendanceStarttime + '-' + item.attendanceEndtime + '</br>';
        content += dateFormat(item.startDatetime) + dateFormat(item.salaryDatetime) + '</br></p>';
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/hetong/wugong?code=' + item.code + '">查看务工人员合同</a></br>';
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/people/wugong?code=' + item.code + '">务工人员</a></br>';
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/people/wugong/addedit?projectCode=' + item.code + '">添加务工人员</a>';
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/newProj/project/kaoqin?projectCode=' + item.code + '">查看考勤</a>';
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/newProj/project/salary?projectCode=' + item.code + '">工资明细</a>';
        temp.push(item.latitude);
        temp.push(item.longitude);
        lnglats.push(temp);
        contents.push(content);
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
    this.props.history.push(`/newProj/project/addedit`);
  }
  render() {
    return (
      <div>
        <div class="tools-wrapper" style={{'margin-top': '8px'}}><button onClick={this.addProject} type="button" class="ant-btn"><span>新增项目</span></button></div>
        <div id="container" style={{width: '100%', height: '400px'}}></div>
      </div>
    );
  }
}

export default Map3;
