/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import type { Jodit } from 'jodit-react';
import { joditConfig } from '@/config';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface BNPEditorProps {
  name: string;
  label?: string;
}


const DailyTimesEditor: React.FC<BNPEditorProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const editorRef = useRef<Jodit | null>(null);


  const config = {
    ...joditConfig,
    uploader: {
      ...joditConfig.uploader,
      defaultHandlerSuccess: function (this: Jodit, response: any) {
        if (response.files && response.files.length) {
          const imageUrl = response.files[0];
          this.selection.insertImage(imageUrl, null, 250);
        }
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div>
          {label && <label>{label}</label>}
          <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            onBlur={(newContent) => {
              onBlur();
              onChange(newContent);
            }}
            onChange={(newContent) => {}}
          />
        </div>
      )}
    />
  );
};





export default DailyTimesEditor;
