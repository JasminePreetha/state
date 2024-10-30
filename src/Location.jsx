import React, { useEffect, useState } from 'react';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Fetch countries on initial render
    useEffect(() => {
        fetch('https://crio-location-selector.onrender.com/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    // Fetch states when a country is selected
    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        setSelectedState('');
        setSelectedCity('');
        fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.error('Error fetching states:', error));
    };

    // Fetch cities when a state is selected
    const handleStateChange = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        setSelectedCity('');
        fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
    };

    // Display selected location
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div className="location-selector">
            <h2>Select Location</h2>
            <select onChange={handleCountryChange} value={selectedCountry}>
                <option value="">Select Country</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            <select onChange={handleStateChange} value={selectedState} disabled={!selectedCountry}>
                <option value="">Select State</option>
                {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>

            <select onChange={handleCityChange} value={selectedCity} disabled={!selectedState}>
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            {selectedCity && selectedState && selectedCountry && (
                <p>You Selected: {selectedCity}, {selectedState}, {selectedCountry}</p>
            )}
        </div>
    );
};

export default LocationSelector;