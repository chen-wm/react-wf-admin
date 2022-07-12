import React, { useEffect, useState } from 'react'
import { Layout, message } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { getUserList } from '@/api/list'
import { Form, Row, Input, Button, Table, Divider, Popconfirm } from 'antd'
import { removeUser } from '../../api/list'
import ModalDialog from './Modal'

const User = () => {
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState(null)
    const [flag, setFlag] = useState('')
    const [total, setTotal] = useState(null)
    const [record, setRecord] = useState(null)
    const [queryParams, setQueryParams] = useState({
        current: 1,
        size: 10
    })
    useEffect(() => {
        loadData()
    }, [queryParams])
    const columns = [
        {
            title: '昵称',
            dataIndex: 'nickname'
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>
                dataSource.length >= 1 ? (
                    <span>
                        <a
                            onClick={() => {
                                setRecord(record)
                                setVisible(true)
                                setFlag('edit')
                            }}>
                            修改
                        </a>
                        <Divider type='vertical' />

                        <Popconfirm
                            okText='确认'
                            cancelText='取消'
                            title='是否删除选中数据?'
                            onConfirm={() => {
                                showDeleteConfirm(record.id)
                            }}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ) : null
        }
    ]
    const loadData = data => {
        setLoading(true)
        getUserList({ ...queryParams, ...data })
            .then(res => {
                if (res.code === 0) {
                    setDataSource(res.data.records)
                    setLoading(false)
                    setTotal(res.data.total)
                }
            })
            .catch(e => {})
    }
    const showDeleteConfirm = data => {
        removeUser({ id: data })
            .then(res => {
                if (res.code === 0) {
                    loadData()
                }
            })
            .catch(e => {
                message.error(e)
            })
    }
    const paginationProps = {
        showSizeChanger: false, //设置每页显示数据条数
        showQuickJumper: false,
        showTotal: () => `共${total}条`,
        pageSize: queryParams.size,
        total
    }
    const handleTableChange = newPagination => {
        loadData(newPagination)
    }
    const props = { visible, title, flag, record }
    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['用户管理']} />
            </div>
            <div className='base-style '>
                <Form
                    layout='inline'
                    form={form}
                    name='control-hooks'
                    onFinish={values => {
                        loadData(values)
                    }}>
                    <Row>
                        <Form.Item label='用户昵称' name='nickname'>
                            <Input placeholder='请输入用户昵称' allowClear />
                        </Form.Item>
                        <Form.Item label='用户名' name='username'>
                            <Input placeholder='请输入用户名' allowClear />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                搜索
                            </Button>
                            <Button
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                    form.resetFields()
                                    loadData()
                                }}>
                                重置
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
                <div className='mr20'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        onClick={() => {
                            setVisible(true)
                            setTitle('新增')
                            setFlag('add')
                        }}>
                        新增
                    </Button>
                </div>
                <Table
                    dataSource={dataSource}
                    onChange={handleTableChange}
                    pagination={paginationProps}
                    loading={loading}
                    columns={columns}
                    rowKey='id'
                />
            </div>
            <ModalDialog
                {...props}
                onHide={() => {
                    setVisible(false)
                }}
                refreshList={loadData}
            />
        </Layout>
    )
}

export default User
