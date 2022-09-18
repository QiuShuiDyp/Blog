// delete删除某个对象的属性是无用的，因此Vue单独提供了一个$delete方法，目标对象不能是Vue.js实例或Vue.js实例的根数据对象
import { isValidArrayIndex, hasOwn } from "../common/utils";
export function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  const ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" &&
      warn(
        "Avoid adding reactive properties to a Vue instance or its root $data " +
          "at runtime - declare it upfront in the data option."
      );
    return val;
  }
  // 如果key不是target的自身属性，则终止程序继续执行
  if (hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) return;
  ob.dep.notify();
}
