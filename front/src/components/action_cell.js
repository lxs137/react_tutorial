import React, { Component } from 'react';
import { Popconfirm, Modal } from 'antd';
import EditDialog from './edit_dialog';

export default class ActionCell extends Component {
  constructor(props) {
    super(props);
    this.user_info = this.props.getData();
  }
  editModalBuilder = (e) => {
    Modal.confirm({
      title: '修改用户信息',
      content: (
        <EditDialog
          onChange={this.handleDataChange}
          data={this.user_info}></EditDialog>
      ),
      onOk: () => this.props.onSave(this.user_info),
      maskClosable: false
    })
  }
  handleDataChange = (value) => {
    this.user_info = value;
  }
  render() {
    return (
      <div>
        <span>
          <a onClick={this.editModalBuilder} 
            style={{ marginRight: 16 }}>编辑</a>
          <Popconfirm
            title="确认删除该记录？"
            onConfirm={this.props.onRemove}>
            <a>删除</a>
          </Popconfirm>
        </span>
      </div>
    )
  }
}