import { forEach, pipe } from 'ramda';
import { newDeck, cardModelToPath } from '../deck-engine';

const preloadImage = (src: string) => (new Image().src = src);

const preloadCardImage = pipe(
    cardModelToPath,
    preloadImage,
);

forEach(preloadCardImage)(newDeck());
