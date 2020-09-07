import React from "react";
import "../src/styles/index.css";
import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const styles: React.CSSProperties = {
    textAlign: "center",
};

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

const wrapperStyle: React.CSSProperties = {
    padding: "20px 40px",
};

const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>
        <h3>Presentation</h3>
        {storyFn()}
    </div>
);

export const parameters = {
    info: {
        inline: true,
        header: false,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
};

addDecorator(CenterDecorator);
addDecorator(storyWrapper);
// @ts-ignore
addDecorator(withInfo);

const loaderFn = () => {
    const allExports = [require("../src/welcome.stories.tsx")];
    const req = require.context("../src/components", true, /\.stories\.tsx$/);
    req.keys().forEach((fname) => allExports.push(req(fname)));
    return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
