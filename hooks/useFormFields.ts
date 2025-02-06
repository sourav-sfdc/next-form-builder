import { useState } from "react"

type FieldType = "text" | "email" | "password" | "number" | "textarea" | "select"

export interface FormField {
  id: string
  name: string
  type: FieldType
  label: string
  placeholder: string
  options?: string[] // New field for select options
}

export function useFormFields() {
  const [fields, setFields] = useState<FormField[]>([])

  const addField = (field: Omit<FormField, "id">) => {
    setFields([...fields, { ...field, id: Date.now().toString() }])
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  return { fields, addField, removeField }
}

