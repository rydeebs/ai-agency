import { getMarkdownPage, markdownNotFound } from "@/content/agent/markdown";

interface MarkdownRouteProps {
  params: Promise<{ slug?: string[] }>;
}

function responseHeaders(pathname: string): HeadersInit {
  return {
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    "Content-Type": "text/markdown; charset=utf-8",
    Link: `<https://newrevgen.com${pathname}>; rel="canonical", </llms.txt>; rel="describedby"; type="text/markdown"`,
    Vary: "Accept",
  };
}

export async function GET(
  _request: Request,
  { params }: MarkdownRouteProps,
): Promise<Response> {
  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const markdown = getMarkdownPage(pathname);

  if (!markdown) {
    return new Response(markdownNotFound, {
      status: 404,
      headers: {
        ...responseHeaders(pathname),
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  return new Response(markdown, { headers: responseHeaders(pathname) });
}
