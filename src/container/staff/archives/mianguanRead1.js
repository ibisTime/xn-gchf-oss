import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';
import originJsonp from 'jsonp';
import './mianguanRead.css';
import Photo from './touxiang.png';
import { getQueryString, getUserId, showWarnMsg, showSucMsg } from 'common/js/util';
import { mianguanPicture, getFeatInfo, getStaffDetail } from 'api/user';
// import { resolve } from 'dns';

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

class mianguanRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'text': '',
        'mediaStreamTrack': '',
        'feat': '',
        'vedio': true,
        'imgFlag': true,
        'shot': true,
        'pict1': '',
        'next': false
    };
    this.openVideo = this.openVideo.bind(this);
    this.cutImg = this.cutImg.bind(this);
    this.getFeat = this.getFeat.bind(this);
    this.handleShotClick = this.handleShotClick.bind(this);
    this.next = this.next.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.code = getQueryString('code', this.props.location.search);
    this.pict1 = getQueryString('pict1', this.props.location.search);
    this.idNo = getQueryString('idNo', this.props.location.search);
    this.ruzhi = getQueryString('ruzhi', this.props.location.search);
  }
  componentDidMount() {
  // 获取媒体方法（旧方法）
      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      this.video = document.getElementById('video');
      this.mediaStreamTrack = '';
    //   this.openVideo();
      getStaffDetail(this.idNo).then((res) => {
        this.setState({
          pict1: res.pict1 || res.pic1
        });
        if(res.pic2 || res.pict2) {
          this.setState({
            next: true
          });
        } else {
          this.code = res.code;
        }
      });
  };
  next() {
    this.props.history.push(`/staff/jiandang/idInfoRead`);
  };
  // 打开摄像头
  openVideo(argument) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
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
    this.context = this.canvas.getContext('2d');
    // this.context.scale(0.5, 0.5);
    this.context.drawImage(this.video, 0, 0, 1024, 768);
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
      // getFeatInfo(base64).then((res) => {
      //   var result = /getFaceFeature\({"data":"([^]+)"}\)/.exec(res);
      //   if (!result || result[1] === 'error' || result[1] === 'NOFACE') {
      //       showWarnMsg('请对准人脸');
      //       return;
      //   };
      //   this.setState({
      //       feat: result[1]
      //   });
      // });
      // jsonp('http://118.31.17.181/getfeature', Base64.encode(base64))
    // axios.post('https://feat.jm60s.com/getfeature', encodeURIComponent(base64), {
    //     withCredentials: true
    // }).then((rs) => {
    //         var result = /getFaceFeature\({"data":"([^]+)"}\)/.exec(rs.data);
    //         if (!result || result[1] === 'error' || result[1] === 'NOFACE') {
    //             showWarnMsg('请对准人脸');
    //             return;
    //         };
    //         this.setState({
    //             feat: result[1]
    //         });
    //     });
  }
  handleShotClick() {
    this.state.shot === true ? this.shot() : this.cancel();
  }
  shot() {
    this.cutImg();
    this.getFeat();
  }
  cancel() {
    this.setState({
        vedio: true,
        shot: true
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    if(this.state.next) {
      this.props.history.push(`/staff/jiandang/idPicture1?ruzhi=${this.ruzhi}&idNo=${this.idNo}`);
    } else {
      this.props.history.push(`/staff/jiandang/idPicture?ruzhi=${this.ruzhi}&code=${this.code}&idNo=${this.idNo}`);
    }
    // var info = {};
    // if (this.state.feat) {
    //     info.feat = this.state.feat;
    //     info.feat = '0 0 0 0 0 1.35707 0.201812 1.54832 0.095198 0 0 0 1.38861 0 0.084258 0 0.027828 1.48594 0 0.98508 0 1.24864 0 0.405667 0.162733 0 0.439233 0 0 0 0 0 1.10253 0 0 1.18145 0 2.07603 0 0 0.651836 0 5.08195 0.0796369 0 0.0744493 0 0.0288571 0 0 0 0.0514303 0.185003 0 0 0 0 0 0.134131 0.711333 0 0 0 0.552201 0 0 0 0 1.35906 0 0 0.206994 0 4.74547 0 0 0.0588659 0 0 0.199273 0.226255 0.699008 0 0 0.662674 0.241909 0 0.814568 0 0 0 0 3.44964 0.24954 0.00499979 0 0 0 0.46515 0 0 0 0.390862 3.02303 0 0 0 0 0 0 0 0.131763 0 0 0.566352 0 0 0 0.579428 0.131536 0 0 0 0 0 0.3332 0 0 0 0.770717 0 0.0878865 0.487873 0 3.64206 0.0744319 0.474335 0.429058 0.806717 0.635795 1.20678 0.525919 0.149146 1.03776 0 0.0094577 0 0.593565 0 0.292225 0 0.933869 0.600406 0 0 0 0 0 0.239685 0.00317641 0.455161 0.258629 3.6561 0.480735 0.0977919 0.177317 0 0 0 0 0 0.674387 0 0.46728 0 0 0.0978156 0 0 1.297 0 3.53706 0.325062 0.0465264 0.00842833 0.663524 0 0.0948539 0.341138 1.36076 0 0 0.731918 0 0.00178341 0 0 0 0.501379 0.076238 0 0 0 0.372944 0 0 0 0 0.59495 0.673482 1.96606 0 0.206804 0.0406112 0 0.0224132 0.896836 0 0 0.217595 0.176245 1.46614 0.35834 0 0 0 0 0.27748 0.188169 0 0 0 0 0 0.495325 0 0 0 0 0.117112 0 0.025311 0.0606666 0 0.280245 1.48736 0 0 0 0 0.649397 0 0 1.19359 0.19837 0.757983 0.214314 0 0 0 0.223478 0 1.64963 0 2.87758 0 0.107067 0.447724 0.191572 0 0.0246763 0 0.0967953 0 0 0 0 0.422775 0 0 0 0 0 0.127992 0.892134 0.343834 0.10597 1.26113 0 0 0 1.55645 0 0.476789 1.75227 0 0 0 0.26259 0.0872934 0 0 0 0.195868 1.65288 0.775266 0 0 0 0.330102 0.117607 0 0 0.466796 0.450221 0 0.307562 0 0 0 0.100105 0 0.282524 0 3.33221 0 0 0 0.479704 1.26324 0.242038 0 0.364598 0 0 0.780348 0 0 0 0 0 0 0 0.148179 0.384451 0.299356 0 0.110053 0 0.551453 0 0.115354 1.5917 0 0.30804 1.04317 0 1.04313 0.33828 0 0.590556 0 0 0.496672 1.67737 0 0 0 0 0 0 0 0.0378683 0 1.56177 0 0 0.748177 0.302706 1.31412 0.206005 0.217156 0 0 0.518124 0.325348 0 1.30993 0 0 0 0 1.73363 0 0 0 0 0.482965 0.364065 0 0 0 0 1.19323 0 0.142537 0.678155 0 0 0 0.185833 0.0511833 0 0 0 0.55364 1.15978 0 0 0 0.518267 0.0178177 0 0 0 0.0303556 0 0 0 0 0 0 0 0.181497 0 0 0.969788 0 0 0 0 1.11329 0 0.492679 0 0 0 0.201158 0 4.93929 0 0 0 0 0.359746 0.177744 1.09572 0.678678 0 0 0 0.1446 0 0 0 0 0.720158 0 0.360624 0 0 0.156079 0 0 0.395604 0 0 0 1.64928 0 0 0 0 0.225223 1.34338 0 1.09534 1.25067 0 0.243507 0 0 2.11766 0 0 0.00302562 0 0 0 0.732315 0.132741 0 4.34852 0 0 0 0 0.960272 0 0 0.87284 0.077283 0 0 0 0 2.59085 0 0 0 0.344864 0 0 0 0 0 0 0 0.354383 0 0.442313 0 0.846874 0 0.916105 0.364213 0.570731 0.862313 0 0 0 0.842617 0 0 0 0.029718 0 0.279175 0 0 0 0 2.46793 0 0 0 0 0.17069 0 0 0 0.780809 0 0 0.21037 0 0.418936 0 0 3.23526 0 0.0192898 0 1.15786 0 0 0 0.24765 0 0 0.474981 0 1.89291 0.618511 1.88621 0 0.591687 0.145623 0 0 1.75843 0 0 0.0348341 0 0.30534 0 0 0 0.260602 0 0 0.640832 0.665502 0.0767671 1.04165 0 0 0 0 0.944285 0 0 0.587318 2.42185 0.343957 0 0 0 0.186658 1.01138 0.0878334 0 0 0.936219 0 0 0 0 0.349723 0 0 0.993714 0 0.179535 0 0 0 0 0 0 0 0 0 0 1.65968 0 0.334325 1.023 0.639703 0.310668 0.435014 0 0.0649761 0.553535 0 0.511536 0 0.865303 2.25473 0 0 1.12264 0.292884 0 0 0 0 0.21593 0.0962598 0.0360097 0 0 0 0 3.64441 0 0 0 0 0.273925 0 0 0 0 0.600262 0 0 0 0 0 0 0.043833 0 0 0 0 0 0 0 0.102878 0 0 5.65025 0.266815 3.25785 0.223466 0.491428 0 0 0 0 0 0.272264 0 0 2.90217 0 0.573585 0 0 0.129348 0 0.660872 0 0 0 0.13577 0.687122 0.523275 0.605286 0 0 0 0 1.5237 0 1.04224 0.972963 0 0.216903 0.0111481 0 0 0 0 1.88825 0 0.193049 0.278522 0 0.443148 0 0.578968 0 2.54645 4.74129 0 0 0 0.820507 0 0 0.0125581 0 0.598082 0.755302 0.199042 0 1.77766 0 0 1.5011 0.0982035 0.580465 0 0.39362 0.764114 0 0.26963 2.82285 1.80689 0 0.417065 0 0 0.661536 0 0.226768 0 0 0.959377 0 0.245099 3.84999 0.900118 0 0.327224 0.261119 0 0.608601 0 0 0 0.358458 0.524938 0 3.16715 0.30652 0 0 0 0 0 0 6.95409 0.749315 0 0 0 0 0 0.454298 0 0.0324304 0.440375 0.0744327 0 0.304365 1.70894 0 0.796608 0 0.0999925 1.23761 0 0 0 0.663708 0 0 0 0.0652688 0.466835 0 0.493493 0 0.616026 0 0 0 0.700409 1.16464 0.934446 3.86772 0.338094 0.485058 0 0.863757 0.421713 0.195871 0 0.679023 0.138282 0 0 0 0.0988408 0.986649 0.296562 0 2.91552 0 0 0 0 0 0.241657 0 0 0 0 0.723362 0 0.0511586 2.31466 0.16662 1.29362 0.301764 0 0.635424 0.119679 0 0 0.305678 0.188206 0.459896 0 0 1.77345 0 0 0 0 0 1.13999 0 0 0.0226133 0 1.69001 0 0 0.655753 0 0 0.474811 1.7923 0.183853 0.386321 0 0 0.685656 0 0 0.36776 0 0.553436 0 0.0212979 1.25225 0.0266068 0.44738 0 0 1.04195 0 0 1.79614 0 1.00343 0 0 0 0 0.0604032 0 0.320446 0.780334 0.376175 0 0.0365372 0 0 0 0 0 0 0.957117 0 0 0 0 0 1.29337 0.891493 0.5218 0.536849 1.5621 0 0 0 0.961461 0 0.0256143 0.094848 0.796407 0 0 1.12673 0 0 0.143767 0 0.599229 1.79424 0 1.75132 0 0 0 0 0 1.21055 0 0 2.35185 0 0 1.19295 0 0.315595 1.393 0 0 1.47562 0 0 0 0 0 0 0.400346 0.407073 0.820342 0 0 0 0.271158 0 0 0.000719293 0 0.963069 0.346926 0.82797 0 0 0 0 0.768061 0.654514 0 3.51322 0 1.05318 0 0 0.238028 1.4105 0 0 0 0 0 0 0 0.148229 0 0 0 0 0 0.320176 0 0 0 0.231263 0.789044 0.618819 0.426375 0 0.213224 0.00722704 0.364141 0 0.563084 0.000691525 0.284127 0.647129 0.219734 0 0.991766 0.276919 0 0 0 0 0.626184 0.626199 0 0.799188 0.201643 0 0.644344 0 0 0 0 0.239675 0.0508986 0 0.313594 0 0 0 0 0 0 0 0 1.18756 0 0 0 0 0 1.11609 1.1698 0.652935 1.29376 0 0.359407 0.396823 0.403442 1.94352 0 0 0.162643 0 0 0.891696 0.176582 0.087296 0 0.654246 0 0 0 0 0 0 0 0.20057 0.154751 0.536001 0.154331 0 0.0652905 0.175245 1.25851 0 0 0.627946 2.363 0.473857 0 0 0 5.02257 0.189585 0 0 0 0.893135 0.226847 0.325829 2.58417 0.0312482 0 0 0 0.593342 1.63871 0 0 0.00143211 0.127401 0.26295 0 0 0 0 0 0.71413 0 0 0 0.395377 0 0.47465 0 0 0.53187 0.731757 0 0.36311 0 0 0.324045 0.085022 0 0.321721 0 0.0647152 0 0.0632108 0.127368 0 0 0 0 0 0 0 0.109574 0.352224 0.0561715 0.290103 0 1.50155 0.867989 1.4894 0.78809 0.0244609 0 0 0 0 0 0.0701416 0 0 2.92547 0 0 0 0.656094 0 1.3402 0 0 0 0.560239 0 0 0.230854 0.318321 0 0 0.14996 0 0 0 0 0 0.923879 0 0 0 0 0.122912 0 0 0 0.35872 1.3291 0 0 0.0948024 3.19302 0 0 0.0194345 0 0 0 0 0 0.82231 0 0 0.467974 0.68634 0.378268 0.949588 0.771403 0 0 0 0 0 0 0 4.79388 0 0 0.465031 0.170788 0 0 3.93892 0 0 0.104146 1.02686 0 0 0 0.248399 0 0.988461 0 0 0.541144 0.419617 0 0.393307 0 1.63683 0 0.133808 0 0 0 0 0.480763 0.536847 0 0 0 0.391628 1.66909 0 0.180443 0.460495 1.5066 0 0.539419 3.48359 0 0 0 0 0.164161 0.313368 0.832184 2.34002 0.352224 0 1.10655 0 2.75378 0 0 0.666065 0.0507282 0.0733081 0 0.0918546 0.196851 0 0.03126 0 0.118915 1.21227 0.818475 0.0311404 0 0 0 0 1.67725 0.255196 0.62634 0 0.089292 0.610637 0.852015 0 0.340641 1.48422 1.83235 0 0 0 0.825703 0.0323481 0.0182356 0 0 0 0.000194986 0 4.56469 0.734275 0 0 2.43276 0 0 0 0.503478 0.146785 1.57957 0.68176 0.073916 0.334255 3.05626 0 0 0 0 0.449016 0 0 0 0 2.03266 0.384789 0 0 0 0 0 0 0 0 0 2.01562 0.760239 0 1.76288 0 0.975187 0.290758 0.184556 1.68886 0 0 0 0 0 0 0 0.811539 0 0.244936 0 0.646491 0 0.113097 0 0.270768 0 0 0 0 0 0 0.0459836 1.13387 0.0930851 0.602351 0 0 0.431052 0.698412 0.387199 0.648339 0 0.180245 0 0 0.929592 1.34119 0 0 0 0 0.0466967 0.931506 0.120008 0 0.0432407 0 2.06003 0 0 0 0 1.38083 1.55517 0 0 0 0 0 0 0.88856 0 0 0.00760693 0 0 0.433994 1.01682 0.0373163 0.801438 0 0 0 0.566591 0.137015 0 0 0.16982 0 0 0 0 0 0 0 0 1.70237 0 0 1.12546 0 1.39158 0.530271 0 0 2.57399 0.0216391 0 0.597434 0 0 0.141437 0 1.25055 0 0 0.131595 0 0 0 4.79059 0.444085 0 0 0 0 0 0.107157 0.427425 0.424124 0 0 0.985294 0 0 1.26983 0 0 0 1.22395 0 1.42738 0 0.636856 0 2.689 0 0.184906 0 0 0 0.105921 0 0.595722 0.0191353 1.63624 4.02081 0 0 0.0281051 0 0 0 0 0 0 0 0 0 0.828212 0 0.167167 0 0 0 0 0.981106 0.310531 0.97567 0 0.262283 0 0 0.282072 0 0 0 0 0 0 0.662352 0 0 0.392674 0 2.04731 0.145561 0 0 0 0.564977 0.427049 0.0694595 0.72671 0.730065 0.105373 0.807196 1.12379 4.95663 0 0 0 0 0 0 0 0 0 0 0.315349 0 0.145254 1.04558 0 1.30206 0 0 0.722597 0 3.86555 0.461099 0 0 0 0 0 0 0.557188 0 0 0 0.0830292 0 1.88893 0.877956 0 0 0.0394976 0.273749 0 0.138574 0.384233 1.34844 0 2.22159 1.36481 1.29161 0.230052 0 0.912158 0 0.206632 0.54766 0 0 0 0 1.47289 0 0 0 0 0.326789 0 0 0 0 0 0 0 0.544791 0 0.647597 0.962849 1.66625 0 0.0423416 0 0.798558 2.52353 0.66221 0 5.59436 1.02102 0 0 0.399269 0.168563 5.08034 0 0 0 0.266584 0 0 0.147851 0 0 0 0 0 0.0955295 0 0 1.24211 1.23599 2.14273 0 0 0 2.6243 0 0 0 0 0 0.532193 0 0 0 0 0.225542 0.0765879 0 2.04815 0 0 0 0 0 0.345439 0 0.762572 0 0.223338 0 0 0.0780476 0.0178384 0 1.51378 0 0.0610472 0.391619 0 0 0 0.107609 0.778365 0.250854 0.0751966 0 0.769778 0 0 0 0 0 0 0.67971 0.253323 0 0 1.80858 0 0 0 0 0.133514 1.00205 1.67344 0 0 0 0 0 0 0.31216 0 0 0 1.84382 0 0 0 0 0.187362 2.27938 1.26583 0 0 0 0 0 0.197618 0.635161 0.215467 1.24405 0 0 1.00695 0.132111 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.190738 0.611372 0.280416 1.99561 0 0 0 0 0 1.31346 0.294534 0 0.760978 0 0 0 0 0 0.924197 0 0 0 0.603627 0.978559 0 0 0 0 0.753152 1.40156 1.26979 0 0 0 0 0.521615 0 0.935598 0 0 0.603567 0 0.10612 0 0 0 0 0 0 0 0 1.56602 0 0 0 0.0442655 0 0.389987 0 0 0 0.755852 0 0 0 0 0 0.476145 0 0.118192 0 0 0 0 0 0.489419 0.322393 3.36611 0 0.390472 0.119593 0.76942 0 0 0 0 0.882891 0 0.391058 0.190706 0.5135 0.531803 0.349491 0.303931 0 0 0.563452 0 0.862712 0 0 0 0 2.03012 0 0 0.0630318 0.443622 1.00586 0 0 0 0 0 0 1.06177 0 0 0 4.23238 0 0 0.861244 0 0 0 0.198647 0 0.403848 0.181753 0 0.11551 0 0 0 0 0 0 0 0 0 0 0 1.50774 0.299939 0 0.966142 0.429473 0.108022 0 0 0 0 0.235209 0 0 0 0 0 0 0 0 0 0 0 0.0108838 0.0200254 0 0 0 0 0.997929 0 0.167303 0.319598 0 1.56776 0.229316 0 0 0 0 0 0.728804 1.01213 0 0 0 0 0 0 0.0438207 0 0 0 0.82964 0 0 4.94065 0 0 0 0';
    //     info.pic1 = this.canvas.toDataURL('image/jpeg');
    //     this.upload(info);
    // } else if (!this.state.feat) {
    //     showWarnMsg('请重新拍摄');
    // };
};
  upload(info) {
      info.code = this.code;
      info.updater = getUserId();
      mianguanPicture(info).then(rs => {
          if (rs.isSuccess) {
              showSucMsg('提交成功');
              this.props.history.push(`/staff/jiandang/idPicture?ruzhi=${this.ruzhi}&code=${this.code}`);
          } else {
              showWarnMsg(rs.errorInfo || '提交失败');
          }
      });
  };

  render() {
    return (
      <div className="SectionContainer3" style={{ border: '2px solid #096dd9' }}>
        <div className="section3">
            <div style={{ verticalAlign: 'middle', width: '100%' }}>
                <div className="comparison-main3 comparison-mains3">
                <div className="head-wrap3"><i></i>免冠照读取</div>
                    <div className="clearfix3">
                        <div className="inner-box3">
                            <div className="img-wrap3 right-img3 img-box" style={{ border: '1px solid #4c98de', display: 'block', margin: '0 auto' }}>
                                <div className="border"></div>
                                <img src={this.state.pict1} className="haveUserImg" id="userImg" style={{ display: this.state.imgFlag ? 'block' : 'none' }}/>
                                <canvas id="canvas" className="inner-item" style={{ width: '512px', height: '384px' }} width="1024" height="768"></canvas>
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <div>
                                    <button className="ant-btn ant-btn-primary ant-btn-lg" style={{ position: 'absolute', top: '55%', left: '50%', width: '250px', transform: 'translate(-50%, -50%)' }} id="cut" onClick={ this.handleSubmit }>下一步</button>
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