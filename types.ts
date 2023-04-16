export type JMESPathItem = {
    mapName: string;
    mapUrl: string;
    locations: {
        mapUrl: string;
        plainText: string;
        cipherMorse1: string;
        cipherText1: string;
        cipherMorse2: string;
        cipherText2: string;
        cipherMorse3: string;
        cipherText3: string;
        cipherMorse4: string;
        cipherText4: string;
        cipherMorse5: string;
        cipherText5: string;
        cipherMorse6: string;
        cipherText6: string;
        cipherMorse7: string;
        cipherText7: string;
        cipherMorse8: string;
        cipherText8: string;
        cipherMorse9: string;
        cipherText9: string;
    }[]
};

export type Location = {
    mapName: string;
    mapUrl: string;
    locationUrl: string;
    plainText: string;
    stage: string | number;
    type: "morse" | "text"
    cipher: string;
};