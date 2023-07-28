import { json } from 'express';
import database from './database.js';
import {member} from './schema.js';
import {crypto} from './schema.js'



export default async function login(emailid) {
    try {
        await database();
        const foundUser = await member.findOne({ email: emailid });
        return foundUser;
}
catch(err)
{
    console.log(err);
}

}

export async function makeaccount(object) {
    await database();

    const resp = await member.findOne({ email: object.email });
   
    if (resp) {
        return { status: 409 };
    }

    try {
        console.log("name: "+object.name)
        const newmember = new member({
            name: object.name,
            email: object.email,
            password: object.password
        });

        const response = await newmember.save();
        return { status: 200 };
    } catch (err) {
        console.log("failed");
        return { status: 500 };
    }
}



export async function buy(object) {
  try {
    await database();
    const existingCrypto = await crypto.findOne({
      email: object.email,
      name: object.name,
    });

    if (existingCrypto) {
      // Calculate the average of price and boughtAt and update the quantity
      const totalQuantity = existingCrypto.quantity + object.quantity;
      const newPrice =
        (existingCrypto.price * existingCrypto.quantity + object.price * object.quantity) /
        totalQuantity;
      const newBoughtAt =
        (existingCrypto.boughtAt * existingCrypto.quantity + object.boughtAt * object.quantity) /
        totalQuantity;

      // Update the existing element in the database
      existingCrypto.price = newPrice;
      existingCrypto.boughtAt = newBoughtAt;
      existingCrypto.quantity = totalQuantity;
      const response = await existingCrypto.save();
      console.log(response);
      return response;
    } else {
      // Element doesn't exist, add a new element to the database
      const newCrypto = new crypto(object);
      const response = await newCrypto.save();
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}


export async function watchlistdata(email)
{ console.log(email);
    try{
        await database();
   const response= await crypto.find({email:email.email})
   const totalPrice = response.reduce((acc, curr) => acc + curr.price, 0);
    

   console.log(response )
   console.log("Total Price:", totalPrice);
   const responseData = {
    data: response,
    totalPrice: totalPrice,
  };
   return responseData;
    }
    catch(err)
    {
          console.log("nothing found")
    }

}

export async function sellshare(share)
{ console.log(share.name);
    try{
        await database();
   const response= await crypto.findOneAndDelete({email:share.email,name:share.name})
   console.log(response )
   return response;
    }
    catch(err)
    {
          console.log("nothing found")
    }

}



