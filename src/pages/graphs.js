import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const GraphPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>Graphs</title>
      </Helmet>
      <Container type="content" className="text-center">
        <h2>Page for graphs</h2>
        <p>Graphs!</p>
      </Container>
    </Layout>
  );
};

export default GraphPage;
