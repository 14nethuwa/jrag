type PagePlaceholderProps = {
  title: string
  context?: string
  description?: string
}

export function PagePlaceholder({
  title,
  context,
  description = 'Placeholder page for future content.',
}: PagePlaceholderProps) {
  return (
    <main style={{ padding: '2rem' }}>
      {context ? <p>{context}</p> : null}
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  )
}
