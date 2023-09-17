import mongoose from "mongoose";

const schema = new mongoose.Schema({
  xie_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  branch: {
    type: String,
  },
  year: {
    type: Number,
  },
  sem: {
    type: Number,
  },
  exam_type: {
    type: String,
    
  },

  Subject:{
    type: String,

  },
  Marks:{
    type: Number,
    default:0
  }
  
    /*Maths_3:{
        type: Number,
        default:0
    }, 
    DSA:{
        type: Number,
        default:0

    },
    Java:{
        type: Number,
        default:0
    }, 
    CG: {
        type: Number,
        default:0
    },
    DSGT:{
        type: Number,
        default:0
    }, 
    DLCOA: {
        type: Number,
        default:0
    }
    */
  
});

export const Result = mongoose.model("Result", schema);
