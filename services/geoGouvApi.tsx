const getPlaces = async (cityName: any) => {
  try {
    const response = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
        cityName,
      )}&limit=5`,
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des villes.');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`La ville ${cityName} n'a pas été trouvée.`);
    }

    const cityNames = data.map((entry: any) => entry.nom);
    return cityNames;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des suggestions de villes :',
      error,
    );
    throw error;
  }
};

export default getPlaces;
