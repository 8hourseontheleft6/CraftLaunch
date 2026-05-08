const tabs = ['首页', '版本管理', '下载', '设置', '关于'];

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavBar = ({ activeTab, onTabChange }: NavBarProps) => {
  return (
    <nav className="flex items-center justify-center gap-2 px-6 py-2 bg-[#2874A6]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`
            px-5 py-1.5 rounded-md text-base font-medium transition-all duration-200
            ${activeTab === tab
              ? 'text-white bg-white/20 shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
