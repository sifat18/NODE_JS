const mon=require('mongoose');
mon.connect('mongodb://localhost:27017/Alpha', { useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>{
    console.log("YEAAAH Mongo")
})
.catch(err =>{
    console.log("oh no Mongo")
})
const Paper= require('./models/news');


// const f=new Farm({
//     name: 'grapes',
//     price: 24.22,
//     category: 'fruit'
// })
// f.save().then(data => {
//     console.log(data)
// })
// .catch(err =>{
//     console.log(err)
// })

const seedata=[{
    author:'6064521974f9ef28a0fdf8ce',
    title: 'Falcon 9 Starlink v1.0 L22 set for liftoff from Cape Canaveral SLC-40rot',
    images: [
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/aplezoikqmqdd6ox82jz.jpg',
      filename: 'newsPics/aplezoikqmqdd6ox82jz'
        },
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/po7mo8xgsegbv6le0o4z.jpg',
      filename: 'newsPics/po7mo8xgsegbv6le0o4z'
        }
    ],
    description: 'The Starlink constellation is set to receive another 60 satellites this week. Falcon 9 B1060-6 is scheduled to launch on Falcon 9’s ninth flight of 2021 and fourth flight this month. Liftoff is targeted for 4:28 am EDT (08:28 UTC) on Wednesday March 24, the 15th anniversary of SpaceX’s first ever orbital launch attempt.',
    featured: false 

},
{
    author:'6064521974f9ef28a0fdf8ce',
    title: 'Bluestaq wins $280 million Space Force contract to expand space data catalog',
    images: [
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/aplezoikqmqdd6ox82jz.jpg',
      filename: 'newsPics/aplezoikqmqdd6ox82jz'
        },
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/po7mo8xgsegbv6le0o4z.jpg',
      filename: 'newsPics/po7mo8xgsegbv6le0o4z'
        }
    ],
    description: 'Bluestaq received a $280 million contract from the U.S. Space Force to expand the Unified Data Library of space objects.',
    featured: true 

},
{
    author:'6064521974f9ef28a0fdf8ce',
    title: 'Starlink and OneWeb satellites ready for launch on opposite sides of the world',
    images: [
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/aplezoikqmqdd6ox82jz.jpg',
      filename: 'newsPics/aplezoikqmqdd6ox82jz'
        },
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/po7mo8xgsegbv6le0o4z.jpg',
      filename: 'newsPics/po7mo8xgsegbv6le0o4z'
        }
    ],
    description: 'SpaceX and OneWeb — space industry rivals and owners of two of the largest fleets of commercial satellites — are set to add more spacecraft to their internet networks Wednesday with launches from Cape Canaveral and Russia.',
    featured: false 

},
{
    author:'6064521974f9ef28a0fdf8ce',
    title: 'Global Eagle Entertainment completes Chapter 11 restructuring',
    images: [
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/aplezoikqmqdd6ox82jz.jpg',
      filename: 'newsPics/aplezoikqmqdd6ox82jz'
        },
        {
            url: 'https://res.cloudinary.com/sifat1212/image/upload/v1617313033/newsPics/po7mo8xgsegbv6le0o4z.jpg',
      filename: 'newsPics/po7mo8xgsegbv6le0o4z'
        }
    ],
    description: 'Global Eagle Entertainment, a provider of media services and satellite Wi-Fi to aircraft, boats and remote locations, has exited Chapter 11 bankruptcy.',
    featured: false 

}]

Paper.insertMany(seedata).then(data => {
    console.log(data)
})
.catch(err =>{
    console.log(err)
})