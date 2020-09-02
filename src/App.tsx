import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./components/Menu/menuItem";
import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
library.add(fas);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Menu>
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
