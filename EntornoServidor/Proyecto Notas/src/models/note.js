class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  toJSON() {
    return {
      title: this.title,
      content: this.content,
    };
  }

  static fromJSON(json) {
    return new Note(json.title, json.content);
  }
}

module.exports = Note;