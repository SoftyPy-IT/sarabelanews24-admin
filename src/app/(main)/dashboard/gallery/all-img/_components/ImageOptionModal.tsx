import React from "react";
import { Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

type ImageOptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const ImageOptionModal: React.FC<ImageOptionModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px]">
        <div className="mb-4">
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="flex items-center text-red-600 hover:text-red-800 transition"
          >
            <Trash2 className="mr-2" />
            Delete Image
          </button>
        </div>
        <div>
          <h4 className="text-md font-medium mb-2">
            আপনি কি ব্যানার রাখতে চাচ্ছেন?
          </h4>
          <RadioGroup className="flex">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="Yes" value="true" />
              <Label htmlFor="Yes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="No" value="false" />
              <Label htmlFor="No">No</Label>
            </div>
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptionModal;
