import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import ModalDetail from 'common/js/build-modal-detail';
import DetailComp from './lib/detailComp';
export const DetailWrapper = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return (
    @Form.create()
    @connect(mapStateToProps, mapDispatchToProps)
    class DetailComponent extends DetailComp {
      render() {
        return (
          <div>
            <WrapComponent {...this.props} buildDetail={this.buildDetail} getSelectData={this.getSelectData}></WrapComponent>
            <ModalDetail
              title={this.state.modalOptions.title || ''}
              visible={this.state.modalVisible}
              hideModal={() => this.setState({modalVisible: false})}
              options={this.state.modalOptions}></ModalDetail>
          </div>
        );
      }
      if (item.date28) {
        rules.push({
          pattern: /(^[1-9]$)|(^[1][0-9]$)|(^[2][0-8]$)/,
          message: '请输入1-28之间的整数'
        });
      }
      return rules;
    }
    render() {
      return (
        <div>
          <WrapComponent {...this.props} buildDetail={this.buildDetail} getSelectData={this.getSelectData}></WrapComponent>
          <ModalDetail
            title={this.state.modalOptions.title || ''}
            visible={this.state.modalVisible}
            hideModal={() => this.setState({ modalVisible: false })}
            options={this.state.modalOptions}></ModalDetail>
        </div>
      );
    }
  }
  );
};