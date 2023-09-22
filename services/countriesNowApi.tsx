const getPlaces = async (cityName: string) => {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population/cities',
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des villes.');
    }

    const data = await response.json();

    const city = data.data.filter((entry: any) =>
      entry.city.includes(cityName),
    );

    if (!city) {
      throw new Error(`La ville ${cityName} n'a pas été trouvée.`);
    }

    console.log('Call API pour la Ville :', city);

    return city;
  } catch (error) {
    console.error('Erreur lors de la récupération des villes :', error);
    throw error;
  }
};

export default getPlaces;
