'use client'
import { User, Plus, Minus, ChefHat, Clock, Users, Flame, Globe, Tag, UtensilsCrossed } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    ingredients: z.array(z.string()).min(1, { message: "At least one ingredient is required." }),
    instructions: z.array(z.string()).min(1, { message: "At least one instruction is required." }),
    prepTimeMinutes: z.number().min(1, { message: "Prep time must be at least 1 minute." }),
    cookTimeMinutes: z.number().min(1, { message: "Cook time must be at least 1 minute." }),
    servings: z.number().min(1, { message: "Servings must be at least 1." }),
    difficulty: z.string(),
    cuisine: z.string(),
    caloriesPerServing: z.number().min(1, { message: "Calories must be at least 1." }),
    tags: z.array(z.string()),
    mealType: z.array(z.string()).min(1, { message: "At least one meal type is required." }),
    image: z.string().url({ message: "Please enter a valid URL for the image." }),
  })
  
const CreateRecipe = () => {
const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])
  const [tags, setTags] = useState([''])
  const [mealTypes, setMealTypes] = useState([''])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ingredients: [''],
      instructions: [''],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: 'medium',
      cuisine: '',
      caloriesPerServing: 0,
      tags: [''],
      mealType: [''],
      image: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    
  }

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ''])
  }

  const removeField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

    return ( 
      <section className="container mx-auto mt-8 px-4 pb-20">        
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Recipe</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-40">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="extra">Extra Info</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Recipe Information</CardTitle>
                    <CardDescription>Enter the core details of your recipe.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipe Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <ChefHat className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Enter recipe name" {...field} className="pl-8" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="prepTimeMinutes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prep Time (minutes)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cookTimeMinutes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cook Time (minutes)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="servings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Servings</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Recipe Details</CardTitle>
                    <CardDescription>Provide the ingredients and instructions for your recipe.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <FormLabel>Ingredients</FormLabel>
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <Input
                            placeholder={`Ingredient ${index + 1}`}
                            value={ingredient}
                            onChange={(e) => {
                              const newIngredients = [...ingredients]
                              newIngredients[index] = e.target.value
                              setIngredients(newIngredients)
                              form.setValue('ingredients', newIngredients)
                            }}
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeField(setIngredients, index)}
                            className="ml-2"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addField(setIngredients)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Ingredient
                      </Button>
                    </div>

                    <div>
                      <FormLabel>Instructions</FormLabel>
                      {instructions.map((instruction, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <Textarea
                            placeholder={`Step ${index + 1}`}
                            value={instruction}
                            onChange={(e) => {
                              const newInstructions = [...instructions]
                              newInstructions[index] = e.target.value
                              setInstructions(newInstructions)
                              form.setValue('instructions', newInstructions)
                            }}
                            className="flex-grow"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeField(setInstructions, index)}
                            className="ml-2"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addField(setInstructions)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="extra">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Add extra details to make your recipe stand out.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="cuisine"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cuisine</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input {...field} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="caloriesPerServing"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calories per Serving</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Flame className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormLabel>Tags</FormLabel>
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <div className="relative flex-grow">
                            <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder={`Tag ${index + 1}`}
                              value={tag}
                              onChange={(e) => {
                                const newTags = [...tags]
                                newTags[index] = e.target.value
                                setTags(newTags)
                                form.setValue('tags', newTags)
                              }}
                              className="pl-8"
                            />
                          </div>
                          <Button
                            
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeField(setTags, index)}
                            className="ml-2"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addField(setTags)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Tag
                      </Button>
                    </div>

                    <div>
                      <FormLabel>Meal Type</FormLabel>
                      {mealTypes.map((mealType, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <div className="relative flex-grow">
                            <UtensilsCrossed className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder={`Meal Type ${index + 1}`}
                              value={mealType}
                              onChange={(e) => {
                                const newMealTypes = [...mealTypes]
                                newMealTypes[index] = e.target.value
                                setMealTypes(newMealTypes)
                                form.setValue('mealType', newMealTypes)
                              }}
                              className="pl-8"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeField(setMealTypes, index)}
                            className="ml-2"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addField(setMealTypes)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Meal Type
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center">
              <Button type="submit" size="lg">Add Recipe</Button>
            </div>
          </form>
        </Form>
      </section>

     );
}
 
export default CreateRecipe;