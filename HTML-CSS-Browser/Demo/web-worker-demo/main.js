const worker = new Worker('./generate.js')
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value
  // const primes = generatePrimes(quota)
  worker.postMessage({
    command: 'gen',
    value: quota,
  })
})

worker.addEventListener('message', msg => {
  const { primes } = msg.data
  console.log('🚀 ~ msg.data:', msg.data)
  console.log('🚀 ~ primes:', primes)
  document.querySelector('#output').textContent = `Finished generating ${primes.length} primes!`
})

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value =
    'Try typing in here immediately after pressing "Generate primes"'
  document.location.reload()
})
