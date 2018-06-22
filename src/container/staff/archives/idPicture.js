import React from 'react';
import axios from 'axios';
import './idPicture.css';
import idPic1 from './idzhengmian.png';
import idPic2 from './idfanmian.png';
import idPic3 from './shouchizhengjian.png';
import { getQueryString, getUserId } from 'common/js/util';
import { mianguanPicture } from 'api/user';

class mianguanRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'text': '',
        'mediaStreamTrack': '',
        'feat': '',
        'video1': false,
        'video2': false,
        'video3': false,
        'imgFlag': true,
        'shot': true,
        'pic1': '',
        'pic2': '',
        'pic3': ''
    };
    // this.openVideo = this.openVideo.bind(this);
    this.cutImg = this.cutImg.bind(this);
    this.shot = this.shot.bind(this);
    this.handleShotClick = this.handleShotClick.bind(this);
    this.next = this.next.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
  // 获取媒体方法（旧方法）
      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
    //   this.canvas1 = document.getElementById('canvas1');
    //   this.canvas2 = document.getElementById('canvas2');
      this.context = this.canvas1.getContext('2d');
    //   this.video1 = document.getElementById('video1');
    //   this.video2 = document.getElementById('video2');
      this.mediaStreamTrack = '';
    //   this.openVideo();
  };
  next() {
    this.props.history.push(`/staff/jiandang/idInfoRead`);
  };
  // 打开摄像头
  openVideo1(argument) {
    console.log(this.state);
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video1.srcObject) {
                this.video1.srcObject = stream;
            } else {
                this.video1.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video1.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video1.srcObject) {
                this.video1.srcObject = stream;
            } else {
                this.video1.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video1.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  };
  openVideo2(argument) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video2.srcObject) {
                this.video2.srcObject = stream;
            } else {
                this.video2.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video2.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video2.srcObject) {
                this.video2.srcObject = stream;
            } else {
                this.video2.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video2.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  };
  openVideo3(argument) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video3.srcObject) {
                this.video3.srcObject = stream;
            } else {
                this.video3.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video3.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video3.srcObject) {
                this.video3.srcObject = stream;
            } else {
                this.video3.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video3.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  };
  // 截取图像
  cutImg(index) {
    //   console.log(index);
    let currentCanvas = index === '1' ? this.canvas1 : index === '2' ? this.canvas2 : this.canvas3;
    let currentVideo = index === '1' ? this.video1 : index === '2' ? this.video2 : this.video3;
    // console.log(currentCanvas);
    // console.log(currentVideo);
    this.context = currentCanvas.getContext('2d');
    this.context.drawImage(currentVideo, 0, 0, 285, 285);
    this.getBase64(currentCanvas, index);
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
  getBase64(canvas, index) {
    let base64 = canvas.toDataURL('image/jpeg');
    if(index === 1) {
        this.setState({
            pic1: base64
        });
    }
    if(index === 2) {
        this.setState({
            pic2: base64
        });
    }
    if(index === 1) {
        this.setState({
            pic3: base64
        });
    }
  }
  handleShotClick() {
      let currentVideo = this.state.video1 ? '1' : this.state.video2 ? '2' : '3';
      this.cutImg(currentVideo);
  }
  shot(index) {
    console.log(index);
    if(index === 1) {
        this.setState({
            video1: true,
            video2: false,
            video3: false,
            imgFlag: false
        });
        this.openVideo1();
    } else if(index === 2) {
        this.setState({
            video1: false,
            video2: true,
            video3: false,
            imgFlag: false
        });
        this.openVideo2();
    } else {
        this.setState({
            video1: false,
            video2: false,
            video3: true,
            imgFlag: false
        });
        this.openVideo3();
    }
  }
  cancel() {
    this.setState({
        vedio: true,
        shot: true
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    var info = {};
    if (this.state.feat) {
        info.feat = this.state.feat;
        info.pic1 = this.canvas.toDataURL('image/jpeg');
        this.upload(info);
    } else if (!this.state.feat) {
        alert('请重新拍摄');
    };
};
upload(info) {
    info.code = this.code;
    info.updater = getUserId();
    mianguanPicture(info).then(rs => {
        if (rs.isSuccess) {
            alert('提交成功');
            this.props.history.push(`/staff/jiandang/salaryCard`);
        } else {
            alert(rs.errorInfo || '提交失败');
        }
    });
};

  render() {
    const url = './touxiang.png';
    return (
      <div className="SectionContainer" style={{ border: '2px solid #096dd9' }}>
        <div className="section">
            <div style={{ verticalAlign: 'middle', width: '100%' }}>
                <div className="comparison-main comparison-mains">
                <div className="head-wrap"><i></i>证件照读取</div>
                    <div className="clearfix">
                        <div className="inner-box">
                            <div className="img-wrap left-img" style={{ display: this.state.video1 ? 'inline-block' : 'none', margin: '0 58px 0 70px' }}>
                                <video ref={video => this.video1 = video} className="video"></video>
                            </div>
                            <div
                                className="img-wrap right-img"
                                style={{ border: '1px solid #4c98de', display: this.state.video1 ? 'none' : 'inline-block', margin: '0 58px 0 70px' }}
                                onClick={ () => { this.shot(1); } }
                            >
                                <img src={idPic1} className="userImg" id="userImg" />
                                <canvas ref={canvas => this.canvas1 = canvas} style={{ display: this.state.video1 ? 'none' : 'inline-block' }} className="inner-item" width="285" height="285"></canvas>
                            </div>
                            <div className="img-wrap left-img" style={{ display: this.state.video2 ? 'inline-block' : 'none', margin: '0 58px 0 0' }}>
                                <video ref={video => this.video2 = video} className="video"></video>
                            </div>
                            <div
                                className="img-wrap right-img"
                                style={{ border: '1px solid #4c98de', display: this.state.video2 ? 'none' : 'inline-block', margin: '0 58px 0 0' }}
                                onClick={ () => { this.shot(2); } }
                            >
                                <img src={idPic2} className="userImg" id="userImg"/>
                                <canvas ref={canvas => this.canvas2 = canvas} className="inner-item" width="285" height="285"></canvas>
                            </div>
                            <div className="img-wrap left-img" style={{ display: this.state.video3 ? 'inline-block' : 'none', margin: '0 58px 0 0' }}>
                                <video ref={video => this.video3 = video} className="video"></video>
                            </div>
                            <div
                                className="img-wrap right-img"
                                style={{ border: '1px solid #4c98de', display: this.state.video3 ? 'none' : 'inline-block', margin: '0 0 0 0' }}
                                onClick={ () => { this.shot(3); } }
                            >
                                <img src={idPic3} className="userImg" id="userImg" />
                                <canvas ref={canvas => this.canvas3 = canvas} className="inner-item" width="285" height="285"></canvas>
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <div className="btn-item" style={{ textAlign: 'center' }}>
                                <div>
                                <button
                                    className="ant-btn ant-btn-primary ant-btn-lg"
                                    style={{ width: 285, marginBottom: 20, backgroundColor: '#4c98de', color: '#fff' }}
                                    id="cut"
                                    // onClick={ () => { this.handleShotClick(1); } }>{this.state.shot ? '拍摄' : '取消'}</button>
                                    onClick={ this.handleShotClick }>拍摄</button>
                                </div>
                                <div>
                                <button className="ant-btn ant-btn-primary ant-btn-lg" style={{ width: 250 }} id="cut" onClick={ this.handleSubmit }>下一步</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default mianguanRead;