import Vue from "vue";
import Watcher from "../common/Watcher";
import { traverse } from "../common/utils";
/**
 *
 * @param {函数或者x.x.x格式的路径} expOrFn
 * @param {callback} cb
 * @param {watch配置项} options
 */
export const myWatch = function (expOrFn, cb, options) {
  const vm = this;
  const watcher = new Watcher(vm, expOrFn, cb);
  // 立即执行
  if (options.immediate) {
    cb.call(vm, watcher.value);
  }
  // 深层次收集依赖
  if (options.deep) {
    traverse(value);
  }
  return function unwatchFn() {
    watcher.teardown();
  };
};
Vue.prototype.$myWatch = myWatch;
