import React, { useEffect, useState, useRef } from 'react'
import { Layout } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { getUserList } from '@/api/list'
import { Form, Row, Col, Input, Button, Icon, Table, Divider, Pagination } from 'antd'
import log from 'echarts/src/scale/Log'

const  User =(props) => {
    const resultState = useRef(null)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [queryParams, setQueryParams] = useState({
        current: 1,
        size: 10
    })
    const {
        form: { getFieldDecorator,getFieldsError, getFieldError, isFieldTouched }
    } = props;
    const loadData = () => {
        getUserList(queryParams)
            .then(res => {
                if (res.code === 0) {
                    setDataSource(res.data.records)
                    setLoading(false)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        console.log('props',props.form)
        setLoading(true)
        loadData()
    }, [])
    const handleSearch = () => {}
    const handleReset = () => {
        setQueryParams({
            current: 1,
            size: 10
        })
        loadData()
    }
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
            render: (text, record) => (
                <span>
                    <a>修改</a>
                    <Divider type='vertical' />
                    <a>删除</a>
                </span>
            )
        }
    ]
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['用户管理']}></CustomBreadcrumb>
            </div>
            <div className='base-style'>
                <Form layout='inline' className='ant-advanced-search-form' onSubmit={handleSearch}>
                    <Row>
                        <Form.Item label='用户昵称'>
                            {getFieldDecorator('username')
                          (
                              <Input
                                placeholder='请输入用户昵称'
                                allowClear
                                onChange={e => (queryParams.nickname = e.target.value)}
                            />
                          )}
                        </Form.Item>
                        <Form.Item label='用户名'>
                            <Input
                                placeholder='请输入用户名'
                                allowClear
                                onChange={e => (queryParams.username = e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' onClick={loadData}>
                                搜索
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                                重置
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    loading={loading}
                    columns={columns}
                    rowKey='id'
                />
                ;{/*<Row type="flex" justify="end">*/}
                {/*    <Pagination size="small" total={50} showSizeChanger showQuickJumper />*/}
                {/*</Row>*/}
            </div>
        </Layout>
    )
}

export default User
