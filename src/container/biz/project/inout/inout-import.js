import React from 'react';
import { Form, Spin, message } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class InputImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      typeList: [],
      isLoading: false
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'entry_exit_type' })
    ])
    .then(([typeList]) => {
      this.setState({
        typeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { typeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
      required: true
    }, {
      title: '导入模版',
      field: 'downloadTmp',
      type: 'download',
      links: [{
        name: '字段填写说明',
        url: '/download/00.字段填写说明.xlsx'
      }, {
        name: '项目人员进退场导入模板',
        url: '/download/04.项目人员进退场导入模板.xlsx'
      }]
    }, {
      title: '项目人员进退场列表',
      field: 'dateList',
      type: 'import',
      required: true,
      options: {
        fields: [{
          title: '企业统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '工人所属企业名称',
          field: 'corpName'
        }, {
          title: '工人所属班组名称',
          field: 'teamName'
        }, {
          title: '工人姓名',
          field: 'workerName'
        }, {
          title: '证件号码',
          field: 'idcardNumber'
        }, {
          title: '进退场日期',
          field: 'date',
          type: 'datetime'
        }, {
          title: '类型',
          field: 'type'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631733,
      beforeSubmit: (params) => {
        let error = false;
        let dateList = JSON.parse(JSON.stringify(params.dateList));
        for (let i = 0; i < dateList.length; i++) {
          let item = dateList[i];
          let error2 = findAndchangeInfo(typeList, item, 'type', i);
          if (!error) {
            error = error2;
          }
        }
        params.dateList = JSON.parse(JSON.stringify(dateList));
        const zzTime = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
        let isok = true;
        params.dateList.forEach(item => {
          if(!zzTime.test(item.date)) {
            isok = false;
          }
        });
        if(isok) {
          return !error;
        }else {
          message.warning('请统一时间格式为yyyy-mm-dd');
        }
        return !error;
      }
    });
  }
}

export default InputImport;
