# Cirrus（卷云）— HarmonyOS NEXT 天气应用 · 工程脚手架

> 参考 Breezy Weather / Geometric Weather ｜ 平台 HarmonyOS NEXT（**API 26**，用户指定最新稳定版）
> 架构：Stage 模型 + ArkUI 声明式 ｜ 设备：手机 / 平板 / 折叠屏 / PC / TV / 手表
> 当前版本：**V1.3.2**（versionCode `10302`）｜ 变更记录见 **[CHANGELOG.md](./CHANGELOG.md)**

本目录包含**规划文档**（`docs/`）与**可打开的工程脚手架**（根目录 + `common` / `data` / `entry` / `watch` 模块）。

## 模块划分

| 模块 | 类型 | 说明 |
|------|------|------|
| `common` | HAR | 归一模型、WMO 代码多语映射、日志/时间/单位工具、可复用玻璃卡片组件 |
| `data` | HAR | 多源可插拔（`WeatherSource`）、Open-Meteo 实现、和风源（用户自带 Key，配 Key 后可选）、仓库、缓存、定位、后台调度 |
| `entry` | HAP | 手机/平板/折叠/PC/TV 入口：EntryAbility、响应式主页（断点主从/Tabs）、各功能页、天气卡片 FormAbility |
| `watch` | HAP | 手表轻量入口：WatchAbility + 极简主页 |

## 已落地的架构要点（对齐 docs/ 规划）

- **多源可插拔**：`data/sources/WeatherSource.ts` 定义契约；`OpenMeteoSource` 默认免密钥；`QWeatherSource` 采用**用户自带 Key**——已注册进 `sources/registry.ts`，运行时按 `isAvailable()` 过滤，设置页填入自己的和风 Key 并经接口校验通过后该源才出现在「数据源」列表；Key 仅存本机且不跨设备同步，合规边界见 `docs/09-隐私与权限合规.md §3`。
- **归一模型**：`common/models/WeatherData.ts` 是唯一 UI 消费对象；各源实现 `toNormalized`。位置主标题 `locationTitle()` 已修正「上海 / 上海市」互为包含时的拼接问题（V1.3.2）。
- **WMO 全量映射 + 7 语种**：`common/models/WmoCode.ts`（28 条代码 × 7 语）。和风 `icon→WMO` 对照见 `sources/QWeatherCodes.ts`（待补全）。
- **多设备**：`entry/pages/Index.ets` 按 `(width >= 840vp)` 断点在 Tabs（手机）与主从（大屏）间切换；手表独立模块。
  - 底部导航已精简为「**天气 / 设置**」两个页签（HDS 悬浮胶囊）；位置管理、预警、「数据与隐私」均为设置内 **二级页**，入口元素通过 `geometryTransition` 共享元素实现「一镜到底」连续转场。
- **i18n**：`entry/resources` 含 `base` + 7 语种 `string.json`（zh-CN / en-US / fr-FR / ja-JP / ko-KR / es-ES / de-DE）；UI 字符串全部 `$r()` 引用，天气状况文案走 `WmoCode.ts`。语言切换**即时生效**（注入 `langEpoch` 重建 UI 树，无需重启）。
- **本地持久化全链路打通**：天气快照与位置走 **RDB**（`data/local/RdbStore.ets`，基于 `@kit.ArkData` 的 `relationalStore`，S1 安全级）；设置走 `Preferences`（`settingsStore`）；位置与设置通过 `distributedKVStore` **跨设备同步**（和风 Key 除外）。首次启动以 Shanghai 为 SEED 填充并持久化，可管理、可设默认、跨启动保留。
- **设计语言体系化（V1.3.x）**：新增 `common/ui/DesignTokens.ets`（`Tokens`），间距 / 圆角 / 字号 / 临界阻尼弹簧统一取值，界面分层由「字号 + 字重 + 行高」成组表达，深色下为低明度半透明避免浅叠浅；完整方法论见 `docs/13-美学设计语言.md`。
- **状态栏联动（V1.3.0）**：`entry/system/SystemBar.ets` 统一控制器，应用沉浸式全屏，状态栏 / 导航栏图标色随当前页面背景明暗实时切换（`setTone(dark)`，由 EntryAbility 绑定窗口、二级页 `onShown/onHidden` 调用）。
- **深色模式 / 夜间天气（V1.3.0）**：卡片、文字、图标、结构面全部主题感知；二级页标题栏经 `HdsNavDestination.originalStyle` 显式给出背景 / 标题 / 返回图标主题色，深色下不再白底白字（V1.3.1 硬化）。
- **设置页层级（V1.3.0）**：分组卡片（外观 / 数据源 / 语言 / 更多）+ 分隔线 + 箭头 + 当前值色阶，选项位置与可点击区域一目了然。
- **位置搜索清洗排序（V1.3.2）**：`AppStore.rankAndClean` 替代旧子串过滤——城市级命中优先、按「名称精确 / 城市精确 / 前缀 / 包含」打分、结合人口降序、按「标题+城市」去重并截断前 10，彻底剔除「绍兴市上海」等同名异地候选；Open-Meteo 地理编码已补 `population` / `feature_code` 权重。
- **状态/红线**：统一 `Log` 封装（禁裸 console/hilog）；类型标注无 `any/unknown`；`@Component` 方法替代 getter；状态管理统一 V2（`@ObservedV2/@Trace`、`AppStorageV2/PersistenceV2`）。

## 鸿蒙新特性与沉浸光感（规划重点）

> 完整结论见 [`docs/11-鸿蒙新特性与沉浸光感适配.md`](docs/11-鸿蒙新特性与沉浸光感适配.md)。

- **沉浸光感 / 空间化**：以 HarmonyOS **UI Design Kit（`@kit.UIDesignKit`）+ 沉浸光感**为第一眼视觉基石——`HdsNavigation`/`HdsTabs` 悬浮胶囊导航、`systemMaterialEffect` 材质、`dynamicHideTitleBar` 标题栏渐变模糊、智感握姿；替代自研 `blur` 卡片。启用前提 `targetAPIVersion ≥ 26.0.0`（本项目即 26）。
- **能力探测降级**：`deviceInfo.apiAvailable('26.0.0') && hdsMaterial.getSystemMaterialTypes().length > 0` 不满足时回退普通半透明卡片（沉浸光感材质仅 Phone/Tablet，且 UI Design Kit 仅中国境内）。
- **状态管理 V2**：新代码统一 `@ComponentV2` + `@Local/@Param/@Event/@ObservedV2/@Trace/@Monitor/@Computed` + `AppStorageV2/PersistenceV2`（现存 `Index.ets` 等为 V1，逐步迁移）。
- **ArkUI 新特性**：数字翻牌（温度刷新）、`Text.shaderStyle` 渐变文本、`SymbolGlyph` 动效、`focusWrapMode`（TV 走焦）、`uiAppearance`（深浅色/字体缩放）。
- **一多部署**：对齐官方三层工程（common/features/products）；手机·平板·PC·TV=部署模型 A，手表=部署模型 B。
- **明确不适用**：**实况窗（Live View Kit）** 不属于天气场景、**意图框架（Intents Kit）** 仅企业开发者且仅中国境内——均不纳入主流程（见 doc 11 §6.4/§6.5）。
- **权限修正**：天气周期刷新用**延迟任务**（WorkScheduler），**无需** `ohos.permission.KEEP_BACKGROUND_RUNNING`（该权限属长时任务）。

## 图标素材来源（第三方 · MIT）

天气图标来自 **erikflowers/weather-icons**（<https://erikflowers.github.io/weather-icons>），采用 **MIT License**，在项目中免费使用、修改与分发。

- 资源已合并至 `common/src/main/resources/base/media/`，共 **36 个 SVG**（文件名 `wx_<wmo基础键>_<day|night>`），与 `common/models/WmoCode.ts` 中 `wmoIconKey(code, isDay)` 的输出**一一对应**（如 `wx_clear_day`、`wx_rain_heavy_day`）。
- UI 通过 `Image($r('common.media.' + wmoIconKey(code, isDay)))` 直接引用，**无需额外映射表**。
- 原始 219 个 `wi-*.svg` 中选取 19 个代表性图标，按 WMO 天气代码语义复制重命名；映射关系见 `WmoCode.ts` 顶部注释。
- 图标为单色字形，运行时经 `Image().fillColor()` 着色以适配浅色/深色卡片。

> 原作者保留版权声明；本项目使用符合 MIT 条款，未做商标性使用。

## 在 DevEco Studio 打开

1. DevEco Studio（HarmonyOS NEXT，API 26 对应版本）打开本目录。
2. **必补资源 / 配置**：
   - 应用图标：已提供矢量版 `AppScope/resources/base/media/app_icon.svg`（AppScope 资源对各模块共享，缺媒体问题已解决）；如需栅格 PNG/高密图可由该 SVG 导出。
   - 品牌资料见 `branding/`：`logo-mark.svg`（透明品牌标）、`wordmark.svg`（图形+文字）、`preview.html`（亮/暗预览）。
   - 签名：`build-profile.json5` 的 `signingConfigs` 为空，需在 IDE 中配置调试签名（File → Project Structure → Signing）。
3. Sync & Build（`hvigor`）：`entry` 出手机/平板/PC/TV 包，`watch` 出手表包。

## 当前为脚手架（Stub）的部分

- 本地缓存**已接 RDB**：`data/local/RdbStore.ets` 基于 `@kit.ArkData` 的 `relationalStore`（S1 安全级）承载天气快照与位置；`CacheStore` 旧封装仍保留、待迁移。`distributedKVStore` 跨设备同步已落地（位置 + 设置，和风 Key 除外）。
- `LocationProvider` 已接 `geoLocationManager`，运行时需动态申请 `LOCATION` / `APPROXIMATELY_LOCATION`。
- `RefreshScheduler` 已接 WorkScheduler（延迟任务，**无需** `KEEP_BACKGROUND_RUNNING`，WIFI + 持久化），但**周期策略仍待细化**——`WorkInfo` 尚未配置 `repeatInterval`，当前未达到「≤4 次/日」的精确节奏。
- `WeatherFormAbility` 已接真实天气：onAddForm 同步返占位、异步 `updateForm` 推 RDB 缓存真实数据（**P1-7 完成**）；卡片图标用 erikflowers/weather-icons（见「图标素材来源」）。
- `QWeatherSource` 已结构实现并**已注册**进 `sources/registry`（运行时按 `isAvailable()` 过滤，未配 Key 不出现），但 `icon→WMO` 对照表仍待补全，且默认不随包发布直至合规通过。
- 默认位置：首次启动以 Shanghai 为 SEED 填充并**持久化**，已可管理 / 设默认 / 跨设备同步，不再硬编码死。
- UI 已接入 HDS（`HdsNavigation`/`HdsTabs`/`hdsMaterial`）、状态管理 V2、数字翻牌/渐变文本；沉浸光感材质与 HDS 视效**需真机验收**（模拟器不支持，见 doc 11）。

## 下一步建议

1. 补全图标/签名后做一次空跑构建，确认工程可编译。
2. 主流程已闭环（定位 → 展示 → 刷新 → RDB 缓存 → 多设备 → 跨设备同步），按 `docs/10-研发计划与质量保障.md` 的 M1–M7 收尾质量保障与测试。
3. **细化刷新周期策略**：为 `RefreshScheduler` 的 `WorkInfo` 配置 `repeatInterval`，落实「≤4 次/日」的精确节奏。
4. 国内源启用前完成 `docs/09` §3.1 合规清单并评审；补全 `QWeatherSource` 的 `icon→WMO` 对照表。
5. 按 `docs/11` 接入沉浸光感/HDS 框架与状态管理 V2，并做**真机**材质验收（模拟器无 HDS 沉浸视效）。
6. 设计语言已体系化（`docs/13-美学设计语言.md`），持续对齐 Apple 流体界面方法论；无障碍与 P2 服务见 `docs/14-P2服务与无障碍.md`。
