import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: false
        };
        this.markerClick = this.markerClick.bind(this);
      }
    componentDidMount() {
        this.map = new AMap.Map('container', {
            zoom: 6,
            center: [112.868904, 39.923423]
        });
        // var mapObj = new AMap.Map('container', {zoom: 5});
        // var marker = new AMap.Marker({
        //     icon: 'http://vdata.amap.com/icons/b18/1/2.png', // 24px*24px
        //     position: [116.39, 39.9],
        //     offset: new AMap.Pixel(-12, -12),
        //     map: mapObj
        // });
        var lnglats = [// 也可以使用LngLat对象
            [111.368904, 39.923423], [112.382122, 39.921176],
            [113.387271, 39.922501], [114.398258, 39.914600]
        ];
        this.infoWindow = new AMap.InfoWindow();
        for(var i = 0, marker; i < lnglats.length; i++) {
            marker = new AMap.Marker({
                position: lnglats[i],
                map: this.map
            });
            marker.content = '我是第' + (+i + 1) + '个信息窗体的内容';
            // 给Marker绑定单击事件
            marker.on('click', this.markerClick);
        }
        }
    markerClick(e) {
        this.infoWindow.setContent(e.target.content);
        this.infoWindow.open(this.map, e.target.getPosition());
    }
  render() {
    return (
        <div>
            <div id="container" style={{width: '500px', height: '300px'}}></div>
            {/* <Timeline>
            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
            <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
            </Timeline.Item>

            <Timeline.Item color="#108ee9">
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
            </Timeline.Item>
            </Timeline> */}
        </div>
    );
  }
}

export default Home;
