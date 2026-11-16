// Runtime Configuration for E06
export interface AppConfig {
  showChrome: boolean;
  backUrl: string | null;
  allowPrint: boolean;
}

export function getAppConfig(): AppConfig {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const backParam = urlParams.get('back');
  const chromeParam = urlParams.get('chrome');

  return {
    showChrome: chromeParam !== 'false',
    backUrl: backParam,
    allowPrint: false, // off by default per §4
  };
}
