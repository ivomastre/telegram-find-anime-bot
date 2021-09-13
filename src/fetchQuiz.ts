import { JikanApiClient, JikanApiSeasonAnimeModel } from '@thorbens/jikan-api';

const seasonArray = ['summer', 'spring', 'fall', 'winter'] as const;

function getRandomInt(min, max) {
  const integerMin = Math.ceil(min);
  const integerMax = Math.floor(max);
  return Math.floor(Math.random() * (integerMax - integerMin + 1)) + integerMin;
}

async function fetchAnimeList(): Promise<JikanApiSeasonAnimeModel[]> {
  const apiClient = new JikanApiClient();
  const season = await apiClient.getSeason(
    getRandomInt(1980, new Date().getFullYear()),
    seasonArray[getRandomInt(0, 3)]
  );

  if (season.anime.length < 3) {
    season.anime.concat(await fetchAnimeList());
  }

  return season.anime;
}

async function fetchQuiz(): Promise<JikanApiSeasonAnimeModel[]> {
  const animes = await fetchAnimeList();
  const roundedTitleAnimes = animes.map(anime => {
    return {
      title: anime.title.substring(0, 64), // telegram api limitation
      ...anime,
    };
  });

  const sortedAnimes = roundedTitleAnimes.sort(() => Math.random() - 0.5);

  return sortedAnimes.slice(0, 4);
}

export default fetchQuiz;
