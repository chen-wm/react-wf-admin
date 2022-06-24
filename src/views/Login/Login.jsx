import React, { Component } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import '@/style/view-style/login.scss'
import { login } from '../../api/list'
import store from '@/store'

class Login extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: false,
        ...store.getState()
    }

    enterLoading = () => {
        this.setState({
            loading: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.accountType = 'us168-admin'
                login(values)
                    .then(res => {
                        const action = {
                            type: 'SET_TOKEN',
                            userInfo: res.data
                        }
                        store.dispatch(action)
                        this.enterLoading()
                        this.timer = setTimeout(() => {
                            message.success('登录成功!')
                            this.props.history.push('/')
                        }, 2000)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        })
    }

    componentWillUnmount() {
        notification.destroy()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Provider store={store}>
                <Layout className='login animated fadeIn'>
                    <div className='model'>
                        <div className='login-form'>
                            <h3>万福权限后台管理系统</h3>
                            <Divider />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名!' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder='用户名'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(
                                        <Input
                                            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type='password'
                                            placeholder='密码'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='login-form-button'
                                        loading={this.state.loading}>
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
}

export default withRouter(Form.create()(Login))
