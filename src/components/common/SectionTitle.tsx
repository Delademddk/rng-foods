type SectionTitleProps = {
  eyebrow?: string
  title: string
}

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      {eyebrow ? (
        <p className="text-accent uppercase tracking-[0.3em] mb-3">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-4xl md:text-5xl font-heading font-bold">{title}</h2>
    </div>
  )
}
