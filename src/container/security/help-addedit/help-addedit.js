import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/menu-addedit';
import { getQueryString, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityMenuAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class HelpAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userKind: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '适用端',
      field: 'systemCode',
      type: 'select',
      data: [{
        dkey: 'O',
        dvalue: '业主端'
      }, {
        dkey: 'S',
        dvalue: '监管端'
      }, {
        dkey: 'B',
        dvalue: '银行端'
      }, {
        dkey: 'P',
        dvalue: '平台端'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      required: true,
      readonly: this.code
    }, {
      title: '次序',
      field: 'orderNo',
      required: true
    }, {
      title: '标题',
      field: 'title',
      required: true
    }, {
      title: '内容',
      field: 'content',
      required: true,
      type: 'textarea'
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631127,
      addCode: 631120,
      editCode: 631122,
      beforeSubmit: (params) => {
        params.updater = getUserId();
        return params;
      }
    });
  }
}

export default HelpAddedit;
