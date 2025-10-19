import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {
  return (
    <div className='p-10'>
      <Input title="UserName" required={true} />
      <Button>Add</Button>
    </div>
  )
}

export default Login