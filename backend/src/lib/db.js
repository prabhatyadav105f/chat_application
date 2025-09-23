import mongoose from 'mongoose'
export const connectdb=async()=>{
    try {
        const con=await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected",con.connection.host);
        
    } catch (error) {
        console.log("error connecting to mongodb",error);
        process.exit(1);//1 means fail and 0 mean successs
        
    }
}

