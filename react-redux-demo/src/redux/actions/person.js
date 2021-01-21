import {PersonConstants} from '../constans'

export const addPerson = person => ({type: PersonConstants.ADD, data: person})