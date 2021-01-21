import {PersonConstants} from '../constans'

const initState = []

export default function personReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case PersonConstants.ADD:
      return [data, ...prevState]
    default:
      return prevState
  }
}