import React from "react";
import NavigationPanel from "./components/NavigationPanel";
import MainContentLayout from "./components/MainContentLayout";

const App: React.FC = () => {
  return (
 <div className="md:flex bg-slate-950 text-slate-200">
      <header className="md:w-1/3 md:h-screen md:sticky md:top-0" role="banner">
        <NavigationPanel />
      </header>
      <main className="w-full md:w-2/3" role="main">
        <MainContentLayout />
      </main>
    </div>
  );
};

export default App;
