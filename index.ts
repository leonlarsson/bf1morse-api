import locations from "./locations";

export default {
    fetch(request: Request): Response {
        const params = new URL(request.url).searchParams;
        const input = params.get("input") ?? "";
        const stage = params.get("stage") ?? null;
        const inputType = (input.startsWith(".") || input.startsWith("-")) ? "morse" : "text";

        const matches = locations.filter(location => location.type === inputType && (location.stage == stage || stage === null) && location.cipher.toLowerCase().includes(input.toLowerCase().trim()));
        if (!matches.length) return new Response("No results.", { status: 404 });
        return Response.json(matches);
    }
};