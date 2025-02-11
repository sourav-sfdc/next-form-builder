"use client"

import { useEffect, useState } from "react"
import type { FormField } from "../hooks/useFormFields"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface GeneratedCodeProps {
  fields: FormField[]
  formTitle: string
}

export default function GeneratedCode({ fields, formTitle }: GeneratedCodeProps) {
  const [code, setCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const generateCode = () => {
      const imports = `import { useState } from 'react'
      import { Input } from '@heroui/input'
      import {Autocomplete, AutocompleteItem, Button, CalendarDate} from "@heroui/react";
      import {Textarea} from "@heroui/input";
      import {DatePicker} from "@heroui/date-picker";
      import {Select, SelectSection, SelectItem} from "@heroui/select";
      import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'`

      const formFields = fields
        .map(
          (field) => `
          const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('')`,
        )
        .join("")

      const handleSubmit = `
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ ${fields.map((field) => field.name).join(", ")} })
  }`

      const formInputs = fields
        .map((field) => {
          if (field.type === "select") {
            return `
        <div className="grid w-full items-center gap-1.5">
            <Select className="max-w-xs" 
                    labelPlacement="outside" 
                    radius="sm" 
                    label="${field.label}" 
                    value={${field.name}} 
                    placeholder="${field.placeholder}" 
                    onSelectionChange={(value) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(value)}
                    >
            ${field.options?.map((option) => `<SelectItem key="${option}" value="${option}">${option}</SelectItem>`).join("\n              ")}
            </Select>
        </div>`
          } else if (field.type === "textarea") {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Textarea
            id="${field.name}"
            value={${field.name}}
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value)}
            label="${field.label}"
            labelPlacement="outside"
            radius="sm"
            placeholder="${field.placeholder}"
            required
          />
        </div>`
          } else if (field.type === "date") {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Datepicker
            id="${field.name}"
            value={${field.name}}
            label="${field.label}"
            labelPlacement="outside"
            radius="sm"
            placeholder="${field.placeholder}"
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value || parseDate(new Date().toISOString().split('T')[0]))}
            required
          />
        </div>`
          } else {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Input
            type="${field.type}"
            id="${field.name}"
            value={${field.name}}
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value)}
            label="${field.label}"
            labelPlacement="outside"
            radius="sm"
            placeholder="${field.placeholder}"
            required
          />
        </div>`
          }
        })
        .join("")

      const component = `
export default function GeneratedForm() {${formFields}${handleSubmit}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>${formTitle}</CardTitle>
        <CardDescription>Please fill out the form below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          ${formInputs}
        </CardContent>
        <CardFooter>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button type="submit" className="w-full" color={"primary"} radius="sm">Submit</Button>
            <Button type="reset" className="w-full" color={"danger"} radius={"sm"}>Reset</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}`

      setCode(`${imports}

${component}`)
    }

    generateCode()
  }, [fields, formTitle])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button onClick={copyToClipboard} variant="outline" size="sm" className="flex items-center gap-2">
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Code
            </>
          )}
        </Button>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}

