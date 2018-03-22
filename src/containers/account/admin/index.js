import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Badge, Button, Divider, Form, Input, Modal, Switch } from 'antd';
import moment from 'moment';
import PageHeader from '../../../components/PageHeader';
import StandardTable from '../../../components/StandardTable';

import * as actions from './action';

import styles from './admin.module.less';

const FormItem = Form.Item;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['停用', '正常', '冻结'];



const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, title, user } = props;
	let newUser = user;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();

			if(newUser) {
				fieldsValue.userNo = newUser.userNo;
				fieldsValue.enable = fieldsValue.enable ? 1 : 0;
			}
      handleAdd(fieldsValue);
    });
  };
	function onChange(checked) {
		// newUser.enable = checked ? 1: 0;
	  // console.log(`switch to ${checked}`);
	}
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="用户名"
      >
        {form.getFieldDecorator('name', {
					initialValue: newUser ? newUser.userName: '',
          rules: [{ required: true, message: '用户名不能为空' }],
        })(
          <Input placeholder="请输入用户名" disabled={!!newUser} />
        )}
      </FormItem>
      {newUser && <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="用户状态"
      >
        {form.getFieldDecorator('enable', {
					initialValue: newUser.enable,
          rules: [{ required: true, message: '状态不能为空' }],
        })(
          <Switch defaultChecked={newUser.enable === 1 ? true : false}  />
        )}
      </FormItem>}
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="密码"
      >
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '密码不能为空' }],
        })(
          <Input type='password' placeholder="请输入密码" />
        )}
      </FormItem>
    </Modal>
  );
});

class adminUser extends Component {

	state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
		parentProps: {
      title: '新建',
    }
  };

	componentDidMount() {
		this.props.actions.findMembers();
	}

	handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

	handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
			parentProps: {
				title: '新建',
				user: null,
			}
    });
  }

	editBigUsers = (flag, param) =>{
		this.setState({
      modalVisible: !!flag,
			parentProps: param
    });
	}

	handleAdd = (values) => {
		this.props.actions.saveBigSystemManage(values);
	}
	removeBigUsers = (item) => {
		console.log(item);

		// this.props.actions.removeBigUsers(item.userNo)
	}

	render() {
		const columns = [
		  {
		    title: '用户名',
		    dataIndex: 'userName',
				key: 'userName',
		  },
		  {
		    title: 'ID',
		    dataIndex: 'userNo',
				key: 'userNo',
		  },
		  {
		    title: '状态',
		    dataIndex: 'enable',
				key: 'enable',
		    filters: [
		      {
		        text: status[0],
		        value: 0,
		      },
		      {
		        text: status[1],
		        value: 1,
		      },
		      {
		        text: status[2],
		        value: 2,
		      },
		    ],
		    render(val) {
		      return <Badge status={statusMap[val]} text={status[val]} />;
		    },
		  },
		  {
		    title: '更新时间',
		    dataIndex: 'regTime',
		    sorter: true,
				key: 'regTime',
		    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		  },
		  {
		    title: '操作',
		    render: (text, record, index) => (
		      <Fragment>
		        <a onClick={() => this.editBigUsers(true, {title: '修改', user: record})}>修改</a>
		        <Divider type="vertical" />
		        <a onClick={() => this.removeBigUsers(record)}>删除</a>
		      </Fragment>
		    ),
		  },
		];
		const { name, loading, adminAccount } = this.props;
		const { selectedRows, modalVisible } = this.state;
		const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
		return (
			<PageHeader {...this.props}  title={name} dec="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"  >
				<Card bordered={false}>
					<div className={styles.tableList}>
            <div className={styles.tableListForm}>
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>

            </div>
							<StandardTable
	              selectedRows={selectedRows}
	              loading={loading}
	              dataSource={adminAccount.bigUsers ? adminAccount.bigUsers.list: []}
	              columns={columns}
	              rowKey='userNo'
	              onSelectRow={this.handleSelectRows}
	            />

          </div>
				</Card>
				<CreateForm
          {...parentMethods}
					{...this.state.parentProps}
          modalVisible={modalVisible}
        />
			</PageHeader>
		);
	}
}

export default connect((state)=> ({
	adminAccount: state.adminAccount,
	loading: state.loading,
}), (dispatch)=>({
	actions: bindActionCreators({...actions}, dispatch)
}))(adminUser);
