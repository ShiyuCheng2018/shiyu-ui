import React, {
    createContext,
    FunctionComponentElement,
    useContext,
    useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
    | "zoom-in-top"
    | "zoom-in-left"
    | "zoom-in-right"
    | "zoom-in-bottom";

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    wrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = (props) => {
    const { classNames, children, animation, wrapper, ...restProps } = props;

    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    );
};

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};

export default Transition;
