import { search } from "@metrichor/jmespath";
import locations from "./locations";
import cleanOutput from "./cleanOutput";

export default {
    async fetch(request: Request): Promise<Response> {
        const params = new URL(request.url).searchParams;
        const input = params.get("input") ?? "";
        const stage = params.get("stage") ?? null;
        const inputType = (input.startsWith(".") || input.startsWith("-")) ? "morse" : "text";

        const locationsString: string = stage ? (search(locations, `*.*.*.cipher_${inputType}${stage}`) as string[]).flat(2).join("\n")
            : ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(stage => (search(locations, `*.*.*.cipher_${inputType}${stage}`) as string[]).flat(2).join("\n")).join("\n");

        const initialRegex = !input ? new RegExp("(?:(.*..*))", "gi") : new RegExp("(?:(.*" + input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ".*))", "gi");
        const matchesArray = locationsString.match(initialRegex);
        if (!matchesArray) return new Response("No results.", { status: 404 });
        return Response.json(cleanOutput(matchesArray, inputType));
    }
};