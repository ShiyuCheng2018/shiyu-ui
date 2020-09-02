import React from "react";
import {
    fireEvent,
    render,
    RenderResult,
    cleanup,
    wait,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import registerFaIcons from "../../registerFaIcons";
registerFaIcons();

const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: "test",
};

const testVerProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical",
};

const testVerWithDefaultOpenProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical",
    defaultOpenSubMenus: ["3"],
};

const getMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>next</MenuItem>
            <SubMenu title={"dropdown"}>
                <MenuItem>dropdown_1</MenuItem>
                <MenuItem>dropdown_2</MenuItem>
                <MenuItem>dropdown_3</MenuItem>
            </SubMenu>
            <SubMenu title={"dropdown_new"}>
                <MenuItem>dropdown_4</MenuItem>
                <MenuItem>dropdown_5</MenuItem>
                <MenuItem>dropdown_6</MenuItem>
            </SubMenu>
        </Menu>
    );
};

let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

const createStyleFile = () => {
    const cssFile: string = `
        .shiyu-submenu {
            display: none;
        }
        .shiyu-submenu.menu-opened{
            display: block;
        }
    `;
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssFile;
    return style;
};

describe("test Menu and MenuItem component", () => {
    beforeEach(() => {
        wrapper = render(getMenu(testProps));
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId("test-menu");
        activeElement = wrapper.getByText("active");
        disabledElement = wrapper.getByText("disabled");
    });
    it("should render correct Menu and MenuItem based on default props", () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass("shiyu-menu test");
        expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
        expect(activeElement).toHaveClass("menu-item is-active");
        expect(disabledElement).toHaveClass("menu-item is-disabled");
    });
    it("click items should change active and call the right callback", () => {
        const clickItem = wrapper.getByText("next");
        fireEvent.click(clickItem);
        expect(clickItem).toHaveClass("is-active");
        expect(activeElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).toHaveBeenCalledWith("2");
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
    });
    it("should render vertical mode when mode is set to vertical", () => {
        cleanup();
        const wrapper = render(getMenu(testVerProps));
        const menuElement = wrapper.getByTestId("test-menu");
        expect(menuElement).toHaveClass("menu-vertical");
    });
    it("should display dropdown items when hover on subMenu", async () => {
        expect(wrapper.queryByText("dropdown_1")).toEqual(null);
        const dropdownElement = wrapper.getByText("dropdown");
        fireEvent.mouseEnter(dropdownElement);
        await wait(
            () => {
                expect(wrapper.queryByText("dropdown_1")).toBeVisible();
            },
            { timeout: 200 }
        );
        fireEvent.click(wrapper.getByText("dropdown_1"));
        expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
        fireEvent.mouseLeave(dropdownElement);
        await wait(() => {
            expect(wrapper.queryByText("dropdown_1")).toEqual(null);
        });
    });
    it("should display submenu when click submenu title in vertical mode", async () => {
        cleanup();
        const wrapper = render(getMenu(testVerProps));
        wrapper.container.append(createStyleFile());
        expect(wrapper.queryByText("dropdown_1")).toEqual(null);
        expect(wrapper.queryByText("dropdown_5")).toEqual(null);
        const dropdownElement = wrapper.getByText("dropdown");
        fireEvent.click(dropdownElement);
        await wait(
            () => {
                expect(wrapper.queryByText("dropdown_1")).toBeVisible();
            },
            { timeout: 310 }
        );
        expect(wrapper.queryByText("dropdown_5")).toEqual(null);
        fireEvent.click(dropdownElement);
        await wait(
            () => {
                expect(wrapper.queryByText("dropdown_1")).toEqual(null);
            },
            { timeout: 310 }
        );
        expect(wrapper.queryByText("dropdown_5")).toEqual(null);
    });
    it("should display default open submenu when defaultOpenSubMenus sat", () => {
        cleanup();
        const wrapper = render(getMenu(testVerWithDefaultOpenProps));
        wrapper.container.append(createStyleFile());
        expect(wrapper.queryByText("dropdown_1")).toBeVisible();
    });
});
