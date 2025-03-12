import mongoose from "mongoose";
import AI_Message from "../models/ai_messages.js";
import User from "../models/user.js";
import TherapySession from "../models/therapy_session.js";
import UserFeedback from "../models/user_feedback.js";
// mongodb+srv://Rina:<db_password>@rina.gp6gt.mongodb.net/
mongoose.connect("mongodb+srv://Rina:25102002b@rina.gp6gt.mongodb.net/rina_dataset", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

async function insertDummyAiMessages() {

    const feedbackData = [{
        session_id: "67d1ef173b785757b0e25ac4", // Existing therapy session ID
        rating: 5,
        feedback: "The session was really helpful and I feel much better.",
    }];

    const insertedFeedback = await UserFeedback.insertMany(feedbackData);
    console.log("✅ User feedback inserted successfully:", insertedFeedback);
}
insertDummyAiMessages();