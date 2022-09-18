//正则，匹配对应路径名,获取路径对应的值,返回一个闭包函数，包含路径的分割数组
const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(",");
  return function (obj) {
    segments.forEach((element) => {
      if (!obj) return;
      obj = obj[element];
    });
    return obj;
  };
}

export function isObject(val) {
  return typeof val === "object";
}

export function def(target, key, value) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

const seenObjects = new Set();

export function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  let i, keys;
  const isA = Array.isArray(val);
  // 递归终止条件，非数组，非对象
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) return;

  if (val.__ob__) {
    const depsId = val.__ob__.dep.id;
    if (seen.has(depsId)) {
      return;
    } else {
      seen.add(depsId);
    }
  }
  if (isA) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    Object.keys(val).forEach((key) => {
      _traverse(val[(key, seen)]);
    });
  }
}

export function isValidArrayIndex(index) {
  return typeof index === "number";
}

const getOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return getOwnProperty.call(obj, key);
}
