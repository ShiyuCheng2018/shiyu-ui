import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, wait } from "@testing-library/react";
import { AutoComplete, AutoCompleteProps } from "./autoComplete";

config.disabled = true;

const testArray = [
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

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => {
        return testArray.filter((item) => item.value);
    },
    onSelect: jest.fn(),
    placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps} />);
        inputNode = wrapper.getByPlaceholderText(
            "auto-complete"
        ) as HTMLInputElement;
    });
    it("test basic AutoComplete behavior", async () => {
        fireEvent.change(inputNode, { target: { value: "c" } });
        await wait(() => {
            expect(wrapper.queryByText("caruso")).toBeInTheDocument();
            expect(wrapper.queryByText("cook")).toBeInTheDocument();
            expect(wrapper.queryByText("cousins")).toBeInTheDocument();
        });
        fireEvent.click(wrapper.getByText("cook"));
        expect(testProps.onSelect).toHaveBeenCalledWith({
            value: "cook",
            number: 2,
        });
        expect(wrapper.queryByText("caruso")).not.toBeInTheDocument();
        expect(inputNode.value).toBe("cook");
    });
    it("should provide keyboard support", async () => {
        fireEvent.change(inputNode, { target: { value: "d" } });
        await wait(() => {
            expect(wrapper.queryByText("bradley")).toBeInTheDocument();
            expect(wrapper.queryByText("howard")).toBeInTheDocument();
        });

        const firstResult = wrapper.queryByText("bradley");
        const secondResult = wrapper.queryByText("howard");
        expect(firstResult).not.toHaveClass("is-active");
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).toHaveClass("is-active");
        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).not.toHaveClass("is-active");
        // expect(secondResult).toHaveClass('is-active')
        fireEvent.keyDown(inputNode, { keyCode: 38 });
        expect(secondResult).not.toHaveClass("is-active");
        expect(firstResult).toHaveClass("is-active");
        fireEvent.keyDown(inputNode, { keyCode: 13 });
        expect(testProps.onSelect).toHaveBeenCalledWith({
            value: "bradley",
            number: 11,
        });
        expect(wrapper.queryByText("howard")).not.toBeInTheDocument();
    });
    it("click outside should hide the dropdown", async () => {
        fireEvent.change(inputNode, { target: { value: "m" } });
        await wait(() => {
            expect(wrapper.queryByText("james")).toBeInTheDocument();
            expect(wrapper.queryByText("kuzma")).toBeInTheDocument();
        });
        fireEvent.click(document);
        expect(wrapper.queryByText("james")).not.toBeInTheDocument();
    });
    it("renderOption should generate the right template", () => {});
    it("async fetchSuggestions should works fine", () => {});
});
