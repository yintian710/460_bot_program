export function delay(milSec) {

  return new Promise(resolve => {

    setTimeout(resolve, milSec*1000)

  })

}