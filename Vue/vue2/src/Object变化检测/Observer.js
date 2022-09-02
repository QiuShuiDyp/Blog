// 声明一个监听类，将所有object的属性进行监听
import Dep from "./Dep";
class Observer {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }

  // 遍历
  walk(obj) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      this.defineReaction(obj, key, obj[key]);
    });
  }

  defineReaction(obj, key, val) {
    if (typeof val === "object") {
      new Observer(val);
    }
    let dep = new Dep();
    // defineProperty方法会新增或修改现有属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (window.target) {
          dep.depend(window.target);
        }
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      },
    });
  }
}
