import React from 'react';
import { Icon, Collapse, Table, Input, Button } from 'antd';
import AccumulatePie from 'component/accumulate-pie/accumulate-pie';
import MoneyLine from 'component/money-line/money-line';
import ThirtyPie from 'component/thirty-pie/thirty-pie';
import fetch, { fetchImg } from 'common/js/fetch';
import { formatDate, getUserKind, moneyFormat, isUndefined, getUserId } from 'common/js/util';
import { getProject, getProjectList, getPagePayCode, getPageChecks } from 'api/project';
import { getUserDetail } from 'api/user';

const Panel = Collapse.Panel;
const orderDict = {
  0: '待人工复核',
  1: '已审核待提交',
  2: '已提交待发放',
  3: '已发放',
  4: '部分发放',
  5: '补发'
};
const checkDict = {
  0: '待上班打卡',
  1: '待下班打卡',
  2: '已打卡待结算',
  3: '已结算'
};
const payColumns = [{
  title: '员工名称',
  dataIndex: 'name',
  render: (v, d) => {
    return d.bankCard.staffName;
  }
}, {
  title: '应发工资',
  dataIndex: 'shouldAmount',
  render: (v) => moneyFormat(v)
}, {
  title: '扣款金额',
  dataIndex: 'cutAmount',
  render: (v) => moneyFormat(v)
}, {
  title: '税费',
  dataIndex: 'tax',
  render: (v) => moneyFormat(v)
}, {
  title: '实际发放工资',
  dataIndex: 'factAmount',
  render: (v) => moneyFormat(v)
}, {
  title: '状态',
  dataIndex: 'status',
  render: (v) => orderDict[v]
}];
const checkColumns = [{
  title: '员工名称',
  dataIndex: 'staffName'
}, {
  title: '员工手机号',
  dataIndex: 'staffMobile'
}, {
  title: '上班时间',
  dataIndex: 'startDatetime',
  render: (v) => formatDate(v, 'yyyy-MM-dd hh:mm:ss')
}, {
  title: '下班时间',
  dataIndex: 'endDatetime',
  render: (v) => formatDate(v, 'yyyy-MM-dd hh:mm:ss')
}, {
  title: '出工状态',
  dataIndex: 'status',
  render: (v) => checkDict[v]
}];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {},
      chosed: false,
      staffIn: 0,
      staffOut: 0,
      lastMonthSalary: 0,
      totalSalary: 0,
      workingDays: 0,
      leavingDays: 0,
      payData: [],
      checkData: [],
      payPagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        hasMore: true
      },
      checkPagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        hasMore: true
      },
      payLoading: true,
      checkLoading: true,
      options: [],
      activeKey: []
    };
  }
  componentDidMount() {
    this.initMap();
    this.getProjectList();
  }
  camera() {
    let videos = document.querySelectorAll('video');
    this.video0 = videos[0];
    this.video1 = videos[1];
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
        this.playVideo(stream);
      }).catch(function (err) {
        console.log(err);
      });
    } else if (navigator.getMedia) {
      navigator.getMedia({
        video: true
      }, (stream) => {
        this.mediaStreamTrack = stream.getTracks()[0];
        this.playVideo(stream);
      }, function (err) {
        console.log(err);
      });
    }
  }
  playVideo(stream) {
    if (this.video0.srcObject) {
      this.video0.srcObject = stream;
      this.video1.srcObject = stream;
    } else {
      this.video0.src = (window.URL || window.webkitURL).createObjectURL(stream);
      this.video1.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    setTimeout(() => {
      this.video0.play();
      this.video1.play();
    }, 500);
  }
  closeVideo() {
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
  }
  // 初始化地图
  initMap() {
    let traffic = new AMap.TileLayer({
      getTileUrl: function (x, y, z) {
        return 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&t=1&zoom=' + (17 - z) + '&x=' + x + '&y=' + y;
      },
      zooms: [6, 20],
      zIndex: 5
    });
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      layers: [
        new AMap.TileLayer.Satellite(),
        new AMap.TileLayer.RoadNet(),
        traffic
      ],
      zoom: 4,
      center: [112.868904, 39.923423]
    });
  }
  // 获取项目列表
  getProjectList() {
    this.points = {};
    getUserDetail(getUserId()).then((data) => {
      getProjectList(getUserKind(), data.projectCodeList).then(data => {
        this.data = data;
        data.forEach((item, i) => {
          let point = [item.longitude, item.latitude];
          let marker = new AMap.Marker({
            position: point,
            map: this.map,
            zIndex: 99,
            content: `<div class="map-marker-point">${i + 1}</div>`
          });
          marker.content = { index: i, code: item.code };
          marker.on('click', this.markerClick);
          this.points[item.code] = point;
        });
      });
    });
  }
  // marker点击事件
  markerClick = (e) => {
    this.code = e.target.content.code;
    this.getDetail(e.target.content.code);
    let point = e.target.getPosition();
    if (this.marker) {
      this.marker.setMap(null);
      this.initPageData();
      let mPoint = this.marker.getPosition();
      if (mPoint.lng === point.lng && mPoint.lat === point.lat) {
        this.marker = null;
        this.setState({ chosed: false });
        this.closeVideo();
        return;
      }
    }
    let item = this.data[e.target.content.index];
    this.createMarker(item, [point.lng, point.lat]);
  }
  createMarker(item, point) {
    this.marker = new AMap.Marker({
      map: this.map,
      position: point,
      offset: new AMap.Pixel(-169, -174),
      content: this.getMarkerTmpl(item)
    });
    this.map.panTo(point);
    if (!this.state.chosed) {
      this.setState({ chosed: true }, () => {
        this.camera();
      });
    }
  }
  // 获取项目详情
  getDetail(code) {
    if (!this.state.projects[code]) {
      getProject(code).then((data) => {
        let nextState = {};
        if (data.report) {
          nextState = {
            staffIn: data.report.staffIn,
            staffOut: data.report.staffOut,
            workingDays: data.report.workingDays,
            leavingDays: data.report.leavingDays,
            totalSalary: (data.report.totalSalary / 1000).toFixed(0),
            lastMonthSalary: (data.report.lastMonthSalary / 1000).toFixed(0)
          };
        }
        if (this.code === code) {
          nextState.code = code;
        }
        this.setState(nextState);
      });
    }
  }
  getMarkerTmpl(item) {
    return `
      <div class="map-marker-content">
        <div class="map-marker-info">
          <div>${item.name}</div>
          <div>负责人：${item.chargeName}</div>
          <div>地址：${item.province + item.city + item.area + item.address}</div>
          <div>上班时间：${item.attendanceStarttime + ' ～ ' + item.attendanceEndtime}</div>
          <div>开始日期：${formatDate(item.startDatetime, 'yyyy-MM-dd')}</div>
          <div>工资发放日期：${item.salaryDatetime}号</div>
        </div>
        <div class="map-marker-icon"></div>
      </div>`;
  }
  collapseChange = (key) => {
    if (key === '1') {
      let { payPagination, payData } = this.state;
      if (!payData.length && payPagination.hasMore) {
        this.getPagePay(1, 10);
      }
      this.setState({ activeKey: [1] });
    } else if (key === '2') {
      let { checkPagination, checkData } = this.state;
      if (!checkData.length && checkPagination.hasMore) {
        this.getPageChecks(1, 10);
      }
      this.setState({ activeKey: [2] });
    } else {
      this.setState({ activeKey: [] });
    }
  }
  handleTableChange = (pagination, filters, sorter, isPay) => {
    let pager;
    if (isPay) {
      pager = { ...this.state.payPagination };
    } else {
      pager = { ...this.state.checkPagination };
    }
    pager.current = pagination.current;
    if (isPay) {
      this.setState({
        payPagination: pager,
        payLoading: true
      });
    } else {
      this.setState({
        checkPagination: pager,
        checkLoading: true
      });
    }
    this.getPagePay(pagination.current, pagination.pageSize);
  }
  // 分页查询本月工资详情
  getPagePay(start, limit) {
    this.setState({ payLoading: true });
    getPagePayCode(start, limit, this.code).then((data) => {
      let { payPagination } = this.state;
      this.setState({
        payPagination: {
          ...payPagination,
          current: start,
          total: data.totalCount,
          hasMore: data.totalPage > data.pageNO
        },
        payLoading: false,
        payData: data.list
      });
    }).catch(() => {
      this.setState({ payLoading: false });
    });
  }
  // 分页查询项目考勤
  getPageChecks(start, limit) {
    this.setState({ checkLoading: true });
    getPageChecks(start, limit, this.code).then((data) => {
      let { checkPagination } = this.state;
      this.setState({
        checkPagination: {
          ...checkPagination,
          current: start,
          total: data.totalCount,
          hasMore: data.totalPage > data.pageNO
        },
        checkLoading: false,
        checkData: data.list
      });
    }).catch(() => {
      this.setState({ checkLoading: false });
    });
  }
  initPageData() {
    this.setState({
      payPagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        hasMore: true
      },
      payData: [],
      payLoading: false,
      checkPagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        hasMore: true
      },
      checkData: [],
      checkLoading: false,
      activeKey: []
    });
  }
  choseItem(code, e) {
    this.setState({ options: [] });
    let item;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].code === code) {
        item = this.data[i];
        break;
      }
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.initPageData();
    this.createMarker(item, this.points[code]);
  }
  onSearch = (val) => {
    if (isUndefined(val)) {
      this.setState({ options: [] });
    } else {
      let options = this.data.filter(v => v.name.indexOf(val) > -1)
        .map(v => (
          <li className="ant-select-dropdown-menu-item" key={v.code} onClick={(e) => this.choseItem(v.code, e)} style={{ userSelect: 'none' }}>{v.name}</li>
        ));
      this.setState({ options });
    }
  }
  // 搜索框change
  onChange = (e) => {
    const { value: val } = e.target;
    this.onSearch(val);
  }
  // 搜索框focus
  handleFocus = (e) => {
    const { value: val } = e.target;
    this.onSearch(val);
  }
  render() {
    const { staffIn, staffOut, leavingDays, workingDays,
      totalSalary, lastMonthSalary, payData, payLoading,
      payPagination, checkData, checkLoading, checkPagination } = this.state;
    return (
      <div>
        <div id="container" className="map-containter"></div>
        <div className="map-search-wrap">
          <Input.Search
            placeholder="查找项目"
            style={{ width: 200 }}
            onSearch={this.onSearch}
            onChange={this.onChange}
            onFocus={this.handleFocus}
          />
          <div className="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft" style={{ width: '200px' }}>
            <div style={{ overflow: 'auto' }}>
              <ul className="ant-select-dropdown-menu ant-select-dropdown-menu-vertical  ant-select-dropdown-menu-root">
                {this.state.options}
              </ul>
            </div>
          </div>
        </div>
        <canvas></canvas>
        {this.state.chosed ? (
          <div>
            <div className="map-left-wrapper">
              <Collapse accordion onChange={this.collapseChange} style={{ background: 'rgba(16, 42, 123, 0.5)', borderRadius: 0, border: '1px solid #8faffe' }}>
                <Panel header="本月工资详情" key="1">
                  <Table
                    columns={payColumns}
                    dataSource={payData}
                    rowKey={record => record.code}
                    pagination={payPagination}
                    loading={payLoading}
                    onChange={(pagination, filters, sorter) => {
                      this.handleTableChange(pagination, filters, sorter, 0);
                    }}
                    size="small" />
                </Panel>
                <Panel header="项目考勤及工资计算" key="2">
                  <Table
                    columns={checkColumns}
                    dataSource={checkData}
                    rowKey={record => record.code}
                    pagination={checkPagination}
                    loading={checkLoading}
                    onChange={(pagination, filters, sorter) => {
                      this.handleTableChange(pagination, filters, sorter, 0);
                    }}
                    size="small" />
                </Panel>
              </Collapse>
            </div>
            <div className="map-right-wrapper">
              <div className="map-right-top">
                <div className="map-right-head"><i className="map-rb-h-split"></i>监控视频</div>
                <div className="map-right-top-info">
                  <div className="map-rt-top-item">
                    <video style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill'
                    }}></video>
                  </div>
                  <div className="map-rt-top-item">
                    <video style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill'
                    }}></video>
                  </div>
                </div>
              </div>
              <div className="map-right-bottom">
                <div className="map-right-head"><i className="map-rb-h-split"></i>数据统计</div>
                <div className="map-right-cont">
                  <div className="map-rb-top">
                    <div className="map-rb-top-item">
                      <div className="map-rb-item-title"><Icon type="caret-right" />目前累计人数</div>
                      <div className="map-rbt-item-content">
                        <AccumulatePie data={staffIn} />
                      </div>
                    </div>
                    <div className="map-rb-top-item">
                      <div className="map-rb-item-title"><Icon type="caret-right" />累计发薪金额</div>
                      <div className="map-rbt-item-content map-rbt-item-content1">
                        <MoneyLine />
                      </div>
                      <div className="map-rbt-item-btm"><span>累计：{totalSalary}元</span><span>上月：{lastMonthSalary}元</span></div>
                    </div>
                  </div>
                  <div className="map-rb-bottom">
                    <div className="map-rb-item-title"><Icon type="caret-right" />30日累计人员情况</div>
                    <div className="map-rb-chart">
                      <ThirtyPie
                        staffIn={staffIn}
                        staffOut={staffOut}
                        leavingDays={leavingDays}
                        workingDays={workingDays} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Home;
