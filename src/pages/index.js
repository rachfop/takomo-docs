import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Simple and Powerful</>,
    // imageUrl: 'img/takomo-logo-sm.png',
    description: (
      <>
          Easy to get started, powerful enough to implement large-scale deployments across multiple AWS accounts and regions.
      </>
    ),
  },
  {
    title: <>Extensible</>,
    // imageUrl: 'img/takomo-logo-sm.png',
    description: (
      <>
          Plug in your own JavaScript code to extend the core features.
      </>
    ),
  },
  {
    title: <>Easy AWS Organizations management</>,
    // imageUrl: 'img/takomo-logo-sm.png',
    description: (
      <>
          Manage organizational units, service control and tag policies. Quickly create new AWS accounts and deploy infrastructure to them.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Organize, parameterize and deploy CloudFormation stacks`}
      description="Organize, parameterize and deploy CloudFormation stacks">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src={"img/takomo-logo-index.png"} />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
