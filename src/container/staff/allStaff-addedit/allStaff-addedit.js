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
} from '@redux/staff/allStaff-addedit';
import { getQueryString, showSucMsg, formatDate, getUserKind } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.staffAllStaffAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AllStaffAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data.companyCode);
        this.setState({ companyCode: data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      required: true
    }, {
      field: 'idAddress',
      title: '身份证上籍贯',
      required: true
    }, {
      field: 'mobile',
      title: '联系方式',
      required: true
    }, {
      field: 'idNo',
      title: '证件号',
      required: true,
      listCode: '631416'
    }, {
      field: 'pict1',
      title: '免冠照片',
      single: true,
      type: 'img',
      required: true
    }, {
      field: 'pict2',
      title: '手持身份证照片',
      single: true,
      type: 'img',
      required: true
    }, {
      field: 'pict3',
      title: '身份证正反面照片',
      single: true,
      type: 'img',
      required: true
    },
    // {
    //   field: 'contentPic',
    //   title: '合同照片',
    //   type: 'img',
    //   single: true,
    //   required: true
    // },
    {
      field: 'updateName',
      title: '更新人'
    }];
    const fieldos = [{
      field: 'name',
      title: '姓名',
      required: true
    }, {
      field: 'sex',
      title: '性别'
    }, {
      field: 'idNation',
      title: '民族'
    }, {
      field: 'birthdays',
      title: '生日',
      type: 'datetime',
      formatter: (v, d) => {
        return formatDate(d.birthday);
      }
    }, {
      field: 'idNo',
      title: '证件号',
      required: true
    }, {
      field: 'idAddress',
      title: '身份证上籍贯'
    }, {
      field: 'bankName1',
      title: '开户行',
      formatter: (v, d) => {
        return d.bankCard.bankName + d.bankCard.subbranch;
      }
    }, {
      field: 'bankcardNumber1',
      title: '银行账户',
      formatter: (v, d) => {
        return d.bankCard.bankcardNumber;
      }
    }, {
      field: 'name1',
      title: '技能名称',
      formatter: (v, d) => {
        return d.skillList[2].name;
      }
    }, {
      field: 'score1',
      title: '技能评分',
      formatter: (v, d) => {
        return d.skillList[2].score;
      }
    }, {
      field: 'pdf1',
      title: '技能证书',
      type: 'img',
      formatter: (v, d) => {
        return d.skillList[2].pdf;
      },
      required: true
    }, {
      field: 'pict1',
      title: '免冠照片',
      type: 'img',
      required: true
    }, {
      field: 'pict2',
      title: '手持身份证照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict3',
      title: '身份证正反面照片',
      single: true,
      type: 'img',
      required: true
    },
    // {
    //   field: 'contentPic',
    //   title: '合同照片',
    //   type: 'img',
    //   single: true,
    //   required: true
    // },
    {
      field: 'idPolice',
      title: '签发机关'
    }, {
      field: 'idStartDates',
      title: '证件有效时间',
      formatter: (v, d) => {
        return formatDate(d.idStartDate) + '---' + formatDate(d.idEndDate);
      }
    }, {
      field: 'updateName',
      title: '更新人'
    }];
    return this.props.buildDetail({
      fields: this.view ? fieldos : fields,
      code: this.code,
      view: this.view,
      detailCode: 631417,
      addCode: 631410,
      editCode: 631412,
      buttons: this.view ? [] : [{
        title: '保存',
        check: true,
        handler: (param) => {
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            param.updater = getUserId();
            this.props.doFetching();
            fetch(631412, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          });
        }
      }]
    });
  }
}

export default AllStaffAddEdit;
