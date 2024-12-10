function createFrame(names) {
    const longerNameLength = Math.max(...names.map(n => n.length));
  const cover = '*'.repeat(longerNameLength + 4);
  const namesCovered = names.map(n => `* ${n}${' '.repeat(longerNameLength - n.length)} *`);
  return [cover, ...namesCovered, cover].join('\n');
}