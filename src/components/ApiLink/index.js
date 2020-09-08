import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default ({ children, uri }) => {
  const {siteConfig} = useDocusaurusContext();
  const currentRelease = siteConfig.customFields.currentRelease
  const apiBaseUrl = `https://takomo.io/api-docs/release/${currentRelease.replace(/\./g, '-')}`
  return (<a href={`${apiBaseUrl}${uri}`}>{children}</a>)
}