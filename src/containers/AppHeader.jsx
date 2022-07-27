import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Layout, Avatar, Badge, Space, Row, Tag } from 'antd'
import { SettingFilled, MenuUnfoldOutlined, RocketFilled, GithubFilled } from '@ant-design/icons'
import store from '@/store'
import { useState } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    if (state) {
        return {
            tagList: state
        }
    }
}
const AppHeader = props => {
    let { menuClick, avatar, menuToggle, loginOut } = props
    const [tagList, setTagList] = useState([])
    useEffect(() => {
        store.subscribe(() => {
            console.log('state状态改变了，新状态如下', store.getState().tagMenu.tagList)
            console.log(props)
            setTagList([...tagList, ...store.getState().tagMenu.tagList])
        })
    }, [])
    const handleClose = (row, e) => {
        e.preventDefault()
        store.dispatch({
            type: 'delete',
            payload: row
        })
    }
    const menu = (
        <Menu>
            <Menu.ItemGroup title='用户设置'>
                <Menu.Divider />
                <Menu.Item key={0}>
                    <Space>
                        <SettingFilled />
                        个人设置
                    </Space>
                </Menu.Item>
                <Menu.Item key={1}>
                    <Space>
                        <MenuUnfoldOutlined />
                        系统设置
                    </Space>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item key={2}>
                <Space>
                    <RocketFilled />
                    <span onClick={loginOut}>退出登录</span>
                </Space>
            </Menu.Item>
        </Menu>
    )
    return (
        <Layout.Header className='header'>
            <div className='left'>
                {tagList &&
                    tagList.map(item => {
                        return (
                            <Tag closable key={item.route} color='purple' onClose={handleClose.bind(this, item)}>
                                {item.name}
                            </Tag>
                        )
                    })}
            </div>
            <div className='right'>
                <div className='mr15'>
                    <Badge dot={true} offset={[-2, 0]}>
                        <a href='https://github.com/chen-wm/react-wf-admin' style={{ color: '#000' }}>
                            <GithubFilled />
                        </a>
                    </Badge>
                </div>
                <div>
                    <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
                        <div className='ant-dropdown-link'>
                            <Avatar icon='user' src={avatar} alt='avatar' style={{ cursor: 'pointer' }} />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Layout.Header>
    )
}

AppHeader.propTypes = {
    menuClick: PropTypes.func,
    avatar: PropTypes.string,
    menuToggle: PropTypes.bool,
    loginOut: PropTypes.func
}

export default connect(mapStateToProps)(AppHeader)
