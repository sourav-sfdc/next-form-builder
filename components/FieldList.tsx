import { Button } from "@/components/ui/button"
import type { FormField } from "../hooks/useFormFields"

interface FieldListProps {
  fields: FormField[]
  onRemoveField: (id: string) => void
}

export default function FieldList({ fields, onRemoveField }: FieldListProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Current Fields</h3>
      <ul className="space-y-2">
        {fields.map((field) => (
          <li key={field.id} className="flex flex-col">
            <div className="flex justify-between items-center">
              <span>
                {field.label} ({field.type})
              </span>
              <Button variant="destructive" size="sm" onClick={() => onRemoveField(field.id)}>
                Remove
              </Button>
            </div>
            {field.type === "select" && field.options && field.options.length > 0 && (
              <ul className="ml-4 mt-1">
                {field.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

