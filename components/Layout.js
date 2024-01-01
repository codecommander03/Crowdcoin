import React from 'react'
import Header from './Header'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'

const Layout = (props) => {
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
            </Head>
            <Header />
            { props.children }
            <h1>Footer</h1>
        </Container>
    )
}

export default Layout