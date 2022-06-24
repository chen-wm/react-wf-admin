import { Button, Form, Input, Modal, Row } from 'antd'
import React, { useState, useEffect } from 'react'

const ModalDialog = props => {
    const [form] = Form.useForm()
    const [ruleForm, setForm] = useState({})
    const handleOk = () => {
        console.log(ruleForm)
        // props.onHide()
    }

    const handleCancel = () => {
        props.onHide()
    }
    const onFinish = () => {
        const values = form.getFieldValue()
        console.log(form)
        console.log(form.getFieldValue(), values)

        setForm(() => values)
    }
    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <Modal title={props.title} visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
            <Form layout='inline' form={form} name='control-hooks' onFinish={onFinish}>
                <Row>
                    <Form.Item
                        label='昵称'
                        name='nickname'
                        rules={[{ required: true, message: '请输入昵称8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入用户昵称' allowClear />
                    </Form.Item>
                    <Form.Item
                        label='密码'
                        name='password'
                        rules={[{ required: true, message: '请输入密码8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入密码' allowClear />
                    </Form.Item>
                    <Form.Item
                        label='用户名'
                        name='username'
                        rules={[{ required: true, message: '请输入用户名8-32位数', min: 8, max: 32 }]}>
                        <Input placeholder='请输入用户名' allowClear />
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalDialog
