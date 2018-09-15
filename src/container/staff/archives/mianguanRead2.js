import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';
import originJsonp from 'jsonp';
import { Select, Spin } from 'antd';
import './mianguanRead.css';
import Photo from './touxiang.png';
import Figure from './figure.png';
import { getQueryString, getUserId, showWarnMsg, showSucMsg } from 'common/js/util';
import { mianguanPicture, getFeatInfo, getStaffDetail } from 'api/user';

const {Option} = Select;

function jsonp(url, data, option) {
    return new Promise((resolve, reject) => {
        originJsonp(url + '?' + data, {
            name: 'getFaceFeature'
        }, (err, data) => {
        if(!err) {
            resolve(data);
        } else {
            reject(err);
        }
        });
    });
}

class mianguanRead2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      mediaStreamTrack: '',
      feat: '',
      vedio: false,
      imgFlag: true,
      shot: false,
      pict1: '',
      next: false,
      reshot: false, // reshot为true则是重拍过的
      deviceId: '',
      devices: [],
      fetching: false
    };
    this.openVideo = this.openVideo.bind(this);
    this.cutImg = this.cutImg.bind(this);
    this.getFeat = this.getFeat.bind(this);
    this.handleShotClick = this.handleShotClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.code = getQueryString('code', this.props.location.search);
    this.pict1 = getQueryString('pict1', this.props.location.search);
    this.idNo = getQueryString('idNo', this.props.location.search);
    this.ruzhi = getQueryString('ruzhi', this.props.location.search);
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
  // 获取媒体方法（旧方法）
      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      this.video = document.getElementById('video');
      this.mediaStreamTrack = '';
      this.getdeviceId();
      this.setState({ fetching: true });
      getStaffDetail(this.idNo).then((res) => {
        this.setState({ fetching: false });
        if(res.pic2 || res.pict2) {
          this.setState({
            next: true
          });
        }
        if(res.pict1) {
          this.setState({
            pict1: res.pict1,
            feat: res.feat,
            vedio: false,
            shot: false
          });
        } else {
          this.setState({
            vedio: true,
            shot: true
          });
          // this.openVideo();
        }
      }).catch(() => { this.setState({ fetching: false }); });
  };
  getdeviceId = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            this.deviceArr = [];
            let tmpArr = devices.filter(device => device.kind === 'videoinput');
            this.setState({
              devices: tmpArr,
              deviceId: tmpArr.length ? tmpArr[0].deviceId : '',
              label: tmpArr.length ? tmpArr[0].label : ''
            });
            if (tmpArr.length) {
              this.openVideo(tmpArr[0].deviceId);
            } else {
              showWarnMsg('未发现摄像头');
            }
          }).catch(function(err) {
        console.log(err.name + ': ' + err.message);
      });
    }
  }
  // 直接调取高拍仪服务进行拍照
  getPicDirectly = (url) => {
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
    this.setState({ fetching: true });
    axios.post(url).then((rs) => {
      let result = /"pic":"([^"]+)"}\)/.exec(rs.data);
      let context = this.canvas.getContext('2d');
      let canvas = this.canvas;
      let img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = result[1];
      this.setState({ pict1: result[1] });
      this.setState({ fetching: false });
    }).catch(() => { showWarnMsg('网络异常'); this.setState({ fetching: false }); });
  }
  next = () => {
    this.props.history.push(`/staff/jiandang/idPicture2?ruzhi=${this.ruzhi}&code=${this.code}&idNo=${this.idNo}`);
  };
  // 打开摄像头
  openVideo(deviceId) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { deviceId },
            audio: true
        }).then((stream) => {
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video.srcObject) {
                this.video.srcObject = stream;
            } else {
                this.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video.srcObject) {
                this.video.srcObject = stream;
            } else {
                this.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  };
  // 截取图像
  cutImg() {
    this.setState({
        vedio: false,
        imgFlag: false,
        shot: false
    });
    if(this.state.label.toUpperCase().indexOf('E1100') !== -1) {
      this.getPicDirectly('http://127.0.0.1:8080/getmainpic');
      return;
    } else if(this.state.label.toUpperCase().indexOf('S520-2') !== -1) {
      this.getPicDirectly('http://127.0.0.1:8080/getauxpic');
      return;
    }
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 338 * 3;
    this.canvas.height = 408 * 3;
    let scaleH = this.video.videoHeight / 408;
    let scaleW = this.video.videoWidth / 338;
    if (scaleH > scaleW) {
      let sy = (this.video.videoHeight - 408 * scaleW) / 2;
      this.context.drawImage(this.video, 0, sy, this.video.videoWidth, 408 * scaleW, 0, 0, 338 * 3, 408 * 3);
    } else {
      let sx = (this.video.videoWidth - scaleH * 338) / 2;
      this.context.drawImage(this.video, sx, 0, scaleH * 338, this.video.videoHeight, 0, 0, 338 * 3, 408 * 3);
    }
  };
  getPixelRatio() {
    var backingStore = this.context.backingStorePixelRatio ||
    this.context.webkitBackingStorePixelRatio ||
    this.context.mozBackingStorePixelRatio ||
    this.context.msBackingStorePixelRatio ||
    this.context.oBackingStorePixelRatio ||
    this.context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  getFeat() {
    let base64 = this.canvas.toDataURL('image/jpeg');
    this.setState({
      feat: 'NOFACE'
    });
  }
  handleShotClick() {
    this.setState({
      reshot: true
    });
    this.state.shot === true ? this.shot() : this.cancel();
  }
  shot() {
    this.cutImg();
    this.getFeat();
  }
  cancel() {
    this.setState({
        vedio: true,
        shot: true,
        feat: ''
    });
    this.openVideo(this.state.deviceId);
  };
  handleSubmit(e) {
    e.preventDefault();
    var info = {};
    info.feat = this.state.feat;
    if(this.state.reshot) {
      info.pic1 = this.canvas.toDataURL('image/jpeg');
    } else {
      info.pic1 = this.state.pict1;
    }
    this.upload(info);
};
  upload(info) {
      info.code = this.code;
      info.updater = getUserId();
      if(info.feat) {
        this.setState({ fetching: true });
        mianguanPicture(info).then(rs => {
          this.setState({ fetching: false });
          if (rs.isSuccess) {
            showSucMsg('提交成功');
            this.props.history.push(`/staff/jiandang/idPicture2?ruzhi=${this.ruzhi}&idNo=${this.idNo}&code=${this.code}`);
          } else {
            showWarnMsg(rs.errorInfo || '提交失败');
          }
        }).catch(() => {
          this.setState({ fetching: false });
        });
      } else {
        showWarnMsg('请拍摄免冠照');
      }
  };
  deviceChange = (deviceId) => {
    let device = this.state.devices.find(v => v.deviceId === deviceId);
    this.setState({deviceId, label: device.label});
    if (deviceId) {
      this.cancel();
      this.openVideo(deviceId);
    }
  }
  render() {
    return (
      <Spin spinning={this.state.fetching}>
        <div>
          <div className="mianguan-title"><i></i><span>人脸采集</span></div>
          <div>
            <label>摄像头</label>
            <Select style={{
              marginTop: 20,
              marginLeft: 20,
              width: 300
            }} onChange={this.deviceChange}
                    value={this.state.deviceId}>
              {this.state.devices.map(v => <Option value={v.deviceId}>{v.label}</Option>)}
            </Select>
          </div>
          <div className="mianguan-video-box" style={{ display: this.state.vedio ? 'block' : 'none' }} onClick={ this.handleShotClick }>
            <div className="figure"><img src={Figure} alt=""/></div>
            <video id="video" className="video3"></video>
          </div>
          <div className="mianguan-img-box" style={{ display: this.state.vedio ? 'none' : 'block' }} onClick={ this.handleShotClick }>
            <div style={{ display: this.state.pict1 ? 'none' : 'block' }}>
              <div className="border">
                <span></span><span></span><span></span><span></span>
                <img src={Photo} className="userImg3" id="userImg" style={{ display: this.state.imgFlag ? 'inline-block' : 'none' }}/>
              </div>
              <div className="tips">
                <span>点击拍摄</span>
                <span>请保持正脸在线框之内</span>
              </div>
            </div>
            <div style={{ display: this.state.pict1 ? 'block' : 'none' }}>
              <img src={this.state.pict1} className="haveUserImg" alt=""/>
            </div>
            <canvas id="canvas" className="inner-item" style={{ width: '340px', height: '410px' }} width="1020" height="1230"></canvas>
          </div>
          <div style={{ paddingTop: 20 }}>
            <div className="mianguan-btns" style={{ textAlign: 'center' }}>
              <div>
                <button className="ant-btn ant-btn-primary " onClick={ this.handleSubmit }>下一步</button>
                <button className="ant-btn " onClick={ this.next }>跳过</button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default mianguanRead2;