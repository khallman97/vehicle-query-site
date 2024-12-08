"use client";

import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_VEHICLES } from '@/app/lib/queries';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Get the data from get all vechile query
  const [fetchVehicles, { data, loading, error }] = useLazyQuery(GET_ALL_VEHICLES, {
    fetchPolicy: "no-cache"
  });

  // process the data into one list as suggestions 
  let suggestions = [];
  if (data) {
    const bikeSuggestions = data.bikes?.map((b) => ({ name: b.model, type: "bike" })) || [];
    const carSuggestions = data.cars?.map((c) => ({ name: c.model, type: "car" })) || [];
    const spaceshipSuggestions = data.spaceships?.map((s) => ({ name: s.model, type: "spaceship" })) || [];
    suggestions = [...bikeSuggestions, ...carSuggestions, ...spaceshipSuggestions].filter(s => s.name);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);

    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
        // Only fetch if there is something typed in the box
        const trimmed = value.trim();
        if (trimmed.length > 0) {
          fetchVehicles({ variables: { search: trimmed } });
        } else {
          // Do nothing
        }
    }, 300);
    setDebounceTimer(timer);
  };

  // Go to the vehcile page for the selected suggestion
  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
    router.push(`/vehicle/${suggestion.type}/${suggestion.name}`);
  };


  // Set up keyboard inputs for the suggested options
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue && setShowSuggestions(true)}
        onBlur={handleBlur}
        placeholder="Search (brand, color, type, manufacturer ...)"
        className={styles.input}
      />

      {showSuggestions && (
        <div className={styles.suggestionsContainer}>
          {loading && <div className={styles.loading}>Loading...</div>}
          {error && <div className={styles.error}>Error loading</div>}

          {!loading && !error && suggestions.length > 0 && (
            <ul className={styles.suggestionsList}>
              {suggestions.map((s, index) => (
                <li
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSuggestion(s);
                  }}
                  className={`${styles.suggestionItem} ${index === highlightedIndex ? styles.suggestionItemHighlighted : ''}`}
                >
                  {s.name} ({s.type})
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && suggestions.length === 0 && inputValue.trim() !== "" && (
            <div className={styles.noResults}>
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
