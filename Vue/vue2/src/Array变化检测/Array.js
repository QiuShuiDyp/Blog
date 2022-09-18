/**
 * 数组拦截器
 */
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
import Observer from "./Observer";
import { def } from "../common/utils";
//遍历方法
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "sort",
  "reverse",
  "splice",
];
methods.forEach((method) => {
  // 缓存原始方法
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    let inserted;
    // 新增元素也增加响应式监听
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case splice:
        inserted = args.slice(2);
        break;
    }
    const ob = this.__ob__;
    if (inserted) ob.observeArray(inserted);
    // 向依赖发送消息
    ob.dep.notify();
    return original.apply(this, args);
  });
});

// let a = [1, 2, 3];
// a.__proto__ = arrayMethods;
// a.push(4);
