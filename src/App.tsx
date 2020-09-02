import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import MenuItem from "./components/Menu/menuItem";
import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu mode={"vertical"}>
                    <MenuItem>active</MenuItem>
                    <MenuItem disabled>disabled</MenuItem>
                    <MenuItem>next</MenuItem>
                    <SubMenu title={"Dropdown"}>
                        <MenuItem>Dropdown 1</MenuItem>
                        <MenuItem>Dropdown 2</MenuItem>
                        <MenuItem>Dropdown 3</MenuItem>
                    </SubMenu>
                </Menu>
            </header>
        </div>
    );
}

export default App;
