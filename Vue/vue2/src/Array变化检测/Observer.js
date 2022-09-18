// 声明一个监听类，将所有object的属性进行监听
import Dep from "../common/Dep";
import { isObject, def } from "../common/utils";
import { arrayMethods } from "./Array";

const hasPhoto = "__proto__" in {};
// 获取声明的对应的方法名
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// 浏览器支持proto
function protoAugment(value, arrayMethods, arrayKeys) {
  value.__proto__ = arrayMethods;
}

// 浏览器不支持__proto__
function copyAugment(value, arrayMethods, arrayKeys) {
  arrayKeys.forEach((key) => {
    value[key] = arrayMethods[key];
  });
}

export class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, "__ob__", this); //将value和observer通过__ob__绑定，从而实现value可以访问到自己的observer实例，借此拿到对应的dep
    if (!Array.isArray(value)) {
      this.walk(value);
    } else {
      this.observeArray(value);
      // 根据浏览器是否支持__proto__，来采取不同的方式给数组实例添加拦截器
      const augment = hasPhoto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    }
    // dep挂到Observer中是为了保证拦截器和get中都能访问的到
  }

  observeArray(items) {
    for (let i = 0, l = item.length; i < l; i++) {
      observe(items[i]);
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
    // 如果val为对象，则需要为其额外声明对应的observe
    let childOb = observe(val);
    // 这个dep是为了收集obj对应属性key的依赖,如果obj[key]为对象，则需要收集两份，一份是访问obj[key]的依赖，一份是obj[key]中子属性的依赖监听
    let dep = new Dep();
    // defineProperty方法会新增或修改现有属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        dep.depend();
        // 处理数组的依赖获取，修改数组值的时候，从__ob__中访问dep，然后通知依赖更新
        if (childOb) {
          childOb.dep.depend();
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

// 为value创建一个Observer实例，如果创建成功，直接返回新创建的Observer实例，如果value已存在对应的Observer实例，则直接返回
function observe(val) {
  if (!isObject(value)) {
    return;
  }
  let ob;
  // __ob__代表该值是否为响应式数据，__ob__指向的是对应的observer实例
  if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

export function defineReaction(obj, key, val) {
  // 如果val为对象，则需要为其额外声明对应的observe
  let childOb = observe(val);
  // 这个dep是为了收集obj对应属性key的依赖,如果obj[key]为对象，则需要收集两份，一份是访问obj[key]的依赖，一份是obj[key]中子属性的依赖监听
  let dep = new Dep();
  // defineProperty方法会新增或修改现有属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      // 处理数组的依赖获取，修改数组值的时候，从__ob__中访问dep，然后通知依赖更新
      if (childOb) {
        childOb.dep.depend();
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
