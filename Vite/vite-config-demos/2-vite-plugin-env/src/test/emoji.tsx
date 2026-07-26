import { createRoot } from 'react-dom/client'

const EmojiApp = () => {
  return <div>
    <p>:smile: :joy: :cry:</p>
    <button>:thumbs_up:</button>
    <button>:heart:</button>
  </div>
}
const root = createRoot(document.getElementById('root')!)
root.render(<div>
  <h2>Import meta env BASE_TITLE: {import.meta.env.VITE_BASE_TITLE}</h2>
  <EmojiApp />
</div>)
