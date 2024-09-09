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

const PreferredScents = {
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
type PreferredScents = (typeof PreferredScents)[keyof typeof PreferredScents]

const PreferredScentsArray = Object.values(PreferredScents)

const Occasion = {
    daily: 'Daily Wear',
    work: 'Work',
    evening_out: 'Evening Out',
    date: 'Romantic Date',
    special_occasions: 'Special Occasions',
    summer_vacation: 'Summer Vacation',
} as const 
type Occasion = (typeof Occasion)[keyof typeof Occasion]

const OccasionArray = Object.values(Occasion)


const formSchema = z.object({
    perfume_description: z.string().min(2).max(150),
    perfume_price: z.number().min(10).max(1000),
    perfume_preferred_scents: z.nativeEnum(PreferredScents),
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
            gender,
            perfume_occasion,
            perfume_time,
            perfume_season
        } = values;
    
        const prompt = `You are a highly knowledgeable perfume expert with access to an extensive database of fragrances. Your task is to recommend 6 perfumes based on the following criteria:

                    Input Parameters:
                    - Ideal fragrance description: ${perfume_description}
                    - Budget: Up to $${perfume_price}
                    - Preferred scent types: ${perfume_preferred_scents}
                    - Gender: ${gender}
                    - Occasion: ${perfume_occasion}
                    - Time of day: ${perfume_time}
                    - Season: ${perfume_season}

                    Instructions:
                    1. Analyze the input parameters meticulously, prioritizing the ideal fragrance description and preferred scent types.
                    2. Ensure recommendations are suitable for the specified occasion, time of day, and season.
                    3. Select 6 perfumes that best match the given criteria, with prices ranging from 80% to 100% of the specified budget to offer a range of options.
                    4. Provide diverse recommendations while adhering to preferences. Include:
                        - At least one lesser-known or niche brand
                        - One "signature scent" potential for daily wear (if appropriate)
                        - One slightly adventurous option that pushes boundaries while still aligning with overall preferences
                    5. If specific notes or attributes are mentioned in the fragrance description, prioritize these in your selection, even if not explicitly listed in preferred scent types.
                    6. Consider the gender preference as a guideline, not a strict rule. If a fragrance from another gender category is a perfect match, include it.
                    7. For each recommendation, briefly consider longevity and sillage based on the occasion and time of day.
                    8. Ensure that each recommendation has a distinct reason for inclusion, avoiding overlap or redundancy in the selection.

                    Output Format:
                    Provide an array of 6 recommendations. For each recommendation, include only:
                    - The name of the perfume
                    - The brand
                    - The price in US dollars
                    - The 3 top notes of the perfume

                    Present your recommendations in this format:

                    1. Perfume Name by Brand Name, $XX - (Note 1, Note 2, Note 3)
                    2. Perfume Name by Brand Name, $XX - (Note 1, Note 2, Note 3)
                    (Continue for all 6 recommendations)

                    Ensure that your recommendations are listed in order from most to least aligned with the given preferences.

                    Remember: Each recommendation should be thoughtfully selected to provide a perfect balance of matching the specified criteria while offering a range of options within the given parameters.`
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
        <section className="flex justify-center items-center  py-10">
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
                <section>
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold pb-8">Enter your Unique Preferences</h1>
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
                </section>
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
