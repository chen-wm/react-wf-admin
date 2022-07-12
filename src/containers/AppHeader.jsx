import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Layout, Avatar, Badge, Space, Row } from 'antd'
import { SettingFilled, MenuUnfoldOutlined, RocketFilled, GithubFilled } from '@ant-design/icons'
const { Header } = Layout

const AppHeader = props => {
    let { menuClick, avatar, menuToggle, loginOut } = props
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
        <Header className='header'>
            <div className='left'>
                {/*<Icon*/}
                {/*    style={{ fontSize: '2rem' }}*/}
                {/*    onClick={menuClick}*/}
                {/*    type={menuToggle ? 'menu-unfold' : 'menu-fold'}*/}
                {/*/>*/}
            </div>
            <div className='right'>
                <div className='mr15'>
                    <a rel='noopener noreferrer' href='https://github.com/chen-wm/react-wf-admin' target='_blank'>
                        <GithubFilled />
                    </a>
                </div>
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
        </Header>
    )
}

AppHeader.propTypes = {
    menuClick: PropTypes.func,
    avatar: PropTypes.string,
    menuToggle: PropTypes.bool,
    loginOut: PropTypes.func
}

export default React.memo(AppHeader)
