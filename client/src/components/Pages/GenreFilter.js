import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function GenreFilter() {
  const [selectedGenre, setSelectedGenre] = React.useState("All");

  const handleGenreChange = (event, newAlignment) => {
    setSelectedGenre(newAlignment);
  };
  const genres=["Genre 1", "Genre 2", "Genre 3", "Genre 4"]

  return (
    <ToggleButtonGroup
      value={selectedGenre}
      exclusive
      onChange={handleGenreChange}
      aria-label="text alignment"
    >
      {genres.map((genre) => (
      <ToggleButton value={genre} aria-label={genre}>
      {genre}
      </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
