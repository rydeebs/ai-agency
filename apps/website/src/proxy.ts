import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  appendVary,
  preferredRepresentation,
} from "@/lib/http/content-negotiation";

function canonicalPath(pathname: string): string {
  if (pathname === "/index.md") return "/";
  if (pathname.endsWith(".md")) return pathname.slice(0, -3) || "/";
  return pathname;
}

function markdownAlternate(pathname: string): string {
  return pathname === "/" ? "/index.md" : `${pathname.replace(/\/$/, "")}.md`;
}

function discoveryLinks(pathname: string): string {
  return `<${markdownAlternate(pathname)}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/markdown"`;
}

function markdownRewrite(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = `/api/markdown${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.rewrite(url);
  appendVary(response.headers, "Accept");
  response.headers.set("Link", discoveryLinks(pathname));
  return response;
}

export function proxy(request: NextRequest): Response {
  const pathname = request.nextUrl.pathname;
  const methodCanNegotiate = request.method === "GET" || request.method === "HEAD";

  if (!methodCanNegotiate) {
    const response = NextResponse.next();
    appendVary(response.headers, "Accept");
    return response;
  }

  if (pathname.endsWith(".md")) {
    return markdownRewrite(request, canonicalPath(pathname));
  }

  const acceptHeader = request.headers.get("accept");
  const representation = preferredRepresentation(acceptHeader);

  if (representation === "text/markdown") {
    return markdownRewrite(request, pathname);
  }

  if (representation === null && acceptHeader) {
    return new Response(
      "Not Acceptable\n\nAvailable representations: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Link: `</llms.txt>; rel="describedby"; type="text/markdown"`,
          Vary: "Accept",
        },
      },
    );
  }

  const response = NextResponse.next();
  appendVary(response.headers, "Accept");
  response.headers.set("Link", discoveryLinks(pathname));
  return response;
}

export const config = {
  matcher: [
    "/((?!api(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|abacusbuilders(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|llms\\.txt$|.*\\.(?:css|js|mjs|map|png|jpe?g|webp|gif|svg|ico|woff2?|mp4|avif|html)$).*)",
  ],
};
