const admin = require("firebase-admin");
const projects = require("../data/projectsData.cjs");
const timeline = require("../data/timelineData.cjs");
const serviceAccount = require("../firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://portfolio-mfarah-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();

const seedData = async () => {
  try {
    console.log("Starting data seeding...");

    await db.ref("projects").set(projects);
    console.log("Projects data seeded!");

    await db.ref("timeline").set(timeline);
    console.log("Timeline data seeded!");

    console.log("Data seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();