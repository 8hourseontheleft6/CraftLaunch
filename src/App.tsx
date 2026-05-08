import TitleBar from './components/TitleBar';

function App() {
  return (
    <div className="h-full flex flex-col bg-zinc-800 text-white">
      <TitleBar />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-zinc-500 text-lg">CraftLaunch</p>
      </main>
    </div>
  );
}

export default App;
