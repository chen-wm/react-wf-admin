import React, { Component, useState } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@/style/view-style/login.scss'
import { login } from '../../api/list'
import store from '@/store'

const Login = props => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const onFinish = values => {
        if (!values) return
        setLoading(true)
        values.accountType = 'us168-admin'
        // values.imageVerificationCode = '1233'
        // values.deviceId = '2025ccb5f0ba6c45edf10cf68435f03d'
        login(values)
            .then(res => {
                if (res.code === 0) {
                    const action = {
                        type: 'SET_TOKEN',
                        userInfo: res.data
                    }
                    store.dispatch(action)
                    message.success('登录成功!')
                    props.history.push('/')
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => setLoading(false))
    }

    return (
        <Provider store={store}>
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>万福权限后台管理系统</h3>
                        <Divider />
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='用户名'
                                />
                            </Form.Item>
                            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder='密码'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                    loading={loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        </Provider>
    )
}

export default withRouter(Login)
