import React from 'react';
import cookies from 'browser-cookies';
import AddBumen from 'container/newProj/project-addBumen/project-addBumen';
import { Form, Spin, Button, Tree, Modal } from 'antd';
import { getCompany, getBumen, deleteCompany1, deleteBumen1, getCompanyDetail } from 'api/company';
import { setRoleMenus, getUserDetail } from 'api/user';
import { getBumen1 } from 'api/project';
import { getQueryString, showSucMsg, showWarnMsg, getUserKind, getUserId } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

class ProjectAddBumen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      treeData: [],
      expandedKeys: [],
      checkedKeys: [],
      selectKey: '',
      stopGetTree1: false
    };
    this.code = getQueryString('code');
    this.name = getQueryString('name');
  }
  componentDidMount() {
    this.getTree();
  }
  res = {
    'key': 'company'
  }
  reSetData() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        getCompany(data.projectCodeList, 'S').then((companyData) => {
          console.log(companyData[0]);
          this.getTree(companyData[0]);
          this.setState({
            fetching: false
          });
        }).catch(() => this.setState({ fetching: false }));
      });
    } else {
      getUserDetail(getUserId()).then((data) => {
        getCompanyDetail(data.companyCode).then((data) => {
          this.getTree(data);
          this.setState({
            fetching: false
          });
        }).catch(() => this.setState({ fetching: false }));
      });
    }
  }
  getTree(data) {
    getBumen1({projectCode: this.code}).then((data) => {
      this.getTree0(data);
    });
    // let result = [];
    // result.push({
    //   title: data.name,
    //   key: data.code
    // });
    // this.result = result;
    // this.setState({ treeData: this.result });
  }
  getTree0(data) {
    let result = {};
    let companyCodeObj = {};
    data.forEach(v => {
      v.parentCode = v.parentCode || 'ROOT';
      if (!result[v.parentCode]) {
        result[v.parentCode] = [];
      }
      result[v.parentCode].push({
        title: v.name,
        key: v.code
      });
      companyCodeObj[v.code] = v.companyCode;
    });
    this.companyCodeObj = companyCodeObj;
    this.result = result;
    let tree = [];
    this.getTreeNode(result['ROOT'], tree);
    this.setState({ treeData: tree, fetching: false });
  }
  getTreeNode(arr, children) {
    if (arr) {
      arr.forEach(a => {
        if (this.result[a.key]) {
          a.children = [];
          children.push(a);
          this.getTreeNode(this.result[a.key], a.children);
        } else {
          children.push(a);
        }
      });
    }
  }
  getTree1(data, companyCode) {
    let result = {};
    let companyCodeObj = {};
    data.forEach(v => {
      v.parentCode = v.parentCode || 'ROOT';
      if (!result[v.parentCode]) {
        result[v.parentCode] = [];
      }
      result[v.parentCode].push({
        title: v.name,
        key: v.code
      });
      companyCodeObj[v.code] = v.companyCode;
    });
    this.companyCodeObj = companyCodeObj;
    this.result = result;
    let tree = [];
    this.getTreeNode(result['ROOT'], tree);
    let oldTree = this.state.treeData;
    oldTree.map(item => {
      if (item.key === companyCode) {
        item.children = tree;
      }
    });
    this.setState({ treeData: oldTree });
    this.setState({ stopGetTree1: true });
  }
  onSelect = (checkedKeys, event) => {
    console.log(checkedKeys);
    const { treeData } = this.state;
    this.checkNode = '';
    let key = event.node.props.eventKey;
    if (key === this.state.selectKey) {
      this.setState({ selectKey: '' });
    } else {
      this.setState({ selectKey: key });
    }
    if (!this.state.stopGetTree1) {
      // getBumen(key).then(bumenData => {
      //   this.getTree1(bumenData, key);
      // });
    }
  }
  getChildrenKeys(arr, childrenKeys) {
    arr.forEach(a => {
      childrenKeys.push(a.key);
      if (a.children) {
        this.getChildrenKeys(a.children, childrenKeys);
      }
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        // console.log(item.children);
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  addBumen = () => {
    this.props.history.push(`/newProj/companyConstruct/addBumen?projectCode=${this.code}`);
  }
  editBumen = () => {
    if (this.state.selectKey !== '') {
      this.props.history.push(`/newProj/companyConstruct/addBumen?code=${this.state.selectKey}&projectCode=${this.code}`);
    } else {
      showWarnMsg('请选择一个部门');
    }
  }
  deleteBumen = () => {
    if (this.state.selectKey !== '') {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        content: '确定删除该部门？',
        onOk: () => {
          this.setState({ fetching: true });
          deleteBumen1(this.state.selectKey).then(() => {
            showSucMsg('操作成功');
            this.setState({
              expandedKeys: [],
              checkedKeys: [],
              selectKey: '',
              stopGetTree1: false
            });
            this.reSetData();
          }).catch(this.setState({ fetching: false }));
        }
      });
    } else {
      showWarnMsg('请选择一家公司');
    }
  }
  render() {
    return (
      <Spin spinning={this.state.fetching}>
        {cookies.get('loginKind') === 'S' ? null
          : <div className="tools-wrapper" style={{ marginTop: 8 }}>
            <button type="button" className="ant-btn" onClick={this.addBumen}><span>新增部门</span></button>
            <button type="button" className="ant-btn" onClick={this.editBumen}><span>修改部门</span></button>
            <button type="button" className="ant-btn" onClick={this.deleteBumen}><span>删除部门</span></button>
          </div>
        }
        <AddBumen/>
        <Form className="detail-form-wrapper" onSubmit={this.handleSubmit}>
          <FormItem key='treeMenu' {...formItemLayout} >
            {this.state.treeData.length ? (
              <Tree
                checkable={false}
                showLine
                checkStrictly={true}
                defaultExpandAll
                autoExpandParent={false}
                onSelect={this.onSelect}
                checkedKeys={this.state.checkedKeys}
              >
                {this.renderTreeNodes(this.state.treeData)}
              </Tree>
            ) : null}
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default ProjectAddBumen;
