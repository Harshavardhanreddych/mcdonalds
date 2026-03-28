import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Big Mac',
    description: 'Mouthwatering perfection starts with two 100% pure beef patties and Big Mac sauce sandwiched between a sesame seed bun.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'Burgers',
    calories: 590,
  },
  {
    id: '2',
    name: 'Quarter Pounder with Cheese',
    description: 'Each Quarter Pounder with Cheese burger features a ¼ lb. of 100% fresh beef that’s hot, deliciously juicy and cooked when you order.',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    category: 'Burgers',
    calories: 520,
  },
  {
    id: '3',
    name: 'World Famous Fries',
    description: 'Our World Famous Fries are made with premium potatoes such as the Russet Burbank and the Shepody.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    category: 'Sides',
    calories: 320,
  },
  {
    id: '4',
    name: '10 piece Chicken McNuggets',
    description: 'Our tender, juicy Chicken McNuggets are made with 100% white meat chicken and no artificial colors, flavors or preservatives.',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=800',
    category: 'Chicken',
    calories: 410,
  },
  {
    id: '5',
    name: 'Coca-Cola',
    description: 'Enjoy a cold, refreshing Coca-Cola with your meal.',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    category: 'Beverages',
    calories: 210,
  },
  {
    id: '6',
    name: 'McFlurry with OREO Cookies',
    description: 'The McDonald’s McFlurry with OREO Cookies is a popular combination of OREO pieces and vanilla soft serve!',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    category: 'Desserts',
    calories: 510,
  }
];

export const categories = ['All', 'Burgers', 'Chicken', 'Sides', 'Beverages', 'Desserts'];
