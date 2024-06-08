import { useIsClient } from "@/hooks/use-client";
import Script from "next/script";

/**
 * Copy to console as test: const a = document.createElement("script"); a.src = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js", document.getElementById("root").appendChild(a)
 * Copy to console as test: const a = document.createElement("script"); a.src = "https://79e9-93-136-227-146.ngrok-free.app/api/hello", document.getElementById("root").appendChild(a)
 */
export default function ScriptLoading() {
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  return (
    <main
      id="root"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <h1>CSP Examples</h1>
      <Script src="/self-script-flat.js" />
      <Script
        src="https://79e9-93-136-227-146.ngrok-free.app/self-script-nested.js"
        nonce={window.__webpack_nonce__}
      />
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        nonce={window.__webpack_nonce__}
      />
      <Script src="/self-script-fetch.js" nonce={window.__webpack_nonce__} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="https://picsum.photos/200/300" />

      <iframe
        src="https://fr.wikipedia.org/wiki/Main_Page"
        width="640"
        height="480"
      />
    </main>
  );
}
