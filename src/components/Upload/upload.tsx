import React, { FC, useRef } from "react";
import axios from "axios";
import Button from "../Button/button";

export interface UploadProps {
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
}

export const Upload: FC<UploadProps> = (props) => {
    const { action, onProgress, onSuccess, onError } = props;
    return (
        <div className={"shiyu-upload-component"}>
            <Button btnType={"primary"}>Upload File</Button>
        </div>
    );
};
