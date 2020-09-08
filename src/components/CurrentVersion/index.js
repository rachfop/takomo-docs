import React from 'react';

const currentRelease = process.env.CURRENT_RELEASE || 'next'

export default () => (<span>{currentRelease}</span>)