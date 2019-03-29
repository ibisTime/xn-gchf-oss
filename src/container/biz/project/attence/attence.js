import React from 'react';
import moment from 'moment';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/project/attence';
import { listWrapper } from 'common/js/build-list';
import { isUndefined, showWarnMsg, dateTimeFormat, dateFormat } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectAttence,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectAttence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      projectCode: ''
    };
  }
  componentDidMount() {
    getProjectList().then((data) => {
      if (data.length) {
        this.setState({ projectCode: data[0].projectCode });
      }
      this.setState({ isLoaded: true });
    }).catch(() => {
      this.setState({ isLoaded: true });
    });
    this.nowDate = moment(new Date(), 'YYYY-MM-DD');
  }
  render() {
    const { isLoaded, projectCode } = this.state;
    const fields = [{
      title: '工人姓名',
      field: 'workerName',
      search: true
    }, {
      title: '证件号',
      field: 'idCardNumber'
    }, {
      title: '刷卡时间',
      field: 'date',
      type: 'date',
      render: dateTimeFormat,
      search: true,
      noClear: true
    }, {
      title: '刷卡进出方向',
      field: 'direction',
      type: 'select',
      key: 'direction'
    }, {
      title: '通道的名称',
      field: 'channel'
    }, {
      title: '通行方式',
      field: 'attendType',
      type: 'select',
      key: 'attend_type'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      search: true,
      noClear: true
    }, {
      title: '所在企业',
      field: 'corpName'
    }, {
      title: '所在企业',
      field: 'corpCode',
      pageCode: '631255',
      params: {
        uploadStatus: '2'
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      type: 'select',
      hidden: true,
      search: true
    }, {
      title: '所在班组',
      field: 'teamName'
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631919,
      rowKey: ['idCardNumber', 'date'],
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        add: () => {
          this.props.history.push('/project/attence/add');
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            let date = dateFormat(items[0].date);
            this.props.history.push(`/project/attence/addedit?v=1&code=${items[0].idCardNumber}&pcode=${items[0].projectCode}&date=${date}`);
          }
        }
      },
      beforeDetail: (params) => {
        if (isLoaded && projectCode && !this.isBefored) {
          this.isBefored = true;
          // 这个页面是第一次加载，并且redux里“对应项目”没有值
          if (isUndefined(this.props.searchParam.projectCode)) {
            params.projectCode = projectCode;
          }
          if (isUndefined(this.props.searchParam.date)) {
            params.date = this.nowDate;
          }
        }
      },
      afterDetail: () => {
        if (isUndefined(this.props.searchParam.projectCode)) {
          this.props.form.setFieldsValue({
            projectCode,
            date: this.nowDate
          });
          let values = this.props.form.getFieldsValue();
          this.props.setSearchParam(values);
        }
      }
    }) : null;
  }
}

export default ProjectAttence;
