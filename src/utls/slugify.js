module.exports = string =>
  string
    .replace(/[^\u0020-\u007E]/g, '')
    .replace(/[^A-Za-z]/g, '-')
    .replace(/^-+|-+$|-(?=-)/g, '')
    .toLowerCase();
