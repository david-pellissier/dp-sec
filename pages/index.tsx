import type { NextPage } from 'next'
import Head from 'next/head'
import CTFTools from '../components/tools'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link href="/css/brands.min.css" rel="stylesheet"/>
        <link href="/css/solid.min.css" rel="stylesheet"/>
        <link href="/css/fontawesome.min.css" rel="stylesheet"/>
      </Head>
      <CTFTools></CTFTools>
    </div>
  )
}

export default Home
