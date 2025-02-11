import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { FormField } from "../hooks/useFormFields"

interface PreviewModalProps {
  fields: FormField[]
  formTitle: string
}

export default function PreviewModal({ fields, formTitle }: PreviewModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the form data to a server
    alert("Form submitted! Check the console for form data.")
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "select":
        return (
          <div key={field.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Select
              value={formData[field.name] || ""}
              onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "textarea":
        return (
          <div key={field.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Textarea
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              placeholder={field.placeholder}
            />
          </div>
        )
      case "date":
        return (
          <div key={field.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type="date"
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          </div>
        )
      default:
        return (
          <div key={field.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              type={field.type}
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              placeholder={field.placeholder}
            />
          </div>
        )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Preview Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Form Preview</DialogTitle>
        </DialogHeader>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{formTitle}</CardTitle>
            <CardDescription>Please fill out the form below.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">{fields.map(renderField)}</CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

