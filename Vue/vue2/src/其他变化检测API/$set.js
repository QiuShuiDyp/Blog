// $set的作用是为了解决Vue中需要手动添加数据响应式的问题，但是target不能是Vue.js实例或者Vue.js实例的根数据对象
import { defineReaction } from "../Array变化检测/Observer";
export function set(target, key, val) {
  //   判断target是否为数组，数组的修改数据的逻辑要走封装的数组拦截器方法splice
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(key, target.length);
    target.splice(key, 1, val);
    return val;
  }
  // 如果key是target本来的就有的属性,则直接赋值即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = target.__ob__;
  if (target._isVal || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" &&
      warn(
        "Avoid adding reactive properties to a Vue instance or its root $data " +
          "at runtime - declare it upfront in the data option."
      );
    return val;
  }
  // 如果target非响应式数据，则val直接赋值，即set的前提是target为响应式数据
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 设置get/set
  defineReaction(ob.value, key, val);
  ob.dep.notify();
  return val;
}

function isValidArrayIndex(index) {
  return typeof index === "number";
}
