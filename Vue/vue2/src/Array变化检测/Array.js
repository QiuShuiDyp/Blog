const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
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
  // Object.defineProperty需要具体的实例化
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      console.log(123, args);
      return original.apply(this, args);
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
});

let a = [1, 2, 3];
a.__proto__ = arrayMethods;
a.push(4);
