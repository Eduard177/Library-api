const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const db = require("../modules/database/index");
const { Configuration } = require("../modules/config/config.key");
const { ConfigService } = require("../modules/config/index");

async function seedBookDB() {
  const config = new ConfigService();

  const client = new MongoClient(config.get(Configuration.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log("Connected correctly to server");
  try {
    const collection = client.db("Library");
    const bookFakeDB = collection.collection("books");
    const pageFakeDB = collection.collection("pages");

    const BookSeriesData = db.book;
    const PageSeriesData = db.page;

    const { title, firstName } = faker.name;
    const { paragraph } = faker.lorem;

    const books = [];
    const pages = [];
    for (let i = 0; i < 4; i++) {
      books.push(
        new BookSeriesData({
          title: title(),
          author: firstName(),
          pages,
        })
      );
      pages.push(
        new PageSeriesData({
          content: paragraph(),
        })
      );
    }

    await bookFakeDB.insertMany(books);
    await pageFakeDB.insertMany(pages);
    client.close();
  } catch (err) {
    console.log(err);
  }
}
seedBookDB();