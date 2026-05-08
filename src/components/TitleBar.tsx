const TitleBar = () => {
  const handleMinimize = () => window.electronAPI?.minimize();
  const handleMaximize = () => window.electronAPI?.maximize();
  const handleClose = () => window.electronAPI?.close();

  return (
    <div
      className="flex items-center justify-between bg-zinc-900 select-none"
      style={{ height: 'var(--titlebar-height)' }}
    >
      {/* drag region */}
      <div className="flex-1 h-full flex items-center pl-3 cursor-default" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
        <span className="text-zinc-400 text-xs font-medium tracking-wide">CraftLaunch</span>
      </div>

      {/* window controls */}
      <div className="flex h-full" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          onClick={handleMinimize}
          className="w-11 h-full flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors text-sm"
        >
          &#x2014;
        </button>
        <button
          onClick={handleMaximize}
          className="w-11 h-full flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors text-sm"
        >
          &#x25A1;
        </button>
        <button
          onClick={handleClose}
          className="w-11 h-full flex items-center justify-center text-zinc-400 hover:bg-red-600 hover:text-white transition-colors text-sm"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
