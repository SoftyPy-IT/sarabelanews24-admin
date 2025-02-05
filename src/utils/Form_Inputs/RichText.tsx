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
  placeholder?: string; 
}

const RichText: React.FC<JoditEditorProps> = ({ name, label, placeholder }) => {
  const { control } = useFormContext();
  const editor = useRef<Jodit | null>(null);

  const joditConfig = {
    ...baseConfig,
    placeholder: placeholder || "Start typing here...",
    height: 300,
    statusbar: false,
    uploader: {
      ...baseConfig.uploader,
      defaultHandlerSuccess: (data: any) => {
        const files = data?.files || [];
        if (files.length) {
          const editorInstance = editor.current;
          editorInstance?.selection.insertImage(files[0], null, 200);
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
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              {label}
            </label>
          )}
          <div className="border rounded-md">
            <JoditEditor
              ref={editor}
              value={value}
              config={joditConfig}
              onBlur={() => onBlur()}
              onChange={(newContent: string) => onChange(newContent)}
            />
          </div>
          {error && (
            <span
              className="text-red-500 text-sm mt-1 block"
              role="alert"
              aria-live="assertive"
            >
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default RichText;
