'use strict'
// Naive transpilation of https://gist.github.com/cloderic/d0cd131422fce9683286d8056a687b18 in nodejs

// Returns true if n is a prime number
function isPrime(n) {
  let x = 2

  while (x < n) {
    // Factor other then 1 or n, number is composite
    if (n % x === 0) return false

    x = x + 1
  }

  // Number is prime, while loop terminated without finding factor
  return true
}

function nextPrime(n) {
  let val = n + 1

  while (!isPrime(val)) val = val + 1

  return val
}

function getPrimeFactors(n) {
  const factors = []
  let prime = 1

  while (nextPrime(prime) <= n) {
    while (n % nextPrime(prime) === 0) {
      n = n / nextPrime(prime)
      factors.push(nextPrime(prime))
    }
    prime = nextPrime(prime)
  }

  return factors
}

module.exports.getPrimeFactors = getPrimeFactors
