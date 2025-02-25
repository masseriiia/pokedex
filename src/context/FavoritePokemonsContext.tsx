import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface PokemonProviderProps {
    children: ReactNode
}

const FavoritePokemonsContext = createContext(undefined)

export const useFavoritePokemonsContext = () => {
    const context = useContext(FavoritePokemonsContext);
    if (!context) {
        throw new Error('usePokemonContext must be used within a PokemonProvider');
    }
    return context;
};

export const PokemonProvider = ({children}: PokemonProviderProps) => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favoritePokemons') || '[]'))

    useEffect(() => {
        localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (pokemon) => {
        if (!favorites.some((fav) => fav.id === pokemon.id)) {
            setFavorites((prev) => [...prev, pokemon]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(fav => fav.id !== id))
    }

    const clearFavorite = () => {
        setFavorites([])
    }

    return (
        <FavoritePokemonsContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorite }}>
            {children}
        </FavoritePokemonsContext.Provider>
    )
}
