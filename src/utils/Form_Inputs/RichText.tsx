/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Jodit } from "jodit-react";
import { joditConfig as baseConfig } from "@/lib/jodit-editor-config";



const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface JoditEditorProps {
  name: string;
  label?: string;
}

const RichText: React.FC<JoditEditorProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const editor = useRef<Jodit | null>(null);

  const joditConfig = {
    ...baseConfig,
    uploader: {
      ...baseConfig.uploader,
      defaultHandlerSuccess: function (data: any, resp: any) {
        const files = data.files || [];
        if (files.length) {
          const editorInstance = editor.current;
          if (editorInstance) {
            editorInstance.selection.insertImage(files[0], null, 200);
          }
        }
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div>
          {label && (
            <label
              htmlFor={name}
              className="block text-sm mb-2 font-medium leading-6 text-gray-900 "
            >
              {label}
            </label>
          )}
          <JoditEditor
            ref={editor}
            value={value}
            config={joditConfig}
            onBlur={(newContent: string) => onBlur()}
            onChange={(newContent: string) => onChange(newContent)}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default RichText;
