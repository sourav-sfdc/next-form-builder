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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
          <Label htmlFor="${field.name}">${field.label}</Label>
          <Select value={${field.name}} onValueChange={(value) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(value)}>
            <SelectTrigger>
              <SelectValue placeholder="${field.placeholder}" />
            </SelectTrigger>
            <SelectContent>
              ${field.options?.map((option) => `<SelectItem value="${option}">${option}</SelectItem>`).join("\n              ")}
            </SelectContent>
          </Select>
        </div>`
          } else if (field.type === "textarea") {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="${field.name}">${field.label}</Label>
          <Textarea
            id="${field.name}"
            value={${field.name}}
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value)}
            placeholder="${field.placeholder}"
            required
          />
        </div>`
          } else if (field.type === "date") {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="${field.name}">${field.label}</Label>
          <Input
            type="date"
            id="${field.name}"
            value={${field.name}}
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value)}
            required
          />
        </div>`
          } else {
            return `
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="${field.name}">${field.label}</Label>
          <Input
            type="${field.type}"
            id="${field.name}"
            value={${field.name}}
            onChange={(e) => set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}(e.target.value)}
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>${formTitle}</CardTitle>
        <CardDescription>Please fill out the form below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          ${formInputs}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit</Button>
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

