// Import your images here
import boncukProfile from '../assets/images/stories/cat_2.jpg';
import boncukStory1 from '../assets/images/stories/cat_1.jpg';

import pasaProfile from '../assets/images/stories/dog_1_2.png';
import pasaStory1 from '../assets/images/stories/dog_2.jpg';

export const storyData = [
  {
    id: 1,
    name: "Boncuk",
    profilePicture: boncukProfile,
    stories: [
      { 
        id: 1, 
        url: boncukStory1, 
        duration: 5000, 
        altText: "Boncuk the beagle sleeping on a sunny rug" 
      },
    ],
  },
  {
    id: 2,
    name: "Paşa",
    profilePicture: pasaProfile,
    stories: [
      { 
        id: 1, 
        url: pasaStory1, 
        duration: 5000,
        altText: "Paşa the cat sitting in a cardboard box"
      },
    ],
  },
];