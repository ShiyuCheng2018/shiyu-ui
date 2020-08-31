import React from "react";
import "./App.css";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

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
            </header>
        </div>
    );
}

export default App;
