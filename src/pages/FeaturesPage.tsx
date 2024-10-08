import { topLevelAnimeFeature } from "@features/anime";
import { topLevelAniListFeatures } from "@features/api/anilist";
import { topLevelBackgroundFeatures } from "@features/background";
import { topLevelControllerFeatures } from "@features/controller";
import {
    Feature,
    colorLevels,
    FeatureStatus,
    FeatureStatusColors,
} from "@features/documentation/constants";
import { topLevelMusicFeatures } from "@features/music";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";

const data: {
    title: string;
    description: string;
    features: Feature[];
} = {
    title: "Features",
    description:
        "A list of all the features that have been implemented in this project.",
    features: [
        topLevelAnimeFeature,
        topLevelBackgroundFeatures,
        topLevelAniListFeatures,
        topLevelMusicFeatures,
        topLevelControllerFeatures,
    ],
};

function FeaturePage() {
    const level = 0;

    return (
        <Container className="mb-5">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <DisplayFeatures
                features={data.features}
                level={level}
                parentID={"0-Features"}
                alwaysOpen={true}
            />
        </Container>
    );
}

function isValidLevel(level: number) {
    return level >= 0 && level < colorLevels.length;
}

const statusValues = {
    [FeatureStatus.InProgress]: 0,
    [FeatureStatus.PlannedNext]: 1,
    [FeatureStatus.Planned]: 2,
    [FeatureStatus.Completed]: 3,
    [FeatureStatus.Canceled]: 4,
};

function DisplayFeatures({
    features,
    level,
    parentID,
    alwaysOpen = false,
}: {
    features: Feature[];
    level: number;
    parentID: string;
    alwaysOpen?: boolean;
}) {
    if (!isValidLevel(level)) return null;

    return (
        <Table
            id={`${parentID}`}
            className={`collapse ${alwaysOpen ? "show" : "ms-3"} m-0  bg-${
                colorLevels[level]
            }`}
        >
            {features
                .sort(function (a, b) {
                    var difference =
                        statusValues[a.status || FeatureStatus.Planned] -
                        statusValues[b.status || FeatureStatus.Planned];
                    return difference === 0
                        ? a.title.localeCompare(b.title)
                        : difference;

                    return a.title.localeCompare(b.title);
                })
                .map(feature => {
                    if (!feature.status) {
                        feature.status = FeatureStatus.Planned;
                    }
                    return (
                        <>
                            <Table className={`m-0`}>
                                <tbody>
                                    <tr>
                                        <td className="d-flex align-items-center">
                                            <div>
                                                <ToggleFeatureButton
                                                    target={`#${level}-${feature.title}`.replace(
                                                        /\s/g,
                                                        ""
                                                    )}
                                                    className={`m-0 ms-2 me-3 ${
                                                        feature.subfeatures &&
                                                        feature.subfeatures
                                                            .length > 0
                                                            ? ""
                                                            : "invisible"
                                                    }`}
                                                />
                                            </div>

                                            <div className="d-flex flex-column">
                                                <strong>
                                                    {feature.title}
                                                    {feature.status && (
                                                        <Badge
                                                            className={`ms-2 bg-${
                                                                FeatureStatusColors[
                                                                    feature
                                                                        .status
                                                                ]
                                                            }`}
                                                        >
                                                            {feature.status}
                                                        </Badge>
                                                    )}
                                                </strong>
                                                <div>{feature.description}</div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            {feature.subfeatures && (
                                <DisplayFeatures
                                    features={feature.subfeatures}
                                    level={level + 1}
                                    parentID={`${level}-${feature.title}`.replace(
                                        /\s/g,
                                        ""
                                    )}
                                />
                            )}
                        </>
                    );
                })}
        </Table>
    );
}

function ToggleFeatureButton({
    target,
    className,
}: {
    target: string;
    className: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <FontAwesomeIcon
            size="lg"
            data-bs-toggle="collapse"
            data-bs-target={target}
            icon={open ? faSquareMinus : faSquarePlus}
            onClick={() => setOpen(!open)}
            className={className}
        />
    );
}

export default FeaturePage;
