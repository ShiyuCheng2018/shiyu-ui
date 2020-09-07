import React from "react";
import {
    fireEvent,
    render,
    RenderResult,
    cleanup,
    wait,
    createEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import registerFaIcons from "../../registerFaIcons";
import Upload, { UploadProps } from "./upload";
registerFaIcons();

jest.mock("../Icon/icon", () => {
    // @ts-ignore
    return ({ icon, onClick }) => {
        return <span onClick={onClick}>{icon}</span>;
    };
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
    action: "fackurl.com",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true,
};

let wrapper: RenderResult,
    fileInput: HTMLInputElement,
    uploadArea: HTMLInputElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("test upload component", async () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
        fileInput = wrapper.container.querySelector(
            ".shiyu-file-input"
        ) as HTMLInputElement;
        uploadArea = wrapper.queryByText("Click to upload") as HTMLInputElement;
    });
    it("upload process should works fine", async () => {
        const { queryByText } = wrapper;
        // mockedAxios.post.mockImplementation(()=>{
        //     return Promise.resolve({'data': 'success'})
        // })
        mockedAxios.post.mockResolvedValue({ data: "success" });
        expect(uploadArea).toBeInTheDocument;
        expect(fileInput).not.toBeVisible();
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        expect(queryByText("spinner")).toBeInTheDocument();
        await wait(() => {
            expect(queryByText("test.png")).toBeInTheDocument();
        });
        expect(queryByText("check-circle")).toBeInTheDocument();
        expect(testProps.onSuccess).toHaveBeenCalledWith("success", testFile);
        expect(testProps.onChange).toHaveBeenCalledWith(testFile);

        // remove the uploaded file
        expect(queryByText("times")).toBeInTheDocument();
        fireEvent.click(queryByText("times")!);
        expect(queryByText("test.png")).not.toBeInTheDocument();
        expect(testProps.onRemove).toHaveBeenCalledWith(
            expect.objectContaining({
                raw: testFile,
                status: "success",
                name: "test.png",
            })
        );
    });
    it("drag and drop should work fine", async () => {
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass("is-dragover");
        fireEvent.dragLeave(uploadArea);
        expect(uploadArea).not.toHaveClass("is-dragover");
        // fireEvent.drop(uploadArea, {dataTransfer: {files: [testFile]}});
        const mockDropEvent = createEvent.drop(uploadArea);
        Object.defineProperty(mockDropEvent, "dataTransfer", {
            value: {
                files: [testFile],
            },
        });
        fireEvent(uploadArea, mockDropEvent);

        await wait(() => {
            expect(wrapper.queryByText("test.png")).toBeInTheDocument();
        });
        expect(testProps.onSuccess).toHaveBeenCalledWith("success", testFile);
    });
});
