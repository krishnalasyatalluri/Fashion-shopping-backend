const Catalog = require('../models/catalogModel');
const User = require("../models/userModel")
const catalogCltr = {};
catalogCltr.search = async (req, res) => {
  try {
    const { searchKeyword, priceMin, priceMax } = req.query
    //construction of query based on given search key and price 
    const query = {
      $or: [
        { product_description: { $regex: searchKeyword, $options: 'i' } },
        { brand_name: { $regex: searchKeyword, $options: 'i' } }
      ]
    }
    //checking min price and max price range is present or not
    if (priceMin && priceMax) {
      query.price = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) }
    }
    const catalogs = await Catalog.find(query)
      .sort({ rank: 1 })
      .limit(10)
    res.json(catalogs)
  } catch (error) {
    res.status(500).json({ message:'Internal server error'})
  }
}
catalogCltr.recommend = async (req, res) => {
  const { username } = req.params
  //check username is present or not
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }
    //check the particular user has preferred category
    if (user.preferredCategory) {
      const catalogs = await Catalog.find({ Product_category: user.preferredCategory })
        .sort({ rank: 1 })
        .limit(10)
      return res.json(catalogs)
    }else{
      const randomCatalogs=await Catalog.aggregate([{$sample:{size:10}}])
      return res.json(randomCatalogs)
    }
  }catch(error){
    res.status(500).json({message:'Internal server error'})

  }
}









module.exports = catalogCltr;
