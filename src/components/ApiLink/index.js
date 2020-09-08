import React from 'react';

const currentRelease = process.env.CURRENT_RELEASE || 'next'

const apiBaseUrl = `https://takomo.io/api-docs/release/${currentRelease}`

export default ({ children, uri }) => (<a href={`${apiBaseUrl}${uri}`}>{children}</a>)