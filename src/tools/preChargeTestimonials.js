const testimonials = require('./testimonials.json')
const {SuccessStories} = require('../db').default

const getTestimonials = async() => {
    try {
        testimonials.forEach((e)=>{
            SuccessStories.findOrCreate({
                where: {id: e.id},
                defaults:{
                    nameOfPet: e.fullName,
                    imageOfPet:e.imgProfile,
                    rating: e.stars,
                    testimonio: e.comments
                }
            })
        })
        return getTestimonials
    } catch (error) {
        console.log(error)
    }
}

module.exports= {
    getTestimonials,
}