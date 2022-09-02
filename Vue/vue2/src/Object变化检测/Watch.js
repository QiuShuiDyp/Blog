// 数据监听
import { parsePath } from "./utils";
// 1.通知更新 2.绑定到dep中
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    //getter函数初始化，作用为获取指定路径的值
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    //构造函数调用一次get，将当前的watch实例增加到dep中
    this.value = this.get();
  }
  get() {
    window.target = this;
    //get的过程中，将当前的挂载到window.target上的watch实例添加到dep数组中
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }
  //更新
  update() {
    const oldVal = this.value;
    // 获取最新的值
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldVal);
  }
}
