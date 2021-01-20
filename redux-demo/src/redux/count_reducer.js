import {INCREASE, DECREASE} from './constans'

const initState = 0

export default function countReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case INCREASE:
      return prevState + data
    case DECREASE:
      return prevState - data
    default:
      return prevState
  }
}