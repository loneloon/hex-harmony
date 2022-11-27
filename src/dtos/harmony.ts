export interface HarmonyRule {
    // Number of colors for harmony
    colors: number;
    steps: {
        direction: string;
        sector: number;
    }[]
}
