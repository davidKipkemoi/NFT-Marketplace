import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ 
  title = 'MetaCanvas | Digital Art NFT Marketplace',
  description = 'Buy, sell and discover exclusive digital art NFTs. MetaCanvas connects artists and collectors in a secure, transparent marketplace.',
  keywords = 'NFT, digital art, crypto art, marketplace, blockchain, Ethereum, digital collectibles',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://metacanvas.io',
  twitterHandle = '@metacanvas'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MetaCanvas",
    "url": ogUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${ogUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content={twitterHandle} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={ogUrl} />
      
      {/* Structured Data for Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default Meta; 