import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slices/countSlice';

export default function App() {
  const dispatcher = useDispatch()
  const count = useSelector((state) => state.count.value);
  const admin = useSelector((state) => state.admin.data);
  console.log(admin)

  return (
    <div className='box'>
      <button onClick={() => dispatcher(increment())}>+</button>
      <h1>{count}</h1>
      <button onClick={() => dispatcher(decrement())}>-</button>
    </div>
  )
}
