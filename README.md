# Cirrus（卷云）— HarmonyOS NEXT 天气应用 · 工程脚手架

> 参考 Breezy Weather / Geometric Weather ｜ 平台 HarmonyOS NEXT（**API 26**，用户指定最新稳定版）
> 架构：Stage 模型 + ArkUI 声明式 ｜ 设备：手机 / 平板 / 折叠屏 / PC / TV / 手表

本目录包含**规划文档**（`docs/`）与**可打开的工程脚手架**（根目录 + `common` / `data` / `entry` / `watch` 模块）。

## 模块划分

| 模块 | 类型 | 说明 |
|------|------|------|
| `common` | HAR | 归一模型、WMO 代码多语映射、日志/时间/单位工具、可复用玻璃卡片组件 |
| `data` | HAR | 多源可插拔（`WeatherSource`）、Open-Meteo 实现、和风源（合规门禁后置）、仓库、缓存、定位、后台调度 |
| `entry` | HAP | 手机/平板/折叠/PC/TV 入口：EntryAbility、响应式主页（断点主从/Tabs）、各功能页、天气卡片 FormAbility |
| `watch` | HAP | 手表轻量入口：WatchAbility + 极简主页 |

## 已落地的架构要点（对齐 docs/ 规划）

- **多源可插拔**：`data/sources/WeatherSource.ts` 定义契约；`OpenMeteoSource` 默认免密钥；`QWeatherSource` 已实现但**默认不注册**（见 `sources/registry.ts`），须先过 `docs/09-隐私与权限合规.md §3.1` 合规门禁。
- **归一模型**：`common/models/WeatherData.ts` 是唯一 UI 消费对象；各源实现 `toNormalized`。
- **WMO 全量映射 + 7 语种**：`common/models/WmoCode.ts`（28 条代码 × 7 语）。和风 `icon→WMO` 对照见 `sources/QWeatherCodes.ts`（待补全）。
- **多设备**：`entry/pages/Index.ets` 按 `(width >= 840vp)` 断点在 Tabs（手机）与主从（大屏）间切换；手表独立模块。
- **i18n**：`entry/resources` 含 `base` + 7 语种 `string.json`；UI 字符串全部 `$r()` 引用。天气状况文案走 `WmoCode.ts`。
- **状态/红线**：统一 `Log` 封装（禁裸 console/hilog）；类型标注无 `any/unknown`；`@Component` 方法替代 getter。

## 鸿蒙新特性与沉浸光感（规划重点）

> 完整结论见 [`docs/11-鸿蒙新特性与沉浸光感适配.md`](docs/11-鸿蒙新特性与沉浸光感适配.md)。

- **沉浸光感 / 空间化**：以 HarmonyOS **UI Design Kit（`@kit.UIDesignKit`）+ 沉浸光感**为第一眼视觉基石——`HdsNavigation`/`HdsTabs` 悬浮胶囊导航、`systemMaterialEffect` 材质、`dynamicHideTitleBar` 标题栏渐变模糊、智感握姿；替代自研 `blur` 卡片。启用前提 `targetAPIVersion ≥ 26.0.0`（本项目即 26）。
- **能力探测降级**：`deviceInfo.apiAvailable('26.0.0') && hdsMaterial.getSystemMaterialTypes().length > 0` 不满足时回退普通半透明卡片（沉浸光感材质仅 Phone/Tablet，且 UI Design Kit 仅中国境内）。
- **状态管理 V2**：新代码统一 `@ComponentV2` + `@Local/@Param/@Event/@ObservedV2/@Trace/@Monitor/@Computed` + `AppStorageV2/PersistenceV2`（现存 `Index.ets` 等为 V1，逐步迁移）。
- **ArkUI 新特性**：数字翻牌（温度刷新）、`Text.shaderStyle` 渐变文本、`SymbolGlyph` 动效、`focusWrapMode`（TV 走焦）、`uiAppearance`（深浅色/字体缩放）。
- **一多部署**：对齐官方三层工程（common/features/products）；手机·平板·PC·TV=部署模型 A，手表=部署模型 B。
- **明确不适用**：**实况窗（Live View Kit）** 不属于天气场景、**意图框架（Intents Kit）** 仅企业开发者且仅中国境内——均不纳入主流程（见 doc 11 §6.4/§6.5）。
- **权限修正**：天气周期刷新用**延迟任务**（WorkScheduler），**无需** `ohos.permission.KEEP_BACKGROUND_RUNNING`（该权限属长时任务）。

## 在 DevEco Studio 打开

1. DevEco Studio（HarmonyOS NEXT，API 26 对应版本）打开本目录。
2. **必补资源 / 配置**：
   - 应用图标：已提供矢量版 `AppScope/resources/base/media/app_icon.svg`（AppScope 资源对各模块共享，缺媒体问题已解决）；如需栅格 PNG/高密图可由该 SVG 导出。
   - 品牌资料见 `branding/`：`logo-mark.svg`（透明品牌标）、`wordmark.svg`（图形+文字）、`preview.html`（亮/暗预览）。
   - 签名：`build-profile.json5` 的 `signingConfigs` 为空，需在 IDE 中配置调试签名（File → Project Structure → Signing）。
3. Sync & Build（`hvigor`）：`entry` 出手机/平板/PC/TV 包，`watch` 出手表包。

## 当前为脚手架（Stub）的部分

- `CacheStore` 为内存占位，待接 `@kit.ArkData`（`relationalStore` RDB）与 `distributedKVStore`（跨设备同步）。
- `LocationProvider` 已接 `geoLocationManager`，运行时需动态申请 `LOCATION` / `APPROXIMATELY_LOCATION`。
- `RefreshScheduler` 已接 WorkScheduler（延迟任务，**无需** `KEEP_BACKGROUND_RUNNING`），待细化周期策略（≤4 次/日）。
- `WeatherFormAbility` 返回占位数据，待接真实天气。
- `QWeatherSource` 已结构实现，但 `icon→WMO` 对照表待补全，且**未注册**直至合规通过。
- 默认位置为硬编码（Shanghai），待接定位与位置管理持久化。
- UI 目前为普通 ArkUI 组件（非 HDS）；沉浸光感材质、状态管理 V2 迁移、数字翻牌等新特性**尚未落地**，见 doc 11 的里程碑安排。

## 下一步建议

1. 补全图标/签名后做一次空跑构建，确认工程可编译。
2. 按 `docs/10-研发计划与质量保障.md` 的 M1–M7 推进；优先打通 `entry` 主流程（定位→展示→刷新）。
3. 接入 RDB/DistributedKV 与真实设置持久化（源/单位/主题/语言）。
4. 国内源启用前完成 `docs/09` §3.1 合规清单并评审。
5. 按 `docs/11` 接入沉浸光感/HDS 框架与状态管理 V2，并做**真机**材质验收（模拟器无 HDS 沉浸视效）。
6. 规划文档随版本同步：新增 `docs/11-鸿蒙新特性与沉浸光感适配.md`，其余文档已按 API 26 新特性增补（Kit 化导入、状态管理 V2、三层工程、材质、权限修正）。
