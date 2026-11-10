import {Property} from "../Models/propertyModel.js"
import {planTrip} from "../ai/tripPlanner.js"
import {generateDescription} from "../ai/generateDescription.js"

const createTripPlan = async(req, res) => {
    try {
        const {destination, budget, days, people, interests} = req.body

        if(!destination || !budget || !days || !people){
            return res.status(400).json({
                status:"fail",
                message:"Please fill in destination, budget, days, and people"
            })
        }

        const plan = await planTrip({
            destination, 
            budget, 
            days, 
            people, 
            interests : interests || []
        });

        const perNight = Number(budget) / Number(days);

        // Use a case-insensitive regex for flexible matching (e.g., "goa" matches "Goa")
        const destRegex = new RegExp(destination.trim(), "i");

        const properties = await Property.find({
            $or:[
                {"address.city": destRegex},
                {"address.state": destRegex},
                {location: destRegex}
            ],
            price: {$lte: perNight * 1.5}, // Optional: slightly flexible budget multiplier to ensure properties show up
            maximumGuest: {$gte: Number(people)},
        }).limit(6);

        res.status(200).json({
            status:"success",
            data:{ plan, properties, perNight }
        })

    } catch(error) {
       console.error("Trip Controller Error:", error);
       res.status(500).json({
            status:"fail",
            message:"Could not create a trip plan, please try again"
       })
    }
}

const writeDescription = async(req, res) => {
   try {
        const description = await generateDescription(req.body);
        res.status(200).json({status:"success", data:{description}})
   } catch(error) {
        res.status(500).json({
            status:"fail",
            message:"Could not generate a description"
        })
   }
}

export {createTripPlan, writeDescription};