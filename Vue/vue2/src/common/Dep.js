// 依赖收集，包含依赖的新增、删除通知依赖

export default class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove(this.subs, sub);
  }
  // 收集依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }
  notify() {
    this.subs.forEach((item) => {
      item.update();
    });
  }
}

function remove(arr, item) {
  if (arr.length > 0) {
    let index = arr.indexOf(item);
    if (index !== -1) return arr.splice(index, 1);
  }
}
