import { Feature, FeatureStatus } from "@features/documentation/constants";
import { BackgroundFeatures } from "./Background";

export const topLevelBackgroundFeatures: Feature = {
    title: "Background",
    description: "All the features related to the page background.",
    status: FeatureStatus.InProgress,
    subfeatures: [...BackgroundFeatures],
};
