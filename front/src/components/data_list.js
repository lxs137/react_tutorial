import React, { Component } from 'react';
import { Button, Table, message, Modal } from 'antd'
import ActionCell from './action_cell';
import EditDialog from './edit_dialog';
import Filter from './filter';
import API from '../services/api';

// 与 const Column = Table.Column 等效
const { Column } = Table;

class DataList extends Component {
  constructor(props) {
    super(props);
    this.new_user = null;
    this.state = { data: [] };
    API.getUsers().then((users) => {
      this.setState({
        data: users
      })
    });
  }
  autoAddData() {
    message.loading('初始化数据中，请稍候...');
    API.autoAddTestData(5).then(() => {
      message.destroy();
    });
  }
  onSearch = (text, key) => {
    let query = {};
    query[key] = text;
    API.getUsers(query).then((users) => {
      this.setState({
        data: users
      })
    });
  }
  onRemoveRow = (index) => {
    return () => {
      API.removeUser(this.state.data[index]._id).then(
        (data) => {
          this.setState((prevState) => {
            prevState.data.splice(index, 1);
            return {
              data: prevState.data
            };
          })
        }, (error) => message.error("删除失败", 2.5));  
    }
  }
  onSaveRow = (index) => {
    return (data) => {
      API.updateUser(this.state.data[index]._id, data).then(
        () => this.setState((prevState) => {
          prevState.data[index] = data;
          return {
            data: prevState.data
          }
        }), (error) => message.error("更新失败", 2.5));
    }
  }
  onAddRow = () => {
    Modal.confirm({
      title: '添加用户信息',
      content: (
        <EditDialog
          onChange={(value) => {this.new_user = value}}
          data={{}}></EditDialog>
      ),
      onOk: () => {
        API.addUser(this.new_user).then(
          (user) => this.setState((prevState) => {
            prevState.data.unshift(user);
            return {
              data: prevState.data
            }
          }), (error) => message.error("添加用户信息失败", 2.5));
      },
      maskClosable: false
    })
  }
  renderGenderColumn = (text, record, index) => {
    return text === 'female' ? '女' : '男';
  }
  renderRoleColumn = (text, record, index) => {
    switch(text) {
      case 'admin': return '管理员';
      case 'user': return '普通用户';
      default: return '访客';
    }
  }
  renderTimeColumn = (text, record, index) => {
    return new Date(text).toLocaleString();
  }
  renderOperationColumn = (text, record, index) => {
    if(record.role === 'admin') {
      return (
        <div>禁止修改</div>
      );
    } else {
      return (
        <ActionCell
          getData={() => this.state.data[index]}
          onSave={this.onSaveRow(index)}
          onRemove={this.onRemoveRow(index)}></ActionCell>
      )
    }
  }
  render() {
    let gender_filters = [
      {text: '男', value: 'male'}, 
      {text: '女', value: 'female'}
    ];
    let role_filters = [
      {text: '管理员', value: 'admin'},
      {text: '普通用户', value: 'user'},
      {text: '访客', value: 'guest'}
    ]
    return (
      <div>
        <div>
          <Button onClick={this.autoAddData} style={{marginRight: 16}}>
            初始化测试数据
          </Button>
          <Button onClick={this.onAddRow}>添加新用户</Button>
        </div>
        <Filter onSearch={this.onSearch}></Filter>
        <Table dataSource={this.state.data} bordered
          rowKey={(record) => record._id}>
          <Column title="姓名" dataIndex="name"></Column>
          <Column title="性别" dataIndex="gender"
            filters={gender_filters}
            onFilter={(value, record) => record.gender===value}
            render={this.renderGenderColumn}></Column>
          <Column title="权限" dataIndex="role"
            filters={role_filters}
            onFilter={(value, record) => record.role===value}
            render={this.renderRoleColumn}></Column>
          <Column title="联系方式" dataIndex="phone"></Column>
          <Column title="登记时间" dataIndex="registered"
            render={this.renderTimeColumn}></Column>
          <Column title="操作" dataIndex="operation" 
            render={this.renderOperationColumn}></Column>
        </Table>
      </div>
    );
  }
}

export default DataList;