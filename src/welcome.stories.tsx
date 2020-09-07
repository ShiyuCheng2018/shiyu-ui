import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
    "welcome",
    () => {
        return (
            <>
                <h1>Welcome to shiyu-ui React components library</h1>
                <p>
                    shiyu’s UI React components for faster and easier web
                    development
                </p>
                <h3>Install now: </h3>
                <code>npm install shiyu-ui --save</code>
            </>
        );
    },
    { info: { disable: true } }
);
