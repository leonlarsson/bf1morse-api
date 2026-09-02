type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type CipherKey = `cipher${"Morse" | "Text"}${Stage}`;

export type RawLocation = {
    mapUrl: string;
    plainText: string;
} & Partial<Record<CipherKey, string>>;

export type RawMap = {
    mapName: string;
    mapUrl: string;
    location1: RawLocation;
    location2?: RawLocation;
    location3?: RawLocation;
};

export type Location = {
    mapName: string;
    mapUrl: string;
    locationUrl: string;
    plainText: string;
    stage: number;
    type: "morse" | "text";
    cipher: string;
};
