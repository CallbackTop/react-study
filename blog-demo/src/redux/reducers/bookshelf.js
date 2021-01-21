import {BookShelfActionType} from '../constants'

const initState = [
  {id: '001', title: 'React 从入门到入土', auther: '子都'}
]

export default function bookshelfReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case BookShelfActionType.ADD:
      return [data, ...prevState]
    default:
      return prevState
  }
}