import {CalculatorActionType} from '../constants'

export const increase = data => ({type: CalculatorActionType.INCREASE, data})
export const decrease = data => ({type: CalculatorActionType.DECREASE, data})