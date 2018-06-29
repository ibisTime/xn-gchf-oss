import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class MoneyLine extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     moneyLine: []
  //   };
  // }
  // componentDidMount() {
  // };
  render() {
    let data = this.props.moneyLine;
    // const data = [
    //   { month: '1991', value: 15468 },
    //   { month: '1992', value: 16100 },
    //   { month: '1993', value: 15900 },
    //   { month: '1994', value: 17409 },
    //   { month: '1995', value: 17000 },
    //   { month: '1996', value: 31056 },
    //   { month: '1997', value: 31982 },
    //   { month: '1998', value: 32040 },
    //   { month: '1999', value: 33233 }
    // ];
    const cols = {
      value: {
        min: 1000
      },
      month: {
        range: [ 0, 1 ]
      }
    };
    let height = window.innerHeight * 0.12228261;
    return (
      <Chart height={90} padding={[ 10, 10, 0, 10 ]} data={data} scale={cols} forceFit>
        <Axis grid={null} name="month" />
        <Axis grid={null} name="value" label={{
          formatter: val => {
            return (val / 10000).toFixed(1) + 'k';
          }
        }} />
        <Tooltip crosshairs={{type: 'line'}}/>
        <Geom type="area" position="month*value" />
        <Geom type="line" position="month*value" size={2} />
      </Chart>
    );
  }
}
