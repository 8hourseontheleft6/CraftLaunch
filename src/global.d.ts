export {};

declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      scanVersions: () => Promise<string[]>;
      getMinecraftDir: () => Promise<string>;
      selectMinecraftDir: () => Promise<{ selected: boolean; path?: string; error?: string; versions?: string[] }>;
      launchGame: (version: string) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
