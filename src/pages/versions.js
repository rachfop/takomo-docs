import React from 'react';

import Layout from '@theme/Layout';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import versions from '../../versions.json';

function Version() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    const latestVersion = versions[0];
    const pastVersions = versions.filter((version) => version !== latestVersion);
    const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;
    return (
        <Layout
            title="Versions"
            permalink="/versions"
            description="Docusaurus 2 Versions page listing all documented site versions">
            <main className="container margin-vert--lg">
                <h1>Takomo documentation versions</h1>
                <div className="margin-bottom--lg">
                    <h3 id="latest">Latest version (Stable)</h3>
                    <p>Here you can find the latest documentation.</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>{latestVersion}</th>
                            <td>
                                <Link to={useBaseUrl('/docs')}>Documentation</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {pastVersions.length > 0 && (
                    <div className="margin-bottom--lg">
                        <h3 id="archive">Past Versions</h3>
                        <p>
                            Here you can find documentation for previous versions of
                            Docusaurus.
                        </p>
                        <table>
                            <tbody>
                            {pastVersions.map((version) => (
                                <tr key={version}>
                                    <th>{version}</th>
                                    <td>
                                        <Link to={`https://takomo.io/docs/release/v${version.replace(/\./g, '-')}/`}>
                                            Documentation
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </Layout>
    );
}

export default Version;