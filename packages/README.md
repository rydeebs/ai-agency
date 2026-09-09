# Shared packages

Packages are for code used by at least two applications. A package should have one clear responsibility and must not import from an app.

When a package becomes real, give it a scoped name such as `@newrevgen/contracts`, its own `package.json`, tests, and a public entry point. Avoid a generic catch-all utilities package.
