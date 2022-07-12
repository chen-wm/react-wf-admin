import React, { Component } from 'react'
import { Layout, Row, Col, Divider } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

import BarEcharts from './bar.jsx'
import PieEcharts from './pie.jsx'
import LineEcharts from './line.jsx'
import ScatterEcharts from './scatter.jsx'
import PictorialBarEcharts from './pictorialBar.jsx'
import { WechatFilled, QqCircleFilled, WeiboCircleFilled, AppleFilled } from '@ant-design/icons'

class Index extends Component {
    fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    render() {
        return (
            <Layout className='index animated fadeIn'>
                <Row gutter={24} className='index-header'>
                    <Col span={6}>
                        <div className='base-style wechat'>
                            <WechatFilled className='icon-style' />
                            {/*<Icon type='wechat' className='icon-style' />*/}
                            <div>
                                <span>999</span>
                                <div>微信</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style qq'>
                            <QqCircleFilled className='icon-style' />
                            {/*<Icon type='qq' className='icon-style' />*/}
                            <div>
                                <span>366</span>
                                <div>QQ</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style dingding'>
                            <AppleFilled className='icon-style' />
                            {/*<Icon type='dingding' className='icon-style' />*/}
                            <div>
                                <span>666</span>
                                <div>Apple</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style weibo'>
                            <WeiboCircleFilled className='icon-style' />
                            {/*<Icon type='weibo' className='icon-style' />*/}
                            <div>
                                <span>689</span>
                                <div>微博</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className='base-style'>
                            <div className='bar-header'>
                                <div>图形全屏展示</div>
                                {/*<Icon type='fullscreen' style={{ cursor: 'pointer' }} onClick={this.fullToggle} />*/}
                            </div>
                            <Divider />
                            <BarEcharts />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <div className='base-style'>
                            <LineEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PieEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <ScatterEcharts />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='base-style'>
                            <PictorialBarEcharts />
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Index
