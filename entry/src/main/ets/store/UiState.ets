import { PersistenceV2 } from '@kit.ArkUI';

/**
 * UI 运行时状态（P1-8）——经 PersistenceV2 持久化，跨冷启动保留。
 * 仅存轻量 UI 偏好（如底部页签），业务数据仍由 RDB/Preferences 承载。
 */
@ObservedV2
export class UiState {
  @Trace tabIndex: number = 0;
}

export const uiState: UiState =
  PersistenceV2.connect(UiState, () => new UiState()) ?? new UiState();