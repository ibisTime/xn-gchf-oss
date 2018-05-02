import React from 'react';
import fetch from 'common/js/fetch';
import { getProjectList } from 'api/project';

class Map3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.markerClick = this.markerClick.bind(this);
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
        var content = '';
        content += item.name + '</br>' + item.chargeUser + '</br>' + item.province + item.city + item.area + item.address;
        content += item.attendanceStarttime + '-' + item.attendanceEndtime;
        content += item.startDatetime + item.salaryDatetime;
        content += '<a type="button" class="ant-btn" href="' + location.origin + '/hetong/wugong?code=' + item.code + '">查看务工人员合同</a>';
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
  render() {
    return (
      <div id="container" style={{width: '100%', height: '400px'}}></div>
    );
  }
}

export default Map3;
