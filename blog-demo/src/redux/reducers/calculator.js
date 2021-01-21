import {CalculatorActionType} from '../constants'

const initState = 0

export default function calculatorReducer(prevState = initState, action) {
  const {type, data} = action
  switch (type) {
    case CalculatorActionType.INCREASE:
      return prevState + data
    case CalculatorActionType.DECREASE:
      return prevState - data
    default:
      return prevState
  }
}