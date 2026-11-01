import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { Log } from 'common';

/**
 * 状态栏 / 导航栏外观统一控制器（需求 1）。
 *
 * 应用为沉浸式全屏（透明状态栏），状态栏图标颜色必须**随当前页面背景明暗实时切换**；
 * 由 EntryAbility 绑定窗口，页面（含二级页 onShown/onHidden）调用 `setTone` 即时更新。
 */
export class SystemBar {
  private static win: window.Window | undefined = undefined;

  static bind(w: window.Window): void {
    SystemBar.win = w;
  }

  /** @param dark true = 深色背景（图标用白），false = 浅色背景（图标用黑）。 */
  static setTone(dark: boolean): void {
    if (!SystemBar.win) {
      return;
    }
    const content: string = dark ? '#FFFFFF' : '#000000';
    const props: window.SystemBarProperties = {
      statusBarColor: '#00000000',
      statusBarContentColor: content,
      navigationBarColor: '#00000000',
      navigationBarContentColor: content
    };
    SystemBar.win.setWindowSystemBarProperties(props).catch((e: BusinessError) => {
      Log.w(`setWindowSystemBarProperties failed: ${e.code}`);
    });
  }
}