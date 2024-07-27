export enum FeatureStatus {
    Planned = "Planned",
    PlannedNext = "Planned Next",
    InProgress = "In Progress",
    Completed = "Completed",
    Canceled = "Canceled",
}

export const FeatureStatusColors = {
    [FeatureStatus.Planned]: "primary",
    [FeatureStatus.PlannedNext]: "secondary",
    [FeatureStatus.InProgress]: "info",
    [FeatureStatus.Completed]: "success",
    [FeatureStatus.Canceled]: "dark",
};

export interface Feature {
    id?: string;
    title: string;
    description: string;
    status?: FeatureStatus;
    subfeatures?: Feature[];
}

export const colorLevels = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
];
