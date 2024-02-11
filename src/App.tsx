import React from 'react';
import './App.css';
import RouterMain from "./components/RouterMain"

function App() {
  const [theme, setTheme] = React.useState<string>("light")
  return (
    <div className={theme}>
      <RouterMain setTheme={setTheme} theme={theme} />
    </div>
  );
}

export default App;
