import mongoose from "mongoose";
 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://anikagupta2608_db_user:AnikaGupta2004@cluster0.tqwbyuj.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}