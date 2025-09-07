### 文章目标与读者

- **目标**: 对照讲解 UnoCSS 与 Tailwind CSS 的理念、用法、配置、生态与迁移，给出速查与实践建议。
- **读者**: 有 Tailwind 基础，计划评估或迁移至 UnoCSS 的前端工程师。

### 快速结论（TL;DR 对比）

| 维度         | UnoCSS                                         | Tailwind CSS                               |
| ------------ | ---------------------------------------------- | ------------------------------------------ |
| **核心理念** | 按需原子化引擎（工具集+预设）                  | 预定义原子类框架（设计体系）               |
| **类名来源** | 通过预设即时生成（可自定义规则）               | 官方内置公约（可扩展 via plugin）          |
| **生成策略** | Dev/Build 实时扫描并仅生成用到的样式           | 2.x Purge、3.x JIT 实时生成                |
| **可定制性** | 极高：自定义规则、变体、预设、Transformer      | 高：Theme、Plugin 体系完善                 |
| **生态形态** | 预设生态（preset-uno/wind/icons/attributify…） | 插件生态（forms/typography/aspect-ratio…） |
| **学习曲线** | Tailwind 语法基本“即会用”；进阶需理解预设/变体 | 类名语义一致、资料与社区更广               |
| **迁移成本** | 借助 `preset-wind` 兼容多数 Tailwind 类名      | 从零开始按官方方式使用                     |
| **适用场景** | 追求极致按需、灵活规则、轻量构建               | 追求稳定生态、团队共识与官方规范           |

### 一、基础认知与核心理念

- **Tailwind**: 提供一套稳定的原子类命名与主题系统；通过配置扩展，依赖官方与社区插件。
- **UnoCSS**: 是“原子化引擎”，通过不同预设提供语义与规则；零样式基线，按需即时产出。
- **对比要点**: UnoCSS 更像“可编程原子化平台”，Tailwind 像“标准化原子化框架”。

### 二、安装与配置对比

- **Tailwind**:
  - 安装：`tailwindcss postcss autoprefixer`
  - 配置：`tailwind.config.js`、`content` 指定扫描范围，`theme` 自定义令牌。
- **UnoCSS**:
  - 安装：结合构建工具插件（如 Vite 插件）与预设。
  - 配置：`unocss.config.ts`，选择 `preset-uno`/`preset-wind` 等，支持 `shortcuts`、`safelist`、`rules`、`variants`、`transformers`。
- **实践建议**: 评估项目构建链（Vite/Webpack）、是否需要 VSCode 智能提示与设计令牌对齐能力。

### 三、原子类来源与写法对比

- **命名兼容**:
  - Tailwind 类名在 UnoCSS 中可通过 `preset-wind` 基本兼容（如 `p-4`、`bg-red-500`）。
- **属性化写法（UnoCSS）**:
  - `preset-attributify` 支持在标签上以属性写原子类，如 `<div p-4 text-center />`。
- **快捷别名（UnoCSS）**:
  - `shortcuts`: 为常用组合类创建别名，如 `btn` 映射到 `px-4 py-2 rounded bg-primary text-white`。
- **变体/伪类**:
  - Tailwind: `hover:bg-…`、`md:flex`、`dark:text-…`。
  - UnoCSS: 相同写法，并支持变体分组 `hover:(bg-… text-…)`、`md:(px-4 py-2)`。
- **指令与分组**:
  - Tailwind: `@apply`/`@layer`。
  - UnoCSS: `transformer-directives` 提供相近能力（如 `@apply`、`theme()` 等）与 `transformer-variant-group`。

### 四、主题与设计令牌对比

- **Tailwind**: `theme` 配置是核心；颜色、间距、断点、阴影、字体等集中在 `tailwind.config.js`。
- **UnoCSS**: 各预设提供默认令牌；可在 `unocss.config.ts` 的 `theme` 扩展；与 `preset-wind` 命名接近 Tailwind。
- **对齐建议**: 统一色板、断点与间距刻度；将原 Tailwind `theme` 映射到 UnoCSS `theme`。

### 五、常用能力对照速查

- **布局与盒模型**: `container`、`box-border`、`block/inline`、`flex`、`grid`（两者名称基本一致）。
- **间距**: `p-*`、`m-*`、`space-x/y-*`（UnoCSS 同名；支持 `m-(x|y)` 组合写法）。
- **排版**: `text-*`、`font-*`、`leading-*`、`tracking-*`（基本一致）。
- **颜色**: `text-*`、`bg-*`、`border-*`、`from/to/via-*` 渐变（UnoCSS 支持同名与更多函数式写法）。
- **边框与圆角**: `border`、`border-*`、`rounded-*`（一致）。
- **阴影与滤镜**: `shadow-*`、`backdrop-*`、`filter`（一致，名称近似）。
- **尺寸与溢出**: `w-*`、`h-*`、`max-*`、`overflow-*`（一致）。
- **定位与层级**: `absolute/fixed/sticky`、`inset-*`、`z-*`（一致）。
- **变换与过渡**: `transform`、`scale/rotate/translate-*`、`transition-*`（一致）。
- **动画**: `animate-*`；UnoCSS 可自定义 `keyframes` 规则或用预设。
- **响应式**: 断点前缀 `sm/md/lg/xl/2xl`（`preset-wind` 同名）；UnoCSS 支持自定义与组合分组 `md:(flex gap-4)`。
- **暗色模式**: `dark:*` 前缀一致（支持 `class`/`media` 模式）。
- **状态/伪类**: `hover/focus/active/disabled` 前缀一致；UnoCSS 支持更多变体组合与逻辑变体。
- **容器查询**: Tailwind 提供插件；UnoCSS 有相关变体/社区方案，可自定规则。
- **RTL/重要性**: `rtl:`、`!` 前缀；UnoCSS 同样支持 `!text-red-500` 等优先级写法。

### 六、生态与插件（预设）

- **Tailwind 插件**: `typography`、`forms`、`aspect-ratio`、`line-clamp` 等。
- **UnoCSS 预设**:
  - `preset-uno`/`preset-mini`: 核心通用原子集合。
  - `preset-wind`: Tailwind 兼容风格（推荐迁移期启用）。
  - `preset-attributify`: 属性化语法支持。
  - `preset-icons`: 图标类（与 `icon-[...]` 结合）。
  - `preset-typography`/`preset-web-fonts` 等。
- **Transformer**:
  - `transformer-variant-group`、`transformer-directives`、`transformer-compile-class` 等。

### 七、开发体验与工具链

- **集成**: UnoCSS 与 Vite 深度集成，HMR 极快；Tailwind 亦与 Vite/Next.js 等良好适配。
- **编辑器**: Tailwind IntelliSense 成熟；UnoCSS 也有 VSCode 扩展（类名提示、颜色预览）。
- **扫描与 Safelist**: 两者都支持扫描路径与 safelist；UnoCSS 支持函数式类名时建议白名单策略。
- **调试**: UnoCSS 有 Inspector；Tailwind 可通过浏览器 DevTools 与类名直观定位。

### 八、产物与性能

- **产物大小**: 两者 JIT/按需后都很小；UnoCSS 天然零基线、仅生成使用到的规则。
- **构建速度**: UnoCSS 在大型项目中常更快（与预设复杂度相关）。
- **运行时依赖**: 均无运行时；UnoCSS 的按需策略更“细粒度”。

### 九、迁移指南（Tailwind → UnoCSS）

- **启用 `preset-wind`**: 最大限度复用原有类名与断点前缀。
- **迁移主题**: 将 `tailwind.config.js` 的 `theme` 色板/间距/断点迁移到 `unocss.config.ts` 的 `theme`。
- **替代插件**: 映射到 UnoCSS 预设（如 `typography`、`icons`）。
- **处理 `@apply`**: 使用 `transformer-directives` 或改为 `shortcuts`。
- **动态类名**: 审视模板中的动态拼接，补充 `safelist`。
- **验证差异**: 重点检查暗色模式、断点、字重/行高刻度、渐变与阴影细节。

### 十、最佳实践与模式

- **短名抽象**: 使用 `shortcuts` 封装设计体系组件级原子组合（如 `btn`、`card`）。
- **变体分组**: 倡导 `hover:(bg-primary text-white)`、`md:(grid grid-cols-3 gap-4)` 提升可读性。
- **令牌统一**: 将设计令牌收敛到 `theme`，避免项目散落自定义色值。
- **图标体系**: 使用 `preset-icons` 与 `icon-[mdi:...]`，统一图标来源。
- **类型与模板**: 在 TSX/JSX 中避免过度字符串拼接，必要时 `safelist`。

### 十一、常见坑位

- **类名动态化**: 运行期拼接导致未被扫描，需 `safelist` 或使用显式枚举。
- **指令顺序**: `transformer-*` 使用顺序影响结果，注意与 PostCSS/UnoCSS 插件链顺序。
- **预设差异**: `preset-uno` 与 `preset-wind` 某些刻度/命名不同，迁移期需逐页对照。
- **重置样式**: UnoCSS 默认不注入 reset，必要时自行添加（或使用预设/normalize）。
- **暗色模式策略**: `class` vs `media` 与历史实现不一致导致样式未生效。

### 十二、何时选择 UnoCSS / Tailwind

- **选择 UnoCSS**: 需要极致按需生成、灵活可编程规则、多框架复用、构建极限优化。
- **选择 Tailwind**: 团队现有规范成熟、依赖生态插件多、希望遵循“约定优于配置”。

### 附录：对照速查示例

- **等价类示例**:
  - `p-4`、`px-6`、`text-center`、`flex`、`items-center`、`justify-between`（两者一致）。
  - 暗色模式：`dark:bg-slate-900`（一致）。
  - 变体分组（UnoCSS）：`hover:(bg-primary text-white)`；Tailwind 需重复前缀。
  - 快捷别名（UnoCSS）：`btn` → `px-4 py-2 rounded bg-primary text-white`。

### 参考资料

- [UnoCSS 官方文档](https://unocss.dev)
- [UnoCSS Presets](https://unocss.dev/presets)
- [UnoCSS Transformers](https://unocss.dev/transformers)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
