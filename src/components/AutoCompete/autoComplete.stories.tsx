import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete } from "./autoComplete";

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
        return Lakers.filter((name) => name.includes(query));
    };

    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action("selected")}
        />
    );
};

storiesOf("AutoComplete Component", module).add("AddComplete", SimpleComplete);
