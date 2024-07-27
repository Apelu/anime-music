/**
 * Music Page:
 * -Retrieves Music Data from API
 * -Displays in Video view or Audio view
 */

function MusicPage() {
    return null;
}

export default MusicPage;
/*
// import { animeFeatures } from "@features/anime";
// import { useState } from "react";

// export enum FeatureStatus {
//     Planned = "Planned",
//     PlannedNext = "Planned Next",
//     InProgress = "In Progress",
//     Completed = "Completed",
//     Canceled = "Canceled",
// }

// export interface Feature {
//     title: string;
//     description: string;
//     status?: FeatureStatus;
//     subfeatures?: Feature[];
// }
// // title: "Features",
// // description:
// //     "A list of all the features that are planned, in progress, completed, or canceled.",
// const allFeatures: Feature[] = [
//     {
//         title: "Anime",
//         description: "All the features related to anime.",
//         subfeatures: animeFeatures,
//     },
// ];

import { animeFeatures } from "@features/anime";
import { useState } from "react";
import { Table, Collapse } from "react-bootstrap";

export enum FeatureStatus {
    Planned = "Planned",
    PlannedNext = "Planned Next",
    InProgress = "In Progress",
    Completed = "Completed",
    Canceled = "Canceled",
}

export interface Feature {
    title: string;
    description: string;
    status?: FeatureStatus;
    subfeatures?: Feature[];
}

const allFeatures: Feature[] = [
    {
        title: "Features",
        description:
            "A list of all the features that are planned, in progress, completed, or canceled.",
        status: FeatureStatus.Completed,
        subfeatures: [
            {
                title: "Anime",
                description: "All the features related to anime.",
                subfeatures: animeFeatures,
            },
            {
                title: "Subfeature 1",
                description: "This is a subfeature.",
                subfeatures: [
                    {
                        title: "Subsubfeature 1",
                        description: "This is a subsubfeature.",
                    },
                    {
                        title: "Subsubfeature 2",
                        description: "This is another subsubfeature.",
                    },
                ],
            },
        ],
    },
].map(feature => {
    if (feature.subfeatures && feature.subfeatures.length > 0) {
        return {
            ...feature,
            subfeatures: feature.subfeatures.map(subfeature => {
                if (
                    subfeature.subfeatures &&
                    subfeature.subfeatures.length > 0
                ) {
                    return {
                        ...subfeature,
                        subfeatures: subfeature.subfeatures.map(
                            subsubfeature => {
                                // Modify subsubfeature here if needed
                                return subsubfeature;
                            }
                        ),
                    };
                } else {
                    return subfeature;
                }
            }),
        };
    } else {
        return feature;
    }
});

function FeaturesPage() {
    const [open, setOpen] = useState<string[]>([]);

    const toggleCollapse = (featureTitle: string) => {
        if (open.includes(featureTitle)) {
            setOpen(open.filter(title => title !== featureTitle));
        } else {
            setOpen([...open, featureTitle]);
        }
    };

    const renderFeature = (feature: Feature) => {
        const isPlannedNext = feature.status === FeatureStatus.PlannedNext;
        const isInProgress = feature.status === FeatureStatus.InProgress;
        const isCompleted = feature.status === FeatureStatus.Completed;
        const isCanceled = feature.status === FeatureStatus.Canceled;

        return (
            <div key={feature.title}>
                <h3
                    style={{
                        color: isPlannedNext
                            ? "blue"
                            : isInProgress
                            ? "orange"
                            : isCompleted
                            ? "green"
                            : isCanceled
                            ? "red"
                            : "black",
                    }}
                >
                    {feature.title}
                </h3>
                <p>{feature.description}</p>
                {feature.subfeatures && (
                    <Collapse in={open.includes(feature.title)}>
                        <div>
                            <Table>
                                <tbody>
                                    {feature.subfeatures
                                        .sort((a, b) =>
                                            a.title.localeCompare(b.title)
                                        )
                                        .map(subfeature => (
                                            <tr key={subfeature.title}>
                                                <td>{subfeature.title}</td>
                                                <td>
                                                    {subfeature.description}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <div>
            {allFeatures
                .sort((a, b) => {
                    if (a.status === FeatureStatus.PlannedNext) {
                        return -1;
                    } else if (b.status === FeatureStatus.PlannedNext) {
                        return 1;
                    } else if (a.status === FeatureStatus.InProgress) {
                        return -1;
                    } else if (b.status === FeatureStatus.InProgress) {
                        return 1;
                    } else {
                        return a.title.localeCompare(b.title);
                    }
                })
                .map(feature => (
                    <div key={feature.title}>
                        <h2
                            style={{
                                color:
                                    feature.status === FeatureStatus.Planned ||
                                    feature.status === FeatureStatus.PlannedNext
                                        ? "blue"
                                        : feature.status ===
                                          FeatureStatus.InProgress
                                        ? "orange"
                                        : feature.status ===
                                          FeatureStatus.Completed
                                        ? "green"
                                        : feature.status ===
                                          FeatureStatus.Canceled
                                        ? "red"
                                        : "black",
                            }}
                        >
                            {feature.title}
                        </h2>
                        <p>{feature.description}</p>
                        {feature.status && <p>Status: {feature.status}</p>}
                        {feature.subfeatures ? (
                            <button
                                onClick={() => toggleCollapse(feature.title)}
                            >
                                {open.includes(feature.title) ? "Hide" : "Show"}{" "}
                                Subfeatures
                            </button>
                        ) : null}
                        <hr />
                        {feature.subfeatures && (
                            <Collapse in={open.includes(feature.title)}>
                                <div style={{ marginLeft: "20px" }}>
                                    <Table>
                                        <tbody>
                                            {feature.subfeatures
                                                .sort((a, b) =>
                                                    a.title.localeCompare(
                                                        b.title
                                                    )
                                                )
                                                .map(subfeature => (
                                                    <tr key={subfeature.title}>
                                                        <td>
                                                            {subfeature.title}
                                                        </td>
                                                        <td>
                                                            {
                                                                subfeature.description
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Collapse>
                        )}
                    </div>
                ))}
        </div>
    );

    return (
        <div>
            {allFeatures
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(feature => (
                    <div key={feature.title}>
                        <h2>{feature.title}</h2>
                        {feature.subfeatures ? (
                            <button
                                onClick={() => toggleCollapse(feature.title)}
                            >
                                {open.includes(feature.title) ? "Hide" : "Show"}{" "}
                                Subfeatures
                            </button>
                        ) : null}
                        <hr />
                    </div>
                ))}
        </div>
    );
}

export default FeaturesPage;

*/
