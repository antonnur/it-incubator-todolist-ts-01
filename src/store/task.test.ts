import {
  getBanknoteList,
  getSum1,
  getSum2,
  getSum3,
  getTriangleType,
  isEvenIndexSumGreater1,
  isEvenIndexSumGreater2,
  isEvenIndexSumGreater3, isEvenIndexSumGreater4,
  isSquareGreater,
  sum
} from "./task";

// 1.
test ("get sum", () => {
    expect(sum(3, 5, 7, 6, 4, 9)).toBe(34)
    expect(sum(1, 1, 1, 6)).toBe(9)
})

// 2.
test('get Triangle Type', () => {
  expect(getTriangleType(1, 1, 1)).toBe('10')
  expect(getTriangleType(2, 3, 3)).toBe('01')
  expect(getTriangleType(4, 5, 3)).toBe('11')
  expect(getTriangleType(10, 2, 2)).toBe('00')
})

// 3.
test('get Sum numbers', () => {
  expect(getSum1(1000)).toBe(1)
  expect(getSum1(0)).toBe(0)
  expect(getSum2(1234)).toBe(10)
  expect(getSum3(1000)).toBe(1)
})

// 4.
test('is Even Sum Greater',() => {
  expect(isEvenIndexSumGreater1([1, 100, 2, 200])).toBe(false)
  expect(isEvenIndexSumGreater2([100, 1, 200, 2])).toBe(true)
  expect(isEvenIndexSumGreater3([100, 1, 200, 2, 300, 4])).toBe(true)
  expect(isEvenIndexSumGreater4([100, 1, 200, 2, 4])).toBe(true)
})

// 5.
test('is Square Greater Than Circle',() => {
  const sCr = 3.14
  const sSq = 4
  const result = isSquareGreater(sCr, sSq)
  expect(result).toBe(true)
})

// 6.
test('get banknote list',() => {
//проверять длину result и их сумму
  const result2500 = getBanknoteList(2500)
  const result23 = getBanknoteList(23)
  const result2 = getBanknoteList(2)

  expect(result2500[0]).toBe(1000)
  expect(result23[2]).toBe(1)
  expect(result2[0]).toBe(2)

  console.log(result2500);
  console.log(result23);
  console.log(result2);
})