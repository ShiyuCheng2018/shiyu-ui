import React, { useState } from "react";
import MenuItem from "./components/Menu/menuItem";
import Menu from "./components/Menu/menu";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import registerFaIcons from "./registerFaIcons";
import Button from "./components/Button/button";
import Transition from "./components/Transition/transition";
registerFaIcons();

function App() {
    const [display, setDisplay] = useState(false);
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
                <Button
                    size={"lg"}
                    onClick={() => {
                        setDisplay(!display);
                    }}
                >
                    Toggle
                </Button>
                <Transition
                    in={display}
                    timeout={300}
                    animation={"zoom-in-left"}
                >
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Blanditiis, debitis dignissimos facilis hic
                            itaque magnam magni minima quam sapiente, sed sint
                            ullam. Animi cumque explicabo incidunt neque nihil
                            quae ut. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Delectus dolore, ex harum minima
                            nemo quod rem vel! Dolore ducimus, eaque harum
                            perferendis praesentium reprehenderit. Amet delectus
                            ducimus magni nesciunt tempore?
                        </p>
                    </div>
                </Transition>
            </header>
        </div>
    );
}

export default App;
