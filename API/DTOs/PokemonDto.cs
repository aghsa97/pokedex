namespace API.DTOs
{
    public class Sprites
    {
        public required string front_default { get; set; }
    }
    public class PokemonDto
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required Sprites Sprites  { get; set; }
    }

}