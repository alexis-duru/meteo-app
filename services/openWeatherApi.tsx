const getWeather = async (city: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7425272eb22af607e6aaf2c4134b945e&lang=fr`,
    );

    if (!response.ok) {
      throw new Error(
        'Erreur lors de la récupération des données météorologiques.',
      );
    }

    const data = await response.json();
    console.log('Données météorologiques :', data);
    return data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des données météorologiques :',
      error,
    );
    throw error;
  }
};

export default getWeather;
