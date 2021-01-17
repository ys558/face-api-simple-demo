// demo 1:
const countDown = n => {
  for (let i = n; i > 0; i-- ) {
    console.log(i)
  }
  console.log('hehe')
}

const countDownRecursive = n => {
  if ( n <= 0 ) {
    console.log('recursive complete')
    return
  }
  console.log(n)
  countDownRecursive( n-1 )
}

countDownRecursive(4)

// demo 2:
const sumRange = n => {
  let total = 0;
  for (let i= n; i>0; i --) total += i
  return total
}

const sumRangeRecursive = (n, total = 0 ) => {
  if (n <= 0) return total
  return sumRangeRecursive(n-1, total+n)
}

console.log(sumRangeRecursive(5))