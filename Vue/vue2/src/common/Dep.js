// 依赖收集，包含依赖的新增、删除通知依赖

const uid = 0;
export default class Dep {
  constructor() {
    this.subs = [];
    this.id = uid++;
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      return this.subs.splice(index, 1);
    }
  }

  // 收集依赖,同时让watch也收益当前的Dep实例
  depend() {
    if (window.target) {
      window.target.addDep(this);
    }
  }

  notify() {
    this.subs.forEach((item) => {
      item.update();
    });
  }
}
