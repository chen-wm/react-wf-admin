import { Form, Input, message, Modal, Space } from 'antd'
import React, { useEffect } from 'react'
import { addUser, writeUser } from '../../api/list'

const ModalDialog = ({ flag, title, visible, onHide, refreshList, record }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        if (visible && flag === 'edit') {
            console.log(record)
            setTimeout(() => {
                form.setFieldsValue({
                    nickname: record.nickname,
                    password: record.password,
                    username: record.username
                })
            }, 0)
        }
    }, [visible])
    const onFinish = () => {
        let action = flag === 'add' ? addUser : writeUser
        console.log(5, form.getFieldValue())
        let params = { ...form.getFieldValue() }
        if (flag === 'edit') {
            params.id = record.id
        }
        action(params)
            .then(res => {
                if (res.code === 0) {
                    message.success(`${flag === 'add' ? '新增用户成功' : '修改用户成功'}`)
                    onHide()
                    refreshList()
                    form.resetFields()
                } else {
                    message.error(res.message)
                }
            })
            .catch(e => {
                console.log(e)
                form.resetFields()
            })
    }

    const cumstomSubmit = () => {
        form.validateFields()
            .then(values => {
                form.submit()
            })
            .catch(errorInfo => {})
    }

    const formItemLayout = {
        labelCol: { style: { width: '150px' } },
        wrapperCol: { span: 18 }
    }

    return (
        <Modal
            title={title}
            visible={visible}
            destroyOnClose={true}
            onOk={cumstomSubmit}
            onCancel={onHide}
            okText='确认'
            cancelText='取消'>
            <Form layout='inline' form={form} name='control-hooks' preserve={false} onFinish={onFinish}>
                <Space
                    direction='vertical'
                    size='middle'
                    style={{
                        display: 'flex'
                    }}>
                    <Form.Item
                        {...formItemLayout}
                        label='昵称'
                        name='nickname'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入昵称8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入用户昵称' allowClear />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='密码'
                        name='password'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入密码8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入密码' allowClear />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label='用户名'
                        name='username'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入用户名8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入用户名' allowClear />
                    </Form.Item>
                </Space>
            </Form>
        </Modal>
    )
}

export default ModalDialog
