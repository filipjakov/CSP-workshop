# Content Security Policy workshop

## Description

Kind of attacks per page. Mitigation via uncommenting certain rules in the document.

Kind of attacks:

1. XSS (`script-src`)
2. Clickjacking (`frame-ancestors`)

## Resources

- https://portswigger.net/web-security/cross-site-scripting/content-security-policy
- https://vercel.com/guides/understanding-xss-attacks
- https://csp-evaluator.withgoogle.com/
- https://observatory.mozilla.org/
- https://content-security-policy.com/
- https://csplite.com/
- https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html

## Agenda

1. Types on injections
2. How to prevent injections
3. Once injected, how to minimize damage

## Cases

1. XSS

- third party almost always a problem
- injection via scripts in console -> directly to users
- injection via GTM -> credentials steal or similiar
- injection via installed libs -> corrupted releases
- injection oportunity via backend (server components) driven scripting/dom construction -> bad validation
