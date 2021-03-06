import React from 'react';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const versions = ["2.7.2", "1.5.1", "0.2.0"]
function Version() {
    const latestVersion = versions[0];
    const pastVersions = versions.filter((version) => version !== latestVersion);
    return (
        <Layout
            title="Versions"
            permalink="/versions"
            description="Takomo documentation">
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
                            Here you can find documentation for previous versions of Takomo.
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