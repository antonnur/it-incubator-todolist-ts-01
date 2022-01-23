// 1. Функиця sum принимает параметром целые положительные числа
// (неопределенное кол-во) и возвращает их сумму (rest)

export function sum(...nums: Array<any>): number {
  return nums.reduce((acc, el) => acc + el)    //reduce повторить!
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника
// Функция должна возвращать:
// - "10", если треугольник равносторонний,
// - "01", если треугольник равнобедренный,
// - "11", если треугольник обычный,
// - "00", если такого треугольника не сущесвтует.

export function getTriangleType(a: number, b: number, c: number): string {
  if (a + b >= c && b + c >= a && a + c >= b) {
    if (a === b && c === b) {
      return "10"
    } else if (a === b || a === c || c === b) {
      return "01"
    } else {
      return "11"
    }
  } else {
    return "00"
  }
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum1(number: number): number {
  let sum = 0
  let string = String(number)
  for (let i = 0; i < string.length; i++)
    sum += Number(string[i])
  return sum
}

export function getSum2(number: number): number {
  let array = number.toString().split('').map(Number)
  return array.reduce((acc, el) => acc + el)
}

export function getSum3(number: number): number {
  return String(number).split('').map((n) => Number(n)).reduce((acc, el) => acc + el)
}

// 4. Функция isEvenIndexSumGreater принимает параметром массив чисел.
// Если сумма чисел с четными индексами!!! (0 как четкий индеск) больше
// суммы чисел с нечетным индексами!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater1 = (arr: Array<number>): boolean => {
  let ch = 0
  for (let i = 0; i < arr.length; i = i + 2) {
    ch = ch + arr[i]
  }
  let nch = 0
  for (let i = 1; i < arr.length; i = i + 2) {
    nch = nch + arr[i]
  }
  return ch > nch
}

export const isEvenIndexSumGreater2 = (arr2: Array<number>): boolean => {
  let even = arr2.reduce((acc, el, i) =>
    i % 2 === 0 ? acc + el : acc, 0)
  let notEven = arr2.reduce((acc, el, i) =>
    i % 2 !== 0 ? acc + el : acc, 0)

  return even > notEven
}

export const isEvenIndexSumGreater3 = (arr3: Array<number>): boolean => {
  let sumEven = 0, sumOdd = 0
  arr3.forEach((arr3, i) => {
    if (i % 2 === 0) {
      sumEven = sumEven + arr3
    } else {
      sumOdd = sumOdd + arr3
    }
  })
  return sumEven > sumOdd
}

export const isEvenIndexSumGreater4 = (arr4: Array<number>): boolean => {
  let sumEven = 0, sumOdd = 0
  for (let i = 0; i < arr4.length; i++) {
    if (i % 2 === 0) {
      sumEven = sumEven + arr4[i]
    } else {
      sumOdd = sumOdd + arr4[i]
    }
  }
  return sumEven > sumOdd
}

// 5. Функция isSquareGreater принимает два параметра: площадь круга и площадь
// квадрата. Функция должна возвращать true если круг не будет выступать за
// пределы квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
  const cD = Math.sqrt((areaCr / Math.PI) * 4)    // диаметр круга
  const sS = areaSq / 2    // сторона квадрата

  return sS >= cD

  // areaCr / areaSq <= Math.PI / 4   // короткая запись
}

// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми выдать эту сумму.
// Доступны банкноты следующих нминалов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
  const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
  let arr:number[] = []

  if (amountOfMoney > 0){
    for (let i = 0; i < banknotes.length; i++ ){
      while (amountOfMoney - banknotes[i] >= 0){
        amountOfMoney = amountOfMoney - banknotes[i]
        arr = [...arr, banknotes[i]]
      }
    }
  }
  return arr
}