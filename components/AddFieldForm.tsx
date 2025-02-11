"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormField } from "../hooks/useFormFields"

interface AddFieldFormProps {
  onAddField: (field: Omit<FormField, "id">) => void
}

export default function AddFieldForm({ onAddField }: AddFieldFormProps) {
  const [field, setField] = useState<Omit<FormField, "id">>({
    name: "",
    type: "text",
    label: "",
    placeholder: "",
    options: [],
  })
  const [option, setOption] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddField(field)
    setField({ name: "", type: "text", label: "", placeholder: "", options: [] })
    setOption("")
  }

  const addOption = () => {
    if (option && !field.options?.includes(option)) {
      setField({ ...field, options: [...(field.options || []), option] })
      setOption("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Field Name</Label>
        <Input id="name" value={field.name} onChange={(e) => setField({ ...field, name: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="type">Field Type</Label>
        <Select value={field.type} onValueChange={(value) => setField({ ...field, type: value as FormField["type"] })}>
          <SelectTrigger>
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="label">Field Label</Label>
        <Input
          id="label"
          value={field.label}
          onChange={(e) => setField({ ...field, label: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          value={field.placeholder}
          onChange={(e) => setField({ ...field, placeholder: e.target.value })}
        />
      </div>
      {field.type === "select" && (
        <div>
          <Label htmlFor="options">Options</Label>
          <div className="flex space-x-2">
            <Input
              id="options"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              placeholder="Add an option"
            />
            <Button type="button" onClick={addOption}>
              Add
            </Button>
          </div>
          <ul className="mt-2 space-y-1">
            {field.options?.map((opt, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{opt}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setField({ ...field, options: field.options?.filter((_, i) => i !== index) })}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button type="submit">Add Field</Button>
    </form>
  )
}

