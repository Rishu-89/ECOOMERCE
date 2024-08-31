import slugify from "slugify";
import  categoryModel from "../models/categoryModel.js"

export const createCategoryController=async(req,res)=>{

  try {
    let {name}=req.body;
    if(!name){
      return res.status(401).send({message:"Name is required"})
    }
    const existingCategory=await categoryModel.findOne({name});
    if(existingCategory){
     return res.status(200).send({
        success:false,
        message:"Category Already exist"
      })
    }

    const category=await new categoryModel({name,slug:slugify(name)}).save();
    res.status(201).send({
         success:true,
         massage:"new category Created",
         category
    })




    
  } catch (error) {
   console.log(error);
   res.status(500).send({
    success:false,
    error,
    massage:"Error in category"
   }) 
  }

}



export const updateCategoryController=async(req,res)=>{
  try {
    const {name}=req.body;
    const {id}=req.params;
    
    const category=await categoryModel.findByIdAndUpdate( 
      id,
      { name, slug: slugify(name) },
      { new: true }
    )
   res.status(200).send({
    success:true,
    message:"category Created Sucessfully",
    category
   })

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error in updating category"
    })
  }
}



export const categoryController=async(req,res)=>{
try {
  
  const category=await categoryModel.find({});
  res.status(200).send({
    success:true,
    massage:"All category list",
    category
  })


} catch (error) {
  res.status(500).send({
    success:false,
    massage:"Error in geting all category",
    error
  })
}
}


export const singleCategoryController=async(req,res)=>{
  try {
       
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
    
  } catch (error) {
    res.status(500).send({
      success:false,
    massage:"Error in geting sngle category",
    error
    })
  }
}

export const deleteCategorycontroller=async(req,res)=>{
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
}