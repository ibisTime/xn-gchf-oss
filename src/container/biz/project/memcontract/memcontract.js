import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/project/memcontract';
import { listWrapper } from 'common/js/build-list';
import { isUndefined, showWarnMsg, dateTimeFormat } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectMemContract,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectMemContract extends React.Component {
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
  }
  render() {
    const { isLoaded, projectCode } = this.state;
    const fields = [{
      title: '工人姓名',
      field: 'workerName',
      search: true
    }, {
      title: '证件号',
      field: 'idcardNumber'
    }, {
      title: '合同期限类型',
      field: 'contractPeriodType',
      type: 'select',
      key: 'contract_period_type'
    }, {
      title: '期限',
      field: 'startDate',
      render: (v, d) => {
        return d ? dateTimeFormat(d.startDate) + '~' + dateTimeFormat(d.endDate) : '';
      }
    }, {
      title: '计量',
      field: 'unitPrice',
      render: (v, d) => {
        return d ? d.unitPrice + '/' + d.unit : '';
      }
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
      field: 'corpName',
      search: true
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631917,
      rowKey: 'idcardNumber',
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        add: () => {
          this.props.history.push('/project/memcontract/add');
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/memcontract/addedit?v=1&code=${keys[0]}&pcode=${items[0].projectCode}`);
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
        }
      },
      afterDetail: () => {
        this.props.form.setFieldsValue({ projectCode });
        let values = this.props.form.getFieldsValue();
        this.props.setSearchParam(values);
      }
    }) : null;
  }
}

export default ProjectMemContract;
