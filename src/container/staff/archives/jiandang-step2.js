import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/staff/jiandang-step2';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.jiandangStep2,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class JiandangStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'positiveIdCardImageUrl',
      title: '正面照URL',
      type: 'img',
      single: true,
      require: true
    }, {
      field: 'negativeIdCardImageUrl',
      title: '反面照URL',
      type: 'img',
      single: true,
      require: true
    }, {
      title: '手持身份证照片URL',
      field: 'handIdCardImageUrl',
      type: 'img',
      single: true,
      require: true
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      field: 'code',
      value: this.code,
      hidden: true
    }];
    return this.props.buildDetail({
      fields,
      addCode: 631791,
      onOk: () => {
        this.props.history.push(`/staff/jiandang-step2?code=${this.code}`);
      }
    });
  }
}

export default JiandangStep2;
