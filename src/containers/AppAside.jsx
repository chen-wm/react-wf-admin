import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import CustomMenu from '@/components/CustomMenu'
import { GithubFilled } from '@ant-design/icons'

const { Sider } = Layout

const AppAside = props => {
    let { menuToggle, menu } = props
    return (
        <Sider className='aside' collapsed={menuToggle}>
            <div className='logo'>
                <a rel='noopener noreferrer' href='https://github.com/chen-wm/react-wf-admin' target='_blank'>
                    <GithubFilled style={{ fontSize: '3.8rem', color: '#fff' }} />
                </a>
            </div>
            <CustomMenu menu={menu}></CustomMenu>
        </Sider>
    )
}

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
}

export default AppAside
