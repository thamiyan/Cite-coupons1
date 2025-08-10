export default function Container({ children }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6">{children}</div>
    </div>
  )
}
