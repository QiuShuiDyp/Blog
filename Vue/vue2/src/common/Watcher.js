// 数据监听
import { parsePath } from "./utils";
/**
 * 1.通知更新
 * 2.绑定到dep中
 * 3.
 *  */
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    // deps用于知道哪些Dep收集了自己这个watch实例
    this.deps = [];
    // depIds为了避免Dep的重复收集
    this.depIds = new Set();
    // expOrFn支持函数，watch可以监听计算属性
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }

    // options配置检查
    if (options) {
      // 使用!!可以解决deep为undefine的问题
      this.deep = !!options.deep;
    } else {
      this.deep = false;
    }

    this.cb = cb;
    //构造函数调用一次get，将当前的watch实例增加到dep中
    this.value = this.get();
  }
  get() {
    window.target = this;
    //触发get方法，get的过程中，将当前的挂载到window.target上的watch实例添加到dep数组中
    let value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
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
  //添加依赖
  addDep(dep) {
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  teardown() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
  }
}
