const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-12">
      {/* game title area */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-zinc-700 tracking-wide">
          Minecraft
        </h1>
        <p className="text-zinc-400 text-sm mt-2">尚未选择版本</p>
      </div>

      {/* launch button - border only */}
      <button
        className="
          px-20 py-5 rounded-2xl text-[#5dade2] text-xl font-semibold
          border-2 border-[#85c1e9]
          bg-transparent
          hover:scale-105 hover:bg-[#85c1e9]/10 active:scale-95
          transition-all duration-200 ease-out
        "
      >
        启动游戏
      </button>
    </div>
  );
};

export default HomePage;
