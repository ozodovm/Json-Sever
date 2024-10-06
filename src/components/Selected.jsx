import { Select } from 'antd'
import React from 'react'

function Selected({setStatusUsers, statusUsers}) {
  return (
    <div>
        <Select
            value={statusUsers}
            className='w-full'
            size='large'
            allowClear
            showSearch
            onChange={(e) => setStatusUsers(e)}
            placeholder="Select a person"
            optionFilterProp="label"
            options={[
            {
                value: '1',
                label: 'Students',
            },
            {
                value: '2',
                label: 'Teachers',
            },
            
            ]}
        />
    </div>
  )
}

export default Selected
