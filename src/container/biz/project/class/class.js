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
} from '@redux/biz/project/class';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, isUndefined } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectClass,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectClass extends React.Component {
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
      title: '班组编号',
      field: 'teamSysNo'
    }, {
      title: '班组名称',
      field: 'teamName',
      search: true
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
      title: '责任人姓名',
      field: 'responsiblePersonName'
    }, {
      title: '责任人联系电话',
      field: 'responsiblePersonPhone'
    }, {
      title: '进场时间',
      field: 'entryTime',
      type: 'datetime'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark',
      type: 'textarea',
      normalArea: true
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631910,
      rowKey: 'teamSysNo',
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/class/addedit?code=${keys[0]}&pcode=${items[0].projectCode}`);
          }
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/class/addedit?v=1&code=${keys[0]}&pcode=${items[0].projectCode}`);
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
        if (isUndefined(this.props.searchParam.projectCode)) {
          this.props.form.setFieldsValue({ projectCode });
          let values = this.props.form.getFieldsValue();
          this.props.setSearchParam(values);
        }
      }
    }) : null;
  }
}

export default ProjectClass;
