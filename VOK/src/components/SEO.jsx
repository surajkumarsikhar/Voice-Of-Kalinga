// components/SEO.jsx
import { Helmet } from "react-helmet";

const SEO = ({
  title = "Voice of Kalinga – Stories from the Heart of Odisha",
  description = "Voice of Kalinga brings untold stories from Odisha's streets. Real people. Real voices.",
  image = "https://voiceofkalinga.in/og-image.jpg",
  url = "https://voiceofkalinga.in/",
  keywords = "Voice of Kalinga, Odisha stories, Street stories, Real voices, Odisha culture, VOK",
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Voice of Kalinga Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
