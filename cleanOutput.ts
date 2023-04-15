import locationData from "./locations";

export default (matches: string[], inputType: "morse" | "text"): string[] => {

    let matchesString = matches.join("\n");
    const maps = Object.keys(locationData.maps);
    const locations = ["location_1", "location_2", "location_3"];
    const stages = ["1", "2", "3", "4", "5", "6", "7", "8"];

    // For each map, stage (1-8), and location, clean the output
    maps.forEach(map => {
        if (map === "giantsshadow") return;
        locations.forEach(location => {
            stages.forEach(stage => {
                matchesString = matchesString.replace(locationData.maps[map][location][`cipher_${inputType}${stage}`], `(Stage ${stage}) ${locationData.maps[map][location].plain_text_spaces}: ${locationData.maps[map].map_name} | ${locationData.maps[map][location].map_url}`);
            })
        });
    });

    // For stage 9, which only has location_1
    matchesString = matchesString.replace(locationData.maps.giantsshadow.location_1[`cipher_${inputType}9`], `(Stage 9) ${locationData.maps.giantsshadow.location_1.plain_text_spaces}: ${locationData.maps.giantsshadow.map_name} | ${locationData.maps.giantsshadow.map_url}`);

    return matchesString.split("\n");
}