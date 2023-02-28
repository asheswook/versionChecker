import type { Request as req, ExecutionContext } from "@cloudflare/workers-types/experimental";

export default {
    async fetch(request: req, env: any, ctx: ExecutionContext) {
        try {
            const { pathname } = new URL(request.url);

            if (pathname === "/check/uSAINT") return uSAINTChecker(request, env.GITHUB_TOKEN);

            return new Response("Not found", { status: 404 });
        } catch (e: any) {
            return new Response(e.stack, { status: 500 });
        }
    },
};

const uSAINTChecker = async (request: req, token: string) => {
    const resp = await fetch("https://api.github.com/repos/asheswook/uSAINT-macOS/releases/latest", {
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "User-Agent": "uSAINT-macOS",
        },
    });

    const results = await gatherResponse(resp);

    const data = {
        latestVersion: JSON.parse(results).tag_name,
    };

    const json = JSON.stringify(data, null, 2);

    return new Response(json, {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
};

const gatherResponse = async (response: Response) => {
    const { headers } = response;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
    }
    return response.text();
};
