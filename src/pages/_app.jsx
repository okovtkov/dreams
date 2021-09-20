import '../assets/styles.css';

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line react/destructuring-assignment
export default function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
