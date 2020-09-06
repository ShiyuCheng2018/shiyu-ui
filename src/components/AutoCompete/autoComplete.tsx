import React, {
    FC,
    useState,
    ChangeEvent,
    KeyboardEvent,
    ReactElement,
    useEffect,
    useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

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
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const debounceValue = useDebounce(inputValue, 300);

    useClickOutside(componentRef, () => {
        setSuggestions([]);
    });

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const result = fetchSuggestions(debounceValue as string);
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
        setHighlightIndex(-1);
    }, [debounceValue]);

    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };

    console.log(suggestions);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };

    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    const cnames = classNames("suggestion-item", {
                        "item-highlighted": index === highlightIndex,
                    });
                    return (
                        <li
                            key={index}
                            className={cnames}
                            onClick={() => handleSelect(item)}
                        >
                            {renderTemplate(item)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className={"shiyu-auto-complete"} ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {loading && (
                <ul>
                    <Icon icon={"spinner"} spin />
                </ul>
            )}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    );
};
