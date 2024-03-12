import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IPokemon } from "@/types/pokemon"
import { toast } from "sonner"

const formSchema = z.object({
    pokemon: z.string().min(1, {
        message: "Pokemon search can not be empty.",
    }),
})

function PokemonForm() {
    const [pokemon, setPokemon] = useState<IPokemon | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pokemon: "",
        },
    })

    async function onSubmit({ pokemon }: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/v1/Pokemon/${pokemon}`)
            if (!res.ok) {
                throw new Error("Pokemon not found, please try again.")
            }
            const data = await res.json()
            setPokemon({
                number: data.id,
                name: data.name,
                image: data.image,
            })
            setError(null)
            toast.success("Pokemon found!")
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            toast.error(err.message)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-24 border rounded-lg backdrop-blur-[2px]">
            <h2 className="text-3xl font-semibold mb-8">Search for a Pokemon</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {pokemon && !error && (
                <div className="flex items-center space-x-4">
                    <img src={pokemon.image} alt={pokemon.name} className="size-24" />
                    <div>
                        <h3 className="text-2xl font-semibold">{pokemon.name}</h3>
                        <p className="text-gray-600">#{pokemon.number}</p>
                    </div>
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="pokemon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pokemon</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pikachu" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the name or number of a Pokemon to see its details.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>Search</Button>
                </form>
            </Form>
        </div>
    )
}

export default PokemonForm
