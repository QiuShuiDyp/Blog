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
