import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
    onFile: (files: FileList) => void;

}

export const Dragger: FC<DraggerProps> = (props) =>{
    const {onFile, children} = props;
    const [dragOver, setDragover] = useState(false);
    const nclass = classNames('shiyu-uploader-dragger', {
        'is-dragover': dragOver
    })

    const handleDrop = (e: DragEvent<HTMLElement>)=>{
        e.preventDefault();
        setDragover(false)
        onFile(e.dataTransfer.files)
    }

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) =>{
        e.preventDefault();
        setDragover(over)
    }

    return(
        <div className={nclass}
             onDragOver={e=>{handleDrag(e, true)}}
             onDragLeave={e=>{handleDrag(e, false)}}
             onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;