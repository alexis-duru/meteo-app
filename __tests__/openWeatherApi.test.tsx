import getWeather from '../services/openWeatherApi';

describe('getWeather', () => {
  it('should return the weather data', async () => {
    const data = await getWeather('Paris');
    expect(data).toBeDefined();
  });
});
