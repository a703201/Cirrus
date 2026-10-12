import uiMaterial from "@ohos:arkui.uiMaterial";
import { Log } from "@bundle:com.Lumio.Cirrus/entry@common/ets/utils/Log";
import { MaterialTier } from "@bundle:com.Lumio.Cirrus/entry@common/ets/models/Settings";
/**
 * 沉浸光感（ImmersiveMaterial）能力探测与降级 (P1-1, docs/11 §2.4, docs/13 §10).
 *
 * 官方约束（@ohos.arkui.uiMaterial）：ImmersiveMaterial 对**普通内容区组件不生效**，
 * 仅在 Navigation/NavDestination 标题栏、横向 Tabs(barPosition=End) 底部 TabBar，
 * 以及弹窗类/Slider/Toggle/Select 上生效。因此：
 *  - 标题栏 / 底部导航 / 弹窗 → 使用沉浸光感材质（本工具或 HDS 的 systemMaterialEffect）；
 *  - 内容区卡片 → 回退稳定 `backgroundBlurStyle` 玻璃。
 * 不支持沉浸式材质或低算力设备上自动降级，不硬开 EXQUISITE。
 */
export class MaterialUtil {
    private static supportedCache: boolean | undefined = undefined;
    static isImmersiveSupported(): boolean {
        if (MaterialUtil.supportedCache === undefined) {
            try {
                MaterialUtil.supportedCache = uiMaterial.isImmersiveMaterialSupported();
            }
            catch (e) {
                Log.w(`isImmersiveMaterialSupported failed: ${e}`);
                MaterialUtil.supportedCache = false;
            }
        }
        return MaterialUtil.supportedCache;
    }
    /** Device compute level, as text (EXQUISITE / GENTLE / SMOOTH / UNKNOWN). */
    static deviceLevel(): string {
        try {
            const lv: uiMaterial.MaterialLevel = uiMaterial.getGlobalMaterialLevel();
            if (lv === uiMaterial.MaterialLevel.EXQUISITE) {
                return 'EXQUISITE';
            }
            if (lv === uiMaterial.MaterialLevel.GENTLE) {
                return 'GENTLE';
            }
            return 'SMOOTH';
        }
        catch (e) {
            Log.w(`getGlobalMaterialLevel failed: ${e}`);
            return 'UNKNOWN';
        }
    }
    /**
     * ImmersiveMaterial for chrome / dialog / Select / Toggle.
     * Returns `undefined` when unsupported so callers keep the blur-glass fallback.
     */
    static immersive(style: uiMaterial.ImmersiveStyle = uiMaterial.ImmersiveStyle.REGULAR): uiMaterial.ImmersiveMaterial | undefined {
        if (!MaterialUtil.isImmersiveSupported()) {
            return undefined;
        }
        return new uiMaterial.ImmersiveMaterial({ style: style, interactive: true });
    }
    /** Blur glass fallback for content cards (ImmersiveMaterial does not apply here). */
    static cardBlurStyle(tier: MaterialTier = MaterialTier.AUTO): BlurStyle {
        switch (tier) {
            case MaterialTier.EXQUISITE:
                return BlurStyle.COMPONENT_THICK;
            case MaterialTier.GENTLE:
                return BlurStyle.COMPONENT_THICK;
            case MaterialTier.SMOOTH:
                return BlurStyle.COMPONENT_REGULAR;
            default:
                return BlurStyle.COMPONENT_THICK;
        }
    }
}
