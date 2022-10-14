
import Head from 'next/head'
import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | IG News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, Welcome</span>
          <h1>News About the <span>React</span> World.</h1>
          <p>
            Get acess to all publications <br />
            <span>for $9.90 month</span>
          </p>
        </section>
        <picture>
          <img src="/images/avatar.svg" alt="girlCoding" />
        </picture>
      </main>
    </>
  )
}
