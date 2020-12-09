      id: 1,
      temperature: 'hot',
      weather: 'sunny',
      waterLevel: 'water twice a week'

DROP TABLE IF EXISTS flowers CASCADE;
DROP TABLE IF EXISTS weathers;

CREATE TABLE flowers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    temperature TEXT NOT NULL,
    water_level TEXT NOT NULL,
    weather TEXT NOT NULL

);

CREATE TABLE weather (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    weather_daily INTEGER NOT NULL,
    weather_id BIGINT REFERENCES flowers(id)
);
