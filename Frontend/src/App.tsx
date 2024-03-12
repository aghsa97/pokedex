import { Toaster } from "sonner"
import { GridSBackground } from "./components/grid-background"
import PokemonForm from "./components/pokemon-form"

function App() {

  return (
    <div className="h-screen max-w-screen-lg mx-auto flex flex-col items-center justify-center">
      <h1 className="text-5xl font-semibold text-center py-24">Pokedex</h1>
      <GridSBackground className="w-full h-full flex items-center justify-center">
        <PokemonForm />
      </GridSBackground>
      <Toaster />
    </div>
  )
}

export default App
