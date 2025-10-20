export const mockRecipes = [
  {
    id: '1',
    title: 'Vegetable Stir Fry',
    image: 'https://via.placeholder.com/300x200/FF6B6B/white?text=Vegetable+Stir+Fry',
    ingredients: [
      '2 cups mixed vegetables',
      '1 tbsp olive oil',
      '2 cloves garlic',
      '1 tbsp soy sauce',
      '1 tsp ginger'
    ],
    steps: [
      'Chop all vegetables',
      'Heat oil in pan',
      'Add garlic and ginger',
      'Stir fry vegetables for 5-7 minutes',
      'Add soy sauce and serve hot'
    ],
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'Asian',
    tags: ['vegetarian', 'quick', 'healthy'],
    privacy: 'public',
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Classic Pancakes',
    image: 'https://via.placeholder.com/300x200/4ECDC4/white?text=Classic+Pancakes',
    ingredients: [
      '1 cup all-purpose flour',
      '1 cup milk',
      '1 large egg',
      '2 tbsp sugar',
      '1 tsp baking powder',
      '1/2 tsp salt'
    ],
    steps: [
      'Mix dry ingredients in a bowl',
      'In another bowl, whisk egg and milk',
      'Combine wet and dry ingredients',
      'Heat griddle over medium heat',
      'Pour batter and cook until bubbles form',
      'Flip and cook until golden brown'
    ],
    cookTime: 20,
    difficulty: 'Easy',
    cuisine: 'American',
    tags: ['breakfast', 'sweet', 'family'],
    privacy: 'public',
    userId: 'user1'
  },
  {
    id: '3',
    title: 'Chicken Curry',
    image: 'https://via.placeholder.com/300x200/45B7D1/white?text=Chicken+Curry',
    ingredients: [
      '500g chicken breast',
      '1 large onion',
      '2 tomatoes',
      '2 tbsp curry powder',
      '1 cup coconut milk',
      '2 tbsp oil'
    ],
    steps: [
      'Cut chicken into cubes',
      'Chop onions and tomatoes',
      'Heat oil and sauté onions',
      'Add chicken and cook until browned',
      'Add tomatoes and curry powder',
      'Pour coconut milk and simmer for 20 minutes'
    ],
    cookTime: 45,
    difficulty: 'Medium',
    cuisine: 'Indian',
    tags: ['spicy', 'dinner', 'comfort'],
    privacy: 'public',
    userId: 'user2'
  },
  
  {
    id: '4',
    title: 'Spaghetti Bolognese',
    image: 'https://via.placeholder.com/300x200/F7B267/white?text=Spaghetti+Bolognese',
    ingredients: [
      '250g spaghetti',
      '200g ground beef',
      '1 onion, chopped',
      '2 cups tomato sauce',
      '2 cloves garlic',
      '1 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    steps: [
      'Boil spaghetti according to package instructions',
      'Sauté onion and garlic in oil',
      'Add ground beef and cook until browned',
      'Pour in tomato sauce and simmer for 10 minutes',
      'Season with salt and pepper',
      'Serve sauce over spaghetti'
    ],
    cookTime: 30,
    difficulty: 'Medium',
    cuisine: 'Italian',
    tags: ['dinner', 'comfort', 'family'],
    privacy: 'public',
    userId: 'user1'
  },
  {
    id: '5',
    title: 'Avocado Toast',
    image: 'https://via.placeholder.com/300x200/9B5DE5/white?text=Avocado+Toast',
    ingredients: [
      '2 slices of whole grain bread',
      '1 ripe avocado',
      '1 tsp lemon juice',
      'Salt and pepper to taste',
      'Chili flakes (optional)'
    ],
    steps: [
      'Toast the bread slices',
      'Mash avocado with lemon juice, salt, and pepper',
      'Spread avocado on toast',
      'Sprinkle chili flakes if desired'
    ],
    cookTime: 10,
    difficulty: 'Easy',
    cuisine: 'American',
    tags: ['breakfast', 'healthy', 'quick'],
    privacy: 'public',
    userId: 'user2'
  },
  {
    id: '6',
    title: 'Beef Tacos',
    image: 'https://via.placeholder.com/300x200/FF9770/white?text=Beef+Tacos',
    ingredients: [
      '200g ground beef',
      '4 taco shells',
      '1 cup shredded lettuce',
      '1/2 cup shredded cheese',
      '1 tomato, diced',
      '2 tbsp taco seasoning',
      '2 tbsp oil'
    ],
    steps: [
      'Cook beef in oil until browned',
      'Add taco seasoning and stir',
      'Fill taco shells with beef, lettuce, tomato, and cheese'
    ],
    cookTime: 25,
    difficulty: 'Easy',
    cuisine: 'Mexican',
    tags: ['snack', 'quick', 'party'],
    privacy: 'public',
    userId: 'user1'
  }
];



export const mockUsers = {
  'user1': {
    id: 'user1',
    name: 'Robby Jay Ibale',
    email: 'ibalerobbyjay@email.com',
    favorites: ['1', '2']
  },
  'user2': {
    id: 'user2',
    name: 'Rabiji',
    email: 'rabiji@gmail.com',
    favorites: ['3']
  }
};
