import { useState } from "react"

type FieldType = "text" | "email" | "password" | "number" | "textarea" | "select" | "date" | "autocomplete"

export interface FormField {
  id: string
  name: string
  type: FieldType
  label: string
  placeholder: string
  options?: string[]
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

