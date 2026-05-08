import { useEffect, useState } from 'react';

const HomePage = () => {
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState('');
  const [minecraftDir, setMinecraftDir] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const dir = await window.electronAPI?.getMinecraftDir();
        if (dir) setMinecraftDir(dir);
        const list = await window.electronAPI?.scanVersions();
        if (list && list.length > 0) {
          setVersions(list);
          setSelectedVersion(list[0]);
        }
      } catch {}
    })();
  }, []);

  const handleSelectDir = async () => {
    console.log('selectDir clicked, electronAPI:', !!window.electronAPI);
    if (!window.electronAPI) {
      setError('electronAPI 未加载');
      return;
    }
    const result = await window.electronAPI.selectMinecraftDir();
    if (result?.selected && result.versions) {
      setMinecraftDir(result.path || '');
      setVersions(result.versions);
      setSelectedVersion(result.versions[0]);
      setError('');
    } else if (result?.error) {
      setError(result.error);
    }
  };

  const handleLaunch = async () => {
    if (!selectedVersion) return;
    setLaunching(true);
    setError('');
    try {
      const result = await window.electronAPI?.launchGame(selectedVersion);
      if (result && !result.success) {
        setError(result.error || '启动失败');
      }
    } catch (err: any) {
      setError(err.message || '启动异常');
    } finally {
      setLaunching(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10">
      {/* game title */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-zinc-700 tracking-wide">
          Minecraft
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          {versions.length > 0
            ? `${versions.length} 个版本可用`
            : '未找到 Minecraft 版本'}
        </p>
        {minecraftDir && (
          <p className="text-zinc-400 text-xs mt-1 truncate max-w-xs">
            {minecraftDir}
          </p>
        )}
      </div>

      {/* version selector or select dir */}
      {versions.length > 0 ? (
        <div className="flex items-center gap-3">
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="
              px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-700
              text-sm font-medium outline-none focus:border-[#85c1e9] focus:ring-1 focus:ring-[#85c1e9]
            "
          >
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <button
          onClick={handleSelectDir}
          className="
            px-6 py-3 rounded-xl text-sm font-medium
            border border-[#85c1e9] text-[#5dade2]
            hover:bg-[#85c1e9]/10 hover:scale-105
            transition-all duration-200
          "
        >
          选择 .minecraft 文件夹
        </button>
      )}

      {/* launch button */}
      <button
        onClick={handleLaunch}
        disabled={launching || !selectedVersion}
        className="
          px-20 py-5 rounded-2xl text-xl font-semibold
          border-2 border-[#85c1e9] text-[#5dade2]
          bg-transparent
          hover:scale-105 hover:bg-[#85c1e9]/10 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          transition-all duration-200 ease-out
        "
      >
        {launching ? '启动中...' : '启动游戏'}
      </button>

      {/* error */}
      {error && (
        <p className="text-red-500 text-sm max-w-md text-center">{error}</p>
      )}
    </div>
  );
};

export default HomePage;
