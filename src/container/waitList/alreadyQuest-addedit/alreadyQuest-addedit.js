import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/alreadyQuest-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.waitListAlreadyQuestAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)

class AlreadyQuestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  };

  render() {
    const fields = [{
      field: 'handler',
      hidden: true
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      type: 'datetime'
    }, {
      title: '代发账户户名',
      field: 'bankName'
    }, {
      title: '代发账户账号',
      field: 'bankcardNumber'
    }, {
      title: '下载次数',
      field: 'download'
    }, {
      title: '备注',
      field: 'handleNote'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      searchParams: {
        status: 2
      },
      detailCode: 631437
    });
  }
}

export default AlreadyQuestAddedit;
