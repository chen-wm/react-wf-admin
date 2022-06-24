import React, { useEffect, useState, useRef } from 'react'
import { Layout, message } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { getUserList } from '@/api/list'
import { Form, Row, Input, Button, Table, Divider, Modal, Popconfirm } from 'antd'
import { removeUser } from '../../api/list'
import ModalDialog from './Modal'

const User = () => {
    const [form] = Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState(null)
    const [queryParams, setQueryParams] = useState({
        current: 1,
        size: 10
    })
    useEffect(() => {
        setLoading(true)
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
                        <a>修改</a>
                        <Divider type='vertical' />

                        <Popconfirm
                            okText='确认'
                            cancelText='取消'
                            title='是否删除选中数据?'
                            onConfirm={() => showDeleteConfirm(record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ) : null
        }
    ]
    const loadData = () => {
        getUserList(queryParams)
            .then(res => {
                if (res.code === 0) {
                    setDataSource(res.data.records)
                    setLoading(false)
                }
            })
            .catch(e => {
                message.error(e)
            })
    }
    const onFinish = values => {
        setQueryParams(prevState => {
            return { ...prevState, ...values }
        })
    }
    const handleReset = () => {
        setQueryParams({
            current: 1,
            size: 10
        })
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

    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['用户管理']} />
            </div>
            <div className='base-style '>
                <Form layout='inline' form={form} name='control-hooks' onFinish={onFinish}>
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
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
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
                        }}>
                        新增
                    </Button>
                </div>
                <Table dataSource={dataSource} loading={loading} columns={columns} rowKey='id' />
            </div>
            <ModalDialog
                visible={visible}
                title={title}
                onHide={() => {
                    setVisible(false)
                }}
            />
        </Layout>
    )
}

export default User
