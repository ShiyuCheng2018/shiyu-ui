import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import MenuItem from "./components/Menu/menuItem";
import Menu from "./components/Menu/menu";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button>Hello</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
                    Hello
                </Button>
                <Button
                    btnType={ButtonType.Link}
                    href={"http://www.google.com"}
                >
                    Google
                </Button>
                <Menu>
                    <MenuItem index={0}>active</MenuItem>
                    <MenuItem disabled index={1}>
                        disabled
                    </MenuItem>
                    <MenuItem index={2}>next</MenuItem>
                </Menu>
            </header>
        </div>
    );
}

export default App;
