import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
            <link rel="shortcut icon" href="../static/assets/img/fav.ico" />
            <meta charSet="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="author" content="SaRa Lifestyle Ltd." />
            <meta name="keywords" content="" />
            <meta name="description" content="" />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'SaRa Marketplace - Admin',
    description: 'SaRa Marketplace - Admin',
    keywords: 'sara, ecommerce, marketplace, online shopping',
}

export default Meta