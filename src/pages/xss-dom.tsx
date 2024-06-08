import { ElementRef, useEffect, useRef, useState } from "react";

/**
 * Copy to console as test: const a = document.createElement("div"); a.innerHTML = 11, document.getElementById("root").appendChild(a)
 */

/**
 * Injection opportunities
 * - direct to console attacks for users
 * - links (params)
 * - installed packages and 3rd party integrations & plugins
 * - GTM (marketers)
 * - storage injection -> bad validation on backend alongside backend driven DOM construction (example)
 * - example: "><script>alert(1);</script>"@example.org valid email by RFC 5321
 */
export default function XSSPage() {
  const rootRef = useRef<ElementRef<"div">>(null);
  const [stateScript] = useState(`<script>console.log("XSS Script")</script>`);

  // Note by html spec: innerHtml injections dont run scripts, but there are workarounds
  useEffect(() => {
    /**
     * Case 4
     * Direct injection
     */
    const script = document.createElement("script");
    script.innerHTML = "console.log('XSS script dyanmic insert')";
    rootRef.current?.appendChild(script);

    /**
     * Case 5
     * Url via QP
     * - use query=<script>console.log(%27Hacked via Query Params!%27)</script> as QP
     */
    const params = new URLSearchParams(window.location.search);

    if (params.get("query")) {
      const node = document
        .createRange()
        .createContextualFragment(params.get("query")!);
      rootRef.current?.appendChild(node);
    }
  }, []);

  return (
    <main
      id="root"
      ref={rootRef}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <h1>XSS Dom Based - Native protection</h1>

      {/* Case 1 - Direct script */}
      <section>
        <h2>dangerouslySetInnerHTML script</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: `<script>console.log("dangerouslySetInnerHTML Script")</script>`,
          }}
        ></div>
      </section>

      {/* Case 2 - Direct image */}
      <section>
        <h2>dangerouslySetInnerHTML image</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: `<img src="none.png" onerror="console.log('dangerouslySetInnerHTML Image onerror')" />`,
          }}
        ></div>
      </section>

      {/* Case 3 - Failure; JSX react protection*/}
      <section>
        <h2>state to dom</h2>

        <div>{stateScript}</div>
      </section>
    </main>
  );
}
