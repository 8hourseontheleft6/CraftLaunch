import { Client } from 'minecraft-launcher-core';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DEFAULT_MINECRAFT_DIR = path.join(process.env.APPDATA || '', '.minecraft');
let customMinecraftDir: string | null = null;

export function getMinecraftDir(): string {
  return customMinecraftDir || DEFAULT_MINECRAFT_DIR;
}

export function setMinecraftDir(dir: string): void {
  customMinecraftDir = dir;
}

function getVersionsDir(): string {
  return path.join(getMinecraftDir(), 'versions');
}

export function scanVersions(): string[] {
  try {
    const dir = getVersionsDir();
    if (!fs.existsSync(dir)) {
      return [];
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function detectVersionType(version: string): string {
  try {
    const versionDir = path.join(getVersionsDir(), version);
    const jsonPath = path.join(versionDir, `${version}.json`);
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      if (data.type) return data.type;
    }
  } catch {}
  return 'release';
}

export async function launchGame(version: string): Promise<void> {
  const client = new Client();

  const auth = {
    access_token: '0',
    client_token: crypto.randomUUID(),
    uuid: crypto.randomUUID(),
    name: 'Player',
    user_properties: {},
  };

  const versionType = detectVersionType(version);

  return new Promise((resolve, reject) => {
    let resolved = false;

    const done = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    client.on('debug', (e) => console.log('[mc-launcher]', e));
    client.on('data', (e) => console.log('[mc-output]', e));
    client.on('error', (e) => {
      console.log('[mc-error]', e);
      if (!resolved) {
        resolved = true;
        reject(e);
      }
    });
    client.on('exit', (code) => {
      console.log('[mc-exit]', code);
      done();
    });
    client.on('close', () => {
      console.log('[mc-close]');
      done();
    });

    // launch async
    setTimeout(() => {
      try {
        client.launch({
          authorization: auth,
          root: getMinecraftDir(),
          version: {
            number: version,
            type: versionType,
          },
          memory: {
            max: '4G',
            min: '1G',
          },
          overrides: {
            detached: false,
          },
        });

        // after launch, wait a bit then resolve (game is running)
        // if exit/close already fired, this is no-op
        setTimeout(done, 3000);
      } catch (e) {
        if (!resolved) {
          resolved = true;
          reject(e);
        }
      }
    }, 0);
  });
}
