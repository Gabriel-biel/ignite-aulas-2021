
import { render } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App'

// render(<App />, document.getElementById('root'))

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />)