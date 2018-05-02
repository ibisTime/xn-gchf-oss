import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    var map = new AMap.Map('container', {
      zoom: 10,
      center: [116.39, 39.9]
    });
  }
  render() {
    return (
      <div id="container" style={{width: '500px', height: '300px'}}></div>
    );
  }
}

export default Home;
