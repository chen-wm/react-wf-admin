import React from 'react'
import { Layout, Divider } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import {getUserList} from '@/api/list'


const User = () => {
  const loadData = ()=>{
    getUserList().then(res=>{
      if(res.code===0){

      }
    }).catch(e=>{
      console.log(e)
    })
  }

  return (<Layout>
        <div>
          <CustomBreadcrumb arr={['用户管理']}></CustomBreadcrumb>
        </div>
        <div className='base-style'>
          123
        </div>
      </Layout>)
}
export default User
