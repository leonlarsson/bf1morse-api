import locations from "./locations";
import { fuzzyScore } from "./search";

const FUZZY_THRESHOLD = 0.45;

export default {
    fetch(request: Request): Response {
        const params = new URL(request.url).searchParams;
        const input = (params.get("input") ?? "").trim();
        const stage = params.get("stage");
        const fuzzy = params.get("fuzzy") === "true";
        const inputType = (input.startsWith(".") || input.startsWith("-")) ? "morse" : "text";

        // Locations of the right type and stage, before any matching on the input
        const eligible = locations.filter(location => location.type === inputType && (stage === null || location.stage === Number(stage)));

        // Get matches — fuzzy scored when enabled, exact substring when disabled
        const scoredMatches = fuzzy
            ? eligible
                .map(location => ({ location, score: fuzzyScore(input, location.cipher) }))
                .filter(({ score }) => score >= FUZZY_THRESHOLD)
                .sort((a, b) => b.score - a.score)
            : eligible
                .filter(location => location.cipher.toLowerCase().includes(input.toLowerCase()))
                .map(location => ({ location, score: 1.0 }));

        // If any result is an exact match, suppress partial/fuzzy results
        const hasExact = scoredMatches.some(({ score }) => score === 1.0);
        const matches = (hasExact ? scoredMatches.filter(({ score }) => score === 1.0) : scoredMatches).map(({ location }) => location);

        if (!matches.length) return new Response("No results.", { status: 404 });
        return Response.json(matches);
    }
};
