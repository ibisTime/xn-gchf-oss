import React from 'react';
import fetch from 'common/js/fetch';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/daifa/daifa-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.daifaDaifaAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class DaifaAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  // componentDidMount() {
  //   getUserDetail(cookies.get('userId')).then(data => {
  //     this.getUserDetail(data.companyCode);
  //   });
  // }
  // getUserDetail(companyCode) {
  //   this.setState({ companyCode: companyCode });
  // }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'projectCode',
      title: '项目编号'
    }, {
      field: 'projectName',
      title: '项目名称'
    }, {
      field: 'title',
      title: '标题'
    }, {
      field: 'content',
      title: '内容'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'message_status',
      searcH: true
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'handleDatetime',
      title: '处理时间',
      type: 'datetime'
    }, {
      field: 'handleNote',
      title: '处理备注'
    }, {
      field: 'handler',
      title: '处理人'
    }
    // {
    //   title: '工资条',
    //   field: 'list',
    //   type: 'o2m',
    //   options: {
    //     // add: true,
    //     // edit: true,
    //     // delete: true,
    //     // scroll: { x: 1300 },
    //     fields: [
    //       {
    //         title: '本月工资',
    //         field: 'amount',
    //         amount: true
    //       },
    //       {
    //         title: 'cutAmount',
    //         field: '扣款金额',
    //         amount: true
    //       },
    //       {
    //         title: '扣款说明',
    //         field: 'cutNote'
    //       },
    //       {
    //         title: '迟到天数',
    //         field: 'delayDays'
    //       },
    //       {
    //         title: '早退天数',
    //         field: 'earlyDays'
    //       },
    //       {
    //         title: '请假天数',
    //         field: 'leavingDays'
    //       },
    //       {
    //         title: '应发工资',
    //         field: 'shouldAmount',
    //         amount: true
    //       },
    //       {
    //         title: '实际工资',
    //         field: 'factAmount',
    //         amount: true
    //       },
    //       {
    //         title: '税费',
    //         field: 'tax',
    //         amount: true
    //       },
    //       {
    //         title: '所属月份',
    //         field: 'month'
    //       },
    //       {
    //         title: '最近一次发放时间',
    //         field: 'payDatetime',
    //         type: 'datetime'
    //       },
    //       {
    //         title: '发放金额',
    //         field: 'payAmount',
    //         type: 'datetime'
    //       }
    //     ]
    //   }
    // }
  ];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631437
    });
  }
}

export default DaifaAddEdit;
