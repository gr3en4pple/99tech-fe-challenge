const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./solution')

const positiveIntegerInputs = [1, 2, 3, 10, 25, 100, 1000]
const negative_0_NaN_Inputs = [-1001, 0, 'aaa', '123']
const floatingPointInputs = [-1001.15, 1.12, 55.1123]

describe('3 ways to sum_to_n', () => {
  test('positive integer inputs match the (n * (n + 1)) / 2 formula and cross-check', () => {
    for (const n of positiveIntegerInputs) {
      const expected = (n * (n + 1)) / 2
      const a = sum_to_n_a(n)
      const b = sum_to_n_b(n)
      const c = sum_to_n_c(n)
      expect(a).toBe(expected)
      expect(b).toBe(expected)
      expect(c).toBe(expected)
      expect(b).toBe(a)
      expect(c).toBe(b)
    }
  })

  test('negative, 0 and NaN inputs will return 0', () => {
    for (const n of negative_0_NaN_Inputs) {
      const expected = 0
      expect(sum_to_n_a(n)).toBe(expected)
      expect(sum_to_n_b(n)).toBe(expected)
      expect(sum_to_n_c(n)).toBe(expected)
    }
  })

  test('floating point input return the input', () => {
    for (const n of floatingPointInputs) {
      let expected = n
      if (n < 0) expected = 0
      expect(sum_to_n_a(n)).toBe(expected)
      expect(sum_to_n_b(n)).toBe(expected)
      expect(sum_to_n_c(n)).toBe(expected)
    }
  })
})
