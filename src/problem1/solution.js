// (a) Using formula: n*(n+1)/2. O(1).
var sum_to_n_a = function (n) {
  if (n <= 0 || !Number.isFinite(n) || isNaN(n)) return 0
  if (!Number.isInteger(n)) return n

  return (n * (n + 1)) / 2
}

// (b) Using symmetric pairs in case you forgot the formula from (a). O(n/2)
var sum_to_n_b = function (n) {
  if (n <= 0 || !Number.isFinite(n) || isNaN(n)) return 0
  if (!Number.isInteger(n)) return n
  let start = 1,
    end = n,
    result = 0

  while (start < end) {
    result += start + end
    start++
    end--
  }
  // odd n case
  if (start === end) result += start
  return result
}

// (c) Using the for loop. O(n)
var sum_to_n_c = function (n) {
  if (n <= 0 || !Number.isFinite(n) || isNaN(n)) return 0
  if (!Number.isInteger(n)) return n
  let result = n
  for (let i = 1; i < n; i++) {
    result += i
  }
  return result
}

module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c }
