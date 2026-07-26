function generatePrimes(quota) {
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false
      }
    }
    return true
  }

  const primes = []
  const maximum = 1000000

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1))
    if (isPrime(candidate)) {
      primes.push(candidate)
    }
  }

  return primes
}

self.addEventListener('message', msg => {
  console.log('🚀 ~ msg:', msg)
  const { command, value } = msg.data
  if (command === 'gen') {
    const primes = generatePrimes(value)
    postMessage({ primes })
  }
})
