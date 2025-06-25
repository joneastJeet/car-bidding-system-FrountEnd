import React from 'react';
import Layout from '../layouts/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-gray-700">
        Welcome to our auction site. We provide an exciting marketplace for buying and selling various items.
      </p>
    </Layout>
  );
};

export default AboutPage;
