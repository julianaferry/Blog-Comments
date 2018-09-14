import { VOTE_ORDER, TIMESTAMP_ORDER } from './Constants';

const SortVoteScore = items => {
  return Array.isArray(items)
    ? items.sort ((a, b) => b.voteScore - a.voteScore)
    : items;
};

const SortTimeStamp = items => {
  return Array.isArray(items)
    ? items.sort ((a, b) => b.timestamp - a.timestamp)
    : items;
};

export const sortBy = (items, order = VOTE_ORDER) => {
  switch (order) {
    case VOTE_ORDER:
      return SortVoteScore(items);
    case TIMESTAMP_ORDER:
      return SortTimeStamp(items);
    default:
      return items;
  }
};