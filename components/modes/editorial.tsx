import Image from 'next/image'
import type { ReactNode } from 'react'
import styles from './editorial.module.css'
import type { EditorialModeProps } from './types'

export function EditorialMode({ headline, intro, blocks }: EditorialModeProps): ReactNode {
  return (
    <section className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.intro}>{intro}</p>
        </header>

        {blocks.map((block, index) => {
          switch (block.type) {
            case 'subhead':
              return (
                <h2 key={`${block.type}-${index}`} className={styles.subhead}>
                  {block.content}
                </h2>
              )
            case 'paragraph':
              return (
                <p key={`${block.type}-${index}`} className={styles.body}>
                  {block.content}
                </p>
              )
            case 'quote':
              return (
                <blockquote key={`${block.type}-${index}`} className={styles.quote}>
                  {block.content}
                </blockquote>
              )
            case 'image':
              return (
                <div key={`${block.type}-${index}`} className={styles.imageWrapper}>
                  <Image
                    src={block.content}
                    alt={block.alt || ''}
                    className={styles.image}
                    width={1200}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 750px"
                    loading="lazy"
                  />
                </div>
              )
            default:
              return null
          }
        })}
      </article>
    </section>
  )
}
