"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormFields } from "../hooks/useFormFields"
import AddFieldForm from "./AddFieldForm"
import FieldList from "./FieldList"
import GeneratedCode from "./GeneratedCode"
import PreviewModal from "./PreviewModal"

export default function FormBuilder() {
  const { fields, addField, removeField } = useFormFields()
  const [showCode, setShowCode] = useState(false)
  const [formTitle, setFormTitle] = useState("Your Form Title")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="formTitle">Form Title</Label>
              <Input
                id="formTitle"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter form title"
              />
            </div>
            <AddFieldForm onAddField={addField} />
            <FieldList fields={fields} onRemoveField={removeField} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Button onClick={() => setShowCode(!showCode)}>{showCode ? "Hide Code" : "Show Code"}</Button>
              <PreviewModal fields={fields} formTitle={formTitle} />
            </div>
            {showCode && (
              <div className="mt-4">
                <GeneratedCode fields={fields} formTitle={formTitle} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

