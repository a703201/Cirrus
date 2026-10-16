/**
 * WMO weather code → icon key + localized description (7 languages).
 * Consolidated here for the scaffold (interface文档 §3.5). Each source maps its
 * own icon/condition ids into WMO codes; UI always reads from this single table.
 */

export interface WmoEntry {
  code: number;
  iconKey: string;
  dayNight: boolean;
  en: string;
  zh: string;
  ja: string;
  ko: string;
  fr: string;
  es: string;
  de: string;
}

const WMO_TABLE: WmoEntry[] = [
  { code: 0, iconKey: 'clear', dayNight: true, en: 'Clear', zh: '晴', ja: '晴れ', ko: '맑음', fr: 'Clair', es: 'Despejado', de: 'Klar' },
  { code: 1, iconKey: 'mainly_clear', dayNight: true, en: 'Mainly clear', zh: '大致晴朗', ja: 'おおむね晴れ', ko: '대체로 맑음', fr: 'Plupart du temps clair', es: 'Predominantemente despejado', de: 'Überwiegend klar' },
  { code: 2, iconKey: 'partly_cloudy', dayNight: true, en: 'Partly cloudy', zh: '局部多云', ja: '晴れ時々曇り', ko: '부분적으로 흐림', fr: 'Partiellement nuageux', es: 'Parcialmente nuboso', de: 'Teils bewölkt' },
  { code: 3, iconKey: 'overcast', dayNight: false, en: 'Overcast', zh: '阴', ja: '曇り', ko: '흐림', fr: 'Couvert', es: 'Nuboso', de: 'Bewölkt' },
  { code: 45, iconKey: 'fog', dayNight: false, en: 'Fog', zh: '雾', ja: '霧', ko: '안개', fr: 'Brouillard', es: 'Niebla', de: 'Nebel' },
  { code: 48, iconKey: 'fog_rime', dayNight: false, en: 'Rime fog', zh: '雾凇', ja: '樹霜', ko: '짙은 안개', fr: 'Brouillard givrant', es: 'Niebla helada', de: 'Reifnebel' },
  { code: 51, iconKey: 'drizzle_light', dayNight: false, en: 'Light drizzle', zh: '小毛毛雨', ja: '弱い霧雨', ko: '약한 이슬비', fr: 'Bruine légère', es: 'Llovizna débil', de: 'Leichter Niesel' },
  { code: 53, iconKey: 'drizzle_moderate', dayNight: false, en: 'Moderate drizzle', zh: '中毛毛雨', ja: '霧雨', ko: '보통 이슬비', fr: 'Bruine modérée', es: 'Llovizna moderada', de: 'Mäßiger Niesel' },
  { code: 55, iconKey: 'drizzle_dense', dayNight: false, en: 'Dense drizzle', zh: '大毛毛雨', ja: '強い霧雨', ko: '강한 이슬비', fr: 'Bruine dense', es: 'Llovizna densa', de: 'Dichter Niesel' },
  { code: 56, iconKey: 'freezing_drizzle_light', dayNight: false, en: 'Light freezing drizzle', zh: '小冻毛毛雨', ja: '弱い着氷性霧雨', ko: '약한 어는 이슬비', fr: 'Bruine verglaçante faible', es: 'Llovizna débil engelante', de: 'Leichter gefrierender Niesel' },
  { code: 57, iconKey: 'freezing_drizzle_dense', dayNight: false, en: 'Dense freezing drizzle', zh: '大冻毛毛雨', ja: '強い着氷性霧雨', ko: '강한 어는 이슬비', fr: 'Bruine verglaçante dense', es: 'Llovizna densa engelante', de: 'Dichter gefrierender Niesel' },
  { code: 61, iconKey: 'rain_light', dayNight: false, en: 'Slight rain', zh: '小雨', ja: '弱い雨', ko: '약한 비', fr: 'Pluie faible', es: 'Lluvia débil', de: 'Leichter Regen' },
  { code: 63, iconKey: 'rain_moderate', dayNight: false, en: 'Moderate rain', zh: '中雨', ja: '雨', ko: '보통 비', fr: 'Pluie modérée', es: 'Lluvia moderada', de: 'Mäßiger Regen' },
  { code: 65, iconKey: 'rain_heavy', dayNight: false, en: 'Heavy rain', zh: '大雨', ja: '強い雨', ko: '강한 비', fr: 'Forte pluie', es: 'Lluvia fuerte', de: 'Starker Regen' },
  { code: 66, iconKey: 'freezing_rain_light', dayNight: false, en: 'Light freezing rain', zh: '小冻雨', ja: '弱い着氷性の雨', ko: '약한 어는 비', fr: 'Pluie verglaçante faible', es: 'Lluvia débil engelante', de: 'Leichter gefrierender Regen' },
  { code: 67, iconKey: 'freezing_rain_heavy', dayNight: false, en: 'Heavy freezing rain', zh: '大冻雨', ja: '強い着氷性の雨', ko: '강한 어는 비', fr: 'Pluie verglaçante forte', es: 'Lluvia fuerte engelante', de: 'Starker gefrierender Regen' },
  { code: 71, iconKey: 'snow_light', dayNight: false, en: 'Slight snow', zh: '小雪', ja: '弱い雪', ko: '약한 눈', fr: 'Neige faible', es: 'Nieve débil', de: 'Leichter Schnee' },
  { code: 73, iconKey: 'snow_moderate', dayNight: false, en: 'Moderate snow', zh: '中雪', ja: '雪', ko: '보통 눈', fr: 'Neige modérée', es: 'Nieve moderada', de: 'Mäßiger Schnee' },
  { code: 75, iconKey: 'snow_heavy', dayNight: false, en: 'Heavy snow', zh: '大雪', ja: '強い雪', ko: '강한 눈', fr: 'Forte neige', es: 'Nieve fuerte', de: 'Starker Schnee' },
  { code: 77, iconKey: 'snow_grains', dayNight: false, en: 'Snow grains', zh: '雪粒', ja: '雪あられ', ko: '싸락눈', fr: 'Grains de neige', es: 'Granos de nieve', de: 'Schneekörner' },
  { code: 80, iconKey: 'showers_light', dayNight: true, en: 'Slight rain showers', zh: '小阵雨', ja: '弱いにわか雨', ko: '약한 소나기', fr: 'Averses faibles', es: 'Chubascos débiles', de: 'Leichte Schauer' },
  { code: 81, iconKey: 'showers_moderate', dayNight: true, en: 'Moderate rain showers', zh: '中阵雨', ja: 'にわか雨', ko: '보통 소나기', fr: 'Averses modérées', es: 'Chubascos moderados', de: 'Mäßige Schauer' },
  { code: 82, iconKey: 'showers_violent', dayNight: true, en: 'Violent rain showers', zh: '强阵雨', ja: '強いにわか雨', ko: '강한 소나기', fr: 'Fortes averses', es: 'Chubascos fuertes', de: 'Heftige Schauer' },
  { code: 85, iconKey: 'snow_showers_light', dayNight: true, en: 'Slight snow showers', zh: '小阵雪', ja: '弱いにわか雪', ko: '약한 눈소나기', fr: 'Averses de neige faibles', es: 'Chubascos de nieve débiles', de: 'Leichte Schneeschauer' },
  { code: 86, iconKey: 'snow_showers_heavy', dayNight: true, en: 'Heavy snow showers', zh: '大阵雪', ja: '強いにわか雪', ko: '강한 눈소나기', fr: 'Fortes averses de neige', es: 'Chubascos de nieve fuertes', de: 'Heftige Schneeschauer' },
  { code: 95, iconKey: 'thunderstorm', dayNight: false, en: 'Thunderstorm', zh: '雷阵雨', ja: '雷雨', ko: '뇌우', fr: 'Orage', es: 'Tormenta', de: 'Gewitter' },
  { code: 96, iconKey: 'thunderstorm_hail_light', dayNight: false, en: 'Thunderstorm w/ slight hail', zh: '雷阵雨伴小冰雹', ja: '雹を伴う雷雨', ko: '약한 우박 동반 뇌우', fr: 'Orage avec grêle faible', es: 'Tormenta con granizo débil', de: 'Gewitter mit leichtem Hagel' },
  { code: 99, iconKey: 'thunderstorm_hail_heavy', dayNight: false, en: 'Thunderstorm w/ heavy hail', zh: '雷阵雨伴大冰雹', ja: '強い雹を伴う雷雨', ko: '강한 우박 동반 뇌우', fr: 'Orage avec grêle forte', es: 'Tormenta con granizo fuerte', de: 'Gewitter mit starkem Hagel' }
];

/**
 * 图标资源映射：返回的 key（如 `wx_clear_day`、`wx_rain_heavy_day`）即为
 * `common/src/main/resources/base/media/` 下 SVG 的文件名（去掉 .svg）。
 * 图标取自 erikflowers/weather-icons（MIT，见 README），按上表语义复制重命名，
 * UI 直接 `Image($r('common.media.' + wmoIconKey(code, isDay)))` 引用，无需额外映射表。
 */
export function wmoIconKey(code: number, isDay: boolean): string {
  const entry: WmoEntry | undefined = WMO_TABLE.find((e) => e.code === code);
  const base: string = entry ? entry.iconKey : 'overcast';
  const suffix: string = entry && entry.dayNight && !isDay ? '_night' : '_day';
  return 'wx_' + base + suffix;
}

export function wmoDescription(code: number, lang: string): string {
  const entry: WmoEntry | undefined = WMO_TABLE.find((e) => e.code === code);
  if (!entry) {
    return '';
  }
  // 兼容短码（'zh'）与完整标签（'zh-CN'）：调用方（系统语言 / 用户设置 / 手表模块）
  // 传入的形态不统一，若只认完整标签会静默落到 default 分支显示英文。
  switch (lang.split('-')[0]) {
    case 'zh':
      return entry.zh;
    case 'ja':
      return entry.ja;
    case 'ko':
      return entry.ko;
    case 'fr':
      return entry.fr;
    case 'es':
      return entry.es;
    case 'de':
      return entry.de;
    default:
      return entry.en;
  }
}
