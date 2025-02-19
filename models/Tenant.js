import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  name: { 
     type: String, 
     required: true 
},
databaseURI: { 
     type: String, 
     required: true 
},
  createdAt: { 
     type: Date, 
     default: Date.now 
}
});

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
