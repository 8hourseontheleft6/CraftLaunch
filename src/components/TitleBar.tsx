const tabs = ['首页', '版本管理', '下载', '设置', '关于'];

interface TitleBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TitleBar = ({ activeTab, onTabChange }: TitleBarProps) => {
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimize();
    }
  };
  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximize();
    }
  };
  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.close();
    } else {
      window.close();
    }
  };

  return (
    <div
      className="bg-[#2874A6] select-none"
      style={{ height: 'var(--titlebar-height)' }}
    >
      <div
        className="flex items-center justify-between h-full"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        {/* logo */}
        <div className="flex items-center h-full pl-6 cursor-default">
          <span className="text-white text-base font-semibold tracking-wide">CraftLaunch</span>
        </div>

        {/* nav tabs */}
        <div className="flex items-center h-full gap-4" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                px-5 h-3/4 flex items-center rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab
                  ? 'text-white bg-white/20'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* window controls */}
        <div className="flex h-full" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
          <button
            onClick={handleMinimize}
            className="w-12 h-full flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors text-base"
          >
            &#x2014;
          </button>
          <button
            onClick={handleMaximize}
            className="w-12 h-full flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors text-base"
          >
            &#x25A1;
          </button>
          <button
            onClick={handleClose}
            className="w-12 h-full flex items-center justify-center text-white/80 hover:bg-red-600 hover:text-white transition-colors text-base"
          >
            &#x2715;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
