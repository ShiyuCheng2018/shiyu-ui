import React, { FC, useState, ChangeEvent } from "react";
import Input, { InputProps } from "../Input/input";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (str: string) => string[];
    onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, ...restProps } = props;

    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    console.log(suggestions);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            const result = fetchSuggestions(value);
            setSuggestions(result);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (item: string) => {
        setInputValue(item);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };

    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={"shiyu-auto-complete"}>
            <Input value={inputValue} onChange={handleChange} {...restProps} />
            {suggestions.length > 0 && generateDropdown()}
        </div>
    );
};
