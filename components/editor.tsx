"use client";

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url
    };

    const editor = useCreateBlockNote({
        initialContent:
            initialContent
                ? JSON.parse(initialContent) as
                //@ts-ignore
                PartialBlock[]
                : undefined,
        onEditorContentChange: (editor: any) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUpload
    })

    return (
        <div>
            <BlockNoteViewRaw editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} editable={editable} />
        </div>
    )
}

export default Editor;