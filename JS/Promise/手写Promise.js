class MyPromise {
  static PENDING = "待定"
  static FULFILLED = "成功"
  static REJECTED = "失败"
  constructor(func) {
    this.status = MyPromise.PENDING
    this.result = undefined
    this.resolveCallBack = []
    this.rejectCallback = []
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }
  // 1.判断状态，如果状态已修改，则放弃，否则修改状态为成功
  resolve(result) {
    // setTimeout是为了保证then的执行是异步的
    setTimeout(() => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.FULFILLED
      this.result = result
      this.resolveCallBack.forEach((callback) => callback())
    })
  }
  // 2.判断状态，如果状态已修改，则放弃，否则修改状态为失败
  reject(result) {
    // setTimeout是为了保证then的执行是异步的
    setTimeout(() => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.REJECTED
      this.result = result
      this.rejectCallback.forEach((callback) => callback())
    })
  }
  // 1.入参可以为空
  // 2.根据状态调用不同的方法
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {}
      onRejected = typeof onRejected === "function" ? onRejected : () => {}
      // 根据处理结果调用不同的回调
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.result)
        }, 0)
      } else if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          onRejected(this.result)
        }, 0)
        // pending状态(执行函数存在异步状态)，先收集回调函数
      } else {
        this.rejectCallback.push(onFulfilled)
        this.resolveCallBack.push(onRejected)
      }
    })
  }
}

let p = new MyPromise((resolve, reject) => {
  let random = Math.random()
  if (random > 0.5) {
    resolve("解决")
  } else {
    reject("失败")
  }
})

p.then(
  (e) => {
    console.log(e)
  },
  (e) => {
    console.log(e)
  }
)
