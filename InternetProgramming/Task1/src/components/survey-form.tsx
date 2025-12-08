import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

const SurveyForm: React.FC = () => {
    const [answers, setAnswers] = React.useState<any>({})

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(Object.entries(answers).reduce((acc, [ name, value ]) =>
            acc + `${name}: ${value}\n`,
            ''
        ));
    }

    return (
        <main className="container mx-auto max-w-3xl p-4">
            <Card>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Your name</Label>
                            <Input
                                id="name"
                                value={answers.name}
                                onChange={(e) => setAnswers((s: any) => ({ ...s, name: e.target.value }))}
                                placeholder="Jane Doe"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={answers.email}
                                onChange={(e) => setAnswers((s: any) => ({ ...s, email: e.target.value }))}
                                placeholder="jane@example.com"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Password</Label>
                            <Input
                                id="email"
                                type="password"
                                value={answers.password}
                                onChange={(e) => setAnswers((s: any) => ({ ...s, password: e.target.value }))}
                                placeholder="password"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-2">
                            <Label className="col-span-full">Gender</Label>
                            <Input
                                id="gender-male"
                                type="radio"
                                value="male"
                                name="gender"
                                onChange={(e) => setAnswers((s: any) => ({ ...s, gender: e.target.value }))}
                            />
                            <Label htmlFor="gender-male">Male</Label>
                            <Input
                                id="gender-female"
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={(e) => setAnswers((s: any) => ({ ...s, gender: e.target.value }))}
                            />
                            <Label htmlFor="gender-female">Female</Label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="rating">Language</Label>
                            <Select
                                value={answers.language}
                                onValueChange={(v) => setAnswers((s: any) => ({ ...s, language: v }))}
                            >
                                <SelectTrigger id="rating" className="w-full">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["english", "russian", "german", "bulgarian"].map((l) => (
                                        <SelectItem key={l} value={l}>{l}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Button type="submit" className="w-full">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default SurveyForm
