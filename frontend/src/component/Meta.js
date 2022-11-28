import React from 'react'

import { Helmet } from "react-helmet-async";

export const Meta = ({ title, description, keywords, url }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={url} />
            <meta
                name="twitter:title"
                content={title}
            />
            <meta name="twitter:creator" content="@jauntycoder" />
            <meta name="twitter:site" content="@jauntycoder" />
            <meta
                name="twitter:description"
                content={description}
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta
                property="og:title"
                content={title}
            />
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:image"
                content="https://designcode.io/cloud/v2/twitter.jpg"
            />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Real Light House Guild',
    description: 'Were student can display their projects',
    keywords: 'Web developer, React, Javascript, DotNet, Java',
    url: window.location.href
}