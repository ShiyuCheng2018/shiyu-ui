import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete, DataSourceType } from "./autoComplete";

const SimpleComplete = () => {
    const Lakers = [
        "bradley",
        "pope",
        "caruso",
        "cook",
        "cousins",
        "james",
        "AD",
        "green",
        "howard",
        "McGee",
        "rando",
        "Kuzma",
    ];

    const handleFetch = (query: string) => {
        return Lakers.filter((name) => name.includes(query)).map((name) => ({
            value: name,
        }));
    };

    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action("selected")}
        />
    );
};

const renderOption = () => {
    interface LakersPlayerProps {
        value: string;
        number: number;
    }

    const LakersWithNumber = [
        { value: "bradley", number: 11 },
        { value: "pope", number: 1 },
        { value: "caruso", number: 4 },
        { value: "cook", number: 2 },
        { value: "cousins", number: 15 },
        { value: "james", number: 23 },
        { value: "AD", number: 3 },
        { value: "green", number: 14 },
        { value: "howard", number: 39 },
        { value: "kuzma", number: 0 },
    ];
    const handleFetch = (query: string) => {
        return LakersWithNumber.filter((player) =>
            player.value.includes(query)
        );
    };
    const renderOption = (item: DataSourceType<LakersPlayerProps>) => {
        return (
            <>
                <h5>Name: {item.value}</h5>
                <p>Number: {item.number}</p>
            </>
        );
    };
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action("selected")}
            renderOption={renderOption}
        />
    );
};

storiesOf("AutoComplete Component", module)
    .add("AddComplete", SimpleComplete)
    .add("RenderOption", renderOption);
