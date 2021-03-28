function getSequenceForHistory(history) {
  let sequence = '';
  let turn = 0;
  history.forEach((h, i) => {
    if((i + 1) % 2) {
      turn += 1;
      sequence += `${turn}.${h} `;
    } else {
      sequence += `${h} `;
    }
  });
  // Remove trailing space from sequence string to match current sequence in searches
  return sequence.slice(0, -1);
}

export {
    getSequenceForHistory
}
