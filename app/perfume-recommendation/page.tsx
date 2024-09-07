"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { z } from "zod"
import Navbar from "@/components/Navbar"

export const PreferredScents = {
    citrus_green: 'citrus and green notes',
    vanilla_amber: 'vanilla and amber notes',
    woody: 'woody notes',
    floral: 'floral notes',
    spicy: 'spicy notes',
    fruity: 'fruity notes',
    aquatic_marine: 'aquatic and marine notes',
    powdery_musky: 'powdery and musky notes',
    sweet_gourmand: 'sweet gourmand notes',
    herbal_aromatic: 'herbal and aromatic notes',
} as const 
export type PreferredScents = (typeof PreferredScents)[keyof typeof PreferredScents]

const PreferredScentsArray = Object.values(PreferredScents)

export const Occasion = {
    daily: 'Daily Wear',
    work: 'Work',
    evening_out: 'Evening Out',
    date: 'Romantic Date',
    special_occasions: 'Special Occasions',
    summer_vacation: 'Summer Vacation',
} as const 
export type Occasion = (typeof Occasion)[keyof typeof Occasion]

const OccasionArray = Object.values(Occasion)


const formSchema = z.object({
    perfume_description: z.string().min(2).max(150),
    perfume_price: z.number().min(10).max(1000),
    perfume_preferred_scents: z.nativeEnum(PreferredScents),
    perfume_disliked_scents: z.nativeEnum(PreferredScents),
    gender: z.enum(["male", "female"]),
    perfume_occasion: z.nativeEnum(Occasion),
    perfume_time: z.enum(["day", "night"]),
    perfume_season: z.enum(["winter", "spring", "summer", "fall"]),
})

const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            perfume_description: "",
            perfume_price: 100,
            perfume_preferred_scents: "fruity notes",
            perfume_disliked_scents: "herbal and aromatic notes",
            gender: "male",
            perfume_occasion: "Work",
            perfume_time: "day",
            perfume_season: "spring",
        },
    })

    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const {
            perfume_description,
            perfume_price,
            perfume_preferred_scents,
            perfume_disliked_scents,
            gender,
            perfume_occasion,
            perfume_time,
            perfume_season
        } = values;
    
        const prompt = `const prompt = Please recommend 6 perfumes  for someone who describes their ideal fragrance as '${perfume_description}' and is looking to spend up to $${perfume_price}. They prefer scents like ${perfume_preferred_scents} but dislike ${perfume_disliked_scents}. The perfume is intended for a ${gender} and will be worn for ${perfume_occasion} during the ${perfume_time} in the ${perfume_season}. Considering these preferences, suggest a fragrance that would be a perfect match for this person. give me only the name of the perfume as well as the brand and the price in dollars. and the 3 top notes of the perfume you must provide an array of 6 recommendations;`;

;                                                                 
        try {
            const response = await fetch('/api/perfume-recommendation', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            
            const data = await response.json();
            if (response.ok) {
                setRecommendations(data.result.split('\n'));
                setShowForm(false);
            } else {
                console.error(data.error);
                setRecommendations(["Sorry, there was an error generating recommendations."]);
            }
        } catch (error) {
            console.error('Error:', error);
            setRecommendations(["Sorry, there was an error generating recommendations."]);
        } finally {
            setIsLoading(false);
        }
    }
    
    

    return (
        <>
        <Navbar/>
        <section className="flex justify-center items-center  pt-10">
            
            {isLoading ? (
                <div className="text-center pt-20">
                    <div
                        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black mx-auto"
                    ></div>
                    <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                    Your About to be the best smelling person in the room
                    </p>
                </div>

            ) : showForm ? (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="perfume_description"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Description</FormLabel>
                                <FormControl>
                                    <Input className="w-80 md:w-96 " placeholder="Enter perfume description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="perfume_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Perfume Budget</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter perfume budget"
                                            value={field.value || ''} // Ensure field.value is treated as string
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)} // Convert to number
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="perfume_preferred_scents"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Preferred Scents</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select preferred scent" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PreferredScentsArray.map((scent) => (
                                                <SelectItem key={scent} value={scent}>
                                                    {scent}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="perfume_disliked_scents"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Diskliked Scents</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Diskliked scent" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PreferredScentsArray.map((scent) => (
                                                <SelectItem key={scent} value={scent}>
                                                    {scent}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Gender</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="perfume_occasion"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Occasion</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Ocaasion" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {OccasionArray.map((occ) => (
                                                <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="perfume_time"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Time</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select perfume time" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="day">Day</SelectItem>
                                            <SelectItem value="night">Night</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="perfume_season"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfume Season</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select perfume season" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="winter">winter</SelectItem>
                                            <SelectItem value="spring">spring</SelectItem>
                                            <SelectItem value="summer">summer</SelectItem>
                                            <SelectItem value="fall">fall</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            ) : (
                <div className="px-10 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map((recommendation, index) => (
                        <h1 key={index} className="bg-black h-[200px] items-center justify-center text-white p-4 rounded-md ">
                            {recommendation}
                        </h1>
                    ))}
                </div>
            )}
        </section>
        </>
    )
}

export default Page
