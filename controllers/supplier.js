// load all the model
const Supplier =  require("../models/supplier");
const getSuppliers = async (category, perPage = 5, page = 1) => {
    try {
        let filters = {};
        if (category) {
            filters.category = category;
        }
        const suppliers = await Supplier.find(filters)
        .limit(perPage) 
        .skip((page -1)* perPage)
        .sort({_id: -1});
        return suppliers;
    } catch (error) {
        throw new Error(error);
    }
};

//get 1 supplier
const getSupplier = async(id) => {
    const supplier = await Supplier.findById(id);
    return supplier;
};

//add
const addSupplier = async (name, email, phone, category ) => {
    //create new supplier
    const newSupplier = new Supplier({
        name,
        email,
        phone,
        category
    });
    //save the supplier with mongodb
    await newSupplier.save()
    return newSupplier;
};

//update 
const updateSupplier = async(
    supplier_id,
    name, 
    email,
    phone,
    category
) => {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
        supplier_id,
        {
            name,
            email,
            phone,
            category
        },
        { new: true} // send in the updated data
    );
    return updatedSupplier;
};

//delete
const deleteSupplier = async (id) => {
    return await Supplier.findByIdAndDelete(id)
};

module.exports = {
    getSuppliers,
    getSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier
};