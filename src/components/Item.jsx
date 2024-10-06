import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const Item = ({item, refreshStudent, setRefreshStudent, refreshTeachers, setRefreshTeachers}) => {
  
  function handleUserDelete(user){
    if(user.job){
      fetch(`http://localhost:3000/teachers/${user.id}`, {
        method: "DELETE"
      }).then(res => {
        setRefreshTeachers(!refreshTeachers)
        
      })
    }
    else{
      fetch(`http://localhost:3000/students/${user.id}`, {
        method: "DELETE"
      }).then(res => {
        setRefreshStudent(!refreshStudent)
        
      })
    }
  }
  return (
    <Card
    style={{
      width: 300,
    }}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <DeleteOutlined onClick={() => handleUserDelete(item)}  key="edit" />
    ]}
    >
    <Meta
    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
    title={`${item.name} - ${item.surname}`}
    description={item?.study ? item.study : item.job}
    />
    </Card>
  )
}
export default Item;