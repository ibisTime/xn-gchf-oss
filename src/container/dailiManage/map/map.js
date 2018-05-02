import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/user';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
// import React from 'react';
import ReactDOM from 'react-dom';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, View, Guide, Shape } from 'bizcharts';
// import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import { DataSet } from '@antv/data-set';
// 数据源
// const { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, DataSet } = window.BizCharts;
      const cols = {
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      };
      console.log(worldData);
          // 绘制世界地图背景
      const ds = new DataSet();
      const worldMap = ds.createView('back')
        .source(worldData, {
          type: 'GeoJSON'
        });
          // 可视化用户数据
      const userData = [
        {name: 'Russia', value: 86.8},
        {name: 'China', value: 106.3},
        {name: 'Japan', value: 94.7},
        {name: 'Mongolia', value: 98},
        {name: 'Canada', value: 98.4},
        {name: 'United Kingdom', value: 97.2},
        {name: 'United States of America', value: 98.3},
        {name: 'Brazil', value: 96.7},
        {name: 'Argentina', value: 95.8},
        {name: 'Algeria', value: 101.3},
        {name: 'France', value: 94.8},
        {name: 'Germany', value: 96.6},
        {name: 'Ukraine', value: 86.3},
        {name: 'Egypt', value: 102.1},
        {name: 'South Africa', value: 101.3},
        {name: 'India', value: 107.6},
        {name: 'Australia', value: 99.9},
        {name: 'Saudi Arabia', value: 130.1},
        {name: 'Afghanistan', value: 106.5},
        {name: 'Kazakhstan', value: 93.4},
        {name: 'Indonesia', value: 101.4}
      ];
      const userDv = ds.createView()
        .source(userData)
        .transform({
          geoDataView: worldMap,
          field: 'name',
          type: 'geo.region',
          as: [ 'longitude', 'latitude' ]
        })
        .transform({
          type: 'map',
          callback: function(obj) {
            obj.trend = (obj.value > 100) ? '男性更多' : '女性更多';
            return obj;
          }
        });
@listWrapper(
  state => ({
    ...state.securityUser,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class map extends React.Component {
  render() {
    return (
      <Chart height={window.innerHeight} data scale={cols} padding={[55, 20]} forceFit>
                <Tooltip showTitle={false} />
                <Legend name='trend' position='left' />
                <View data={worldMap} >
                  <Geom type='polygon' tooltip={false} position='longitude*latitude' style={{fill: '#fff', stroke: '#ccc', lineWidth: 1}}/>
                </View>
                {/* <View data={this.userDv} scale={{
                  'trend': {
                    alias: '每100位女性对应的男性数量'
                  }
                }} >
                  <Geom type='polygon' position='longitude*latitude' animate={{leave: {animation: 'fadeOut'}}} opacity='value' tooltip='name*trend' color={['trend', [ '#C45A5A', '#14647D' ]]} size={0}>
                    <Label content='name' offset={0} textStyle={{fill: '#545454', fontSize: 10}}/>
                </Geom>
                </View> */}
              <Geom type='polygon' position="x*y" style={{lineWidth: 1, stroke: '#fff'}} color={['count', [ 'rgb(200, 200, 255)', 'rgb(0, 0, 255)' ]]} />
            </Chart>
    );
  }
}

// 渲染图表
// ReactDOM.render((
//   <Chart width={600} height={400} data={data} scale={cols}>
//       <Axis name="genre" />
//       <Axis name="sold" />
//       <Legend position="top" dy={-20} />
//       <Tooltip />
//       <Geom type="interval" position="genre*sold" color="genre" />
//     </Chart>
// ), document.getElementById('mountNode'));
export default map;
