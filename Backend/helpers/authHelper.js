import bcrypt from 'bcrypt'


export let hashPassword=async(password)=>{
  try {

    // let saltRock=10;
    // let hashedPassword=await bcrypt.hash(saltRock,password);
    // return hashedPassword;


  //  bcrypt.genSalt(10,async function(err, salt) {
  //     console.log(`${salt} this is helper11`)
  //     bcrypt.hash(password, salt,async function(err, hash) {
  //     console.log(`${hash} this is helper`)
  //         return hash;
  //     });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return hashedPassword;
  

  } catch (error) {
   
    console.log(error)
  }
 
}



export let comparePassword=(password,hashedPassword)=>{

return bcrypt.compare(password,hashedPassword);
}