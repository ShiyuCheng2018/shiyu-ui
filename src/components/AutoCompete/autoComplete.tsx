import React, { FC, useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = any> = T & DataSourceObject;

export interface AutoCompleteProps<DataSourceType>
    extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (
        str: string
    ) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps<DataSourceType>> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;

    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);

    console.log(suggestions);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            const result = fetchSuggestions(value);
            if (result instanceof Promise) {
                setLoading(true);
                result.then((data) => {
                    setLoading(false);
                    setSuggestions(data);
                });
            } else {
                setSuggestions(result);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };

    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={"shiyu-auto-complete"}>
            <Input value={inputValue} onChange={handleChange} {...restProps} />
            {loading && (
                <ul>
                    <Icon icon={"spinner"} spin />
                </ul>
            )}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    );
};
