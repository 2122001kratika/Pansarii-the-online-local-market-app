import bcrypt from 'bcryptjs';

const data ={
    users: [
            {
                name: 'Kratika',
                email:'admin@example.com',
                password: bcrypt.hashSync('1234', 8),
                isAdmin: true,
            },
            {
                name: 'John',
                email:'user@example.com',
                password: bcrypt.hashSync('1234', 8),
                isAdmin: false,
            }
           ],
    products:[
        {
          name: 'Designer cotton kurti',
          category: 'girls wear',
          image: '/Images/p1.jpg',
          price: 2900,
          countInStock: 10,
          brand: 'Biba',
          rating: 4.5,
          numReviews: 10,
          description: "Printed designer kurti and pant",
         },
         {
          name: 'Printed cotton kurti',
          category: 'girls wear',
          image: '/Images/p2.jpg',
          price: 1100,
          countInStock: 20,
          brand: 'Libas',
          rating: 4,
          numReviews: 10,
          description: "Designer kurti with leggings",
         },
         {
          name: 'Party wear cotton suit',
          category: 'girls wear',
          image: '/Images/p3.jpg',
          price: 2500,
          countInStock: 1,
          brand: 'Rangmanch',
          rating: 5,
          numReviews: 10,
          description: "Printed and embroided yellow suit",
         },
         {
          name: 'Designer kurti and plazo',
          category: 'girls wear',
          image: '/Images/p4.jpg',
          price: 1250,
          countInStock: 0,
          brand: 'Libas',
          rating: 4.9,
          numReviews: 10,
          description: "Grey checks kurti with plazo",
         },
         {
          name: 'Designer brown kurti',
          category: 'girls wear',
          image: '/Images/p5.jpg',
          price: 900,
          countInStock: 5,
          brand: 'Biba',
          rating: 3.5,
          numReviews: 10,
          description: "Designer kurti with plazo",
         },
         {
          name: 'Printed long kurti',
          category: 'girls wear',
          image: '/Images/p6.jpg',
          price: 2500,
          countInStock: 2,
          brand: 'FabIndia',
          rating: 4.5,
          numReviews: 10,
          description: "Party wear long printed fashionble kurti",
         }
    ]
}
export default data;