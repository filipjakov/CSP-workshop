import * as crypto from "crypto";
import nextSafe, { type nextSafe as ns } from "next-safe";
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";

interface DocumentProps {
  nonce: string;
}

class MyDocument extends Document<DocumentProps> {
  static override async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const nonce = crypto.randomBytes(16).toString("base64");
    const view = ctx.renderPage;

    ctx.renderPage = () =>
      view({
        // @ts-ignore
        enhanceApp: (App) => (props) => <App nonce={nonce} {...props} />,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const additionalProps = { nonce }; // 👈 add this

    const header = (nextSafe as unknown as typeof ns)({
      isDev: process.env.NODE_ENV !== "production",
      contentSecurityPolicy: {
        mergeDefaultDirectives: true,
        // Prevent unvanted behaviour
        "script-src": [
          // "*",
          "'self'",
          `'nonce-${nonce}'`,
          "'strict-dynamic'",
          /**
           * Because of 'strict-dynamic' these entries are ignored in CSP3 and above
           * Kept for backcompatibility with older browsers (recommended)
           */
          // "'unsafe-inline'",
          // "https:",
        ],
        /**
         * mention obsolete X-Frame-Options
         */
        "frame-ancestors": [
          // "*"
          "none",
        ],

        // Prevent further damage if injection happens
        "frame-src": [
          // "'none'",
          "https://*.wikipedia.org",
        ],
        "connect-src": [
          // "*",
          "'self'",
          "https://79e9-93-136-227-146.ngrok-free.app",
        ],
        "img-src": [
          // "*",
          "https://*.photos",
        ],
        // "style-src": ["*"],
        // "media-src": ["*"],

        // @ts-expect-error
        "prefetch-src": false,
      },
    }).find(({ key }) => key === "Content-Security-Policy");

    if (header) {
      ctx.res?.setHeader("x-nonce", nonce);
      ctx.res?.setHeader(header.key, header.value);
    }

    return {
      ...initialProps,
      ...additionalProps,
    };
  }

  override render() {
    const { nonce } = this.props;

    return (
      <Html>
        <Head nonce={nonce}>
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = "${nonce}"`,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

declare global {
  interface Window {
    __webpack_nonce__: string;
  }
}
