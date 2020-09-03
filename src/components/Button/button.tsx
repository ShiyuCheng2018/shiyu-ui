import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonSizes = "lg" | "sm";
type ButtonTypes = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
    /** set button's class names*/
    className?: string;
    /**set button's usage*/
    disabled?: boolean;
    /**set button's size*/
    size?: ButtonSizes;
    /**set button's type*/
    btnType?: ButtonTypes;
    children: React.ReactNode;
    /**set the link*/
    href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props;

    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === "link" && disabled,
    });

    if (btnType === "link" && href) {
        return (
            <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        );
    }
};

Button.defaultProps = {
    disabled: false,
    btnType: "default",
};

export default Button;
