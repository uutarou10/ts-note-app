export default class Note {
  constructor(
    readonly id: string,
    public title: string,
    public body: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) { }
}