interface StructuredDataProps {
  data: any
  id?: string
}

export function StructuredData({ data, id }: StructuredDataProps) {
  const scriptId = id || `structured-data-${data['@type']?.toLowerCase() || 'default'}`
  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
