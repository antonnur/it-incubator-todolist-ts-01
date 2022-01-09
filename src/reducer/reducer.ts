// Плейлист с 7-го JS_#07 2021-11-25
export const sum = (a: number, b: number) => a + b
export const mult = (a: number, b: number) => a * b
export const sub = (a: number, b: number) => a - b
export const div = (a: number, b: number) => a / b

//преобразуем все в одну функцию reducer
export type ActionType = {
  type: 'SUM' | 'MULT' | 'SUB' | 'DIV' | 'EXP'
  number: number
}

export const calculator = (state: number, action: ActionType) => {
  switch (action.type) {
    case "SUM":
      return state + action.number
    case "MULT":
      return state * action.number
    case "SUB":
      return state - action.number
    case "DIV":
      return state / action.number
    case "EXP":
      return state ** action.number
    default:
      return state
  }
}