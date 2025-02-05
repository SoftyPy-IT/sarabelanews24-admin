// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// interface RadioInputProps {
//   title: string;
//   defaultValue?: string;
//   onChange?: (value: string) => void;
//   name?: string;  
//   value: string;
// }


// const RadioInput: React.FC<RadioInputProps> = ({
//   title,
//   defaultValue = "false",
//   onChange,
// }) => {
//   return (
//     <div className="flex gap-4 items-center justify-center">
//       <h1 className="font-semibold my-4 text-blue-500">{title}</h1>
//       <RadioGroup defaultValue={defaultValue} onValueChange={onChange}>
//         <div className="flex gap-4">
//           <div className="flex items-center gap-2">
//             <RadioGroupItem value="true" id="yes" />
//             <Label htmlFor="yes">Yes</Label>
//           </div>

//           <div className="flex items-center gap-2">
//             <RadioGroupItem value="false" id="no" />
//             <Label htmlFor="no">No</Label>
//           </div>
//         </div>
//       </RadioGroup>
//     </div>
//   );
// };

// export default RadioInput;

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioInputProps {
  title: string;
  defaultValue?: string;
  onChange?: (value: boolean) => void; // Expecting boolean
  name?: string;  
  value: boolean; // Expecting boolean
}

const RadioInput: React.FC<RadioInputProps> = ({
  title,
  defaultValue = "false",
  onChange,
  value,
}) => {
  const handleValueChange = (newValue: string) => {
    // Convert string values to boolean
    if (onChange) {
      onChange(newValue === "true");
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <h1 className="font-semibold my-4 text-blue-500">{title}</h1>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
      >
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="true" id="yes" checked={value === true} />
            <Label htmlFor="yes">Yes</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="false" id="no" checked={value === false} />
            <Label htmlFor="no">No</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioInput;
