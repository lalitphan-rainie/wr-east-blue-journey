import hinge1 from '../assets/hinge/coco_latte.jpg';
import hinge2 from '../assets/hinge/afl_oval.jpg';
import hinge3 from '../assets/hinge/one_piece_symphony.jpg';
import hinge4 from '../assets/hinge/lemon_dress_yatch.jpg';
import footbridge from '../assets/hinge/footbridge.jpg';

export const fooshaQuiz = [
  {
    question: "Which photo is the photo you liked on Hinge?",
    isImageQuiz: true,
    options: [hinge1, hinge2, hinge3, hinge4],
    correct: 0 // Index of the correct answer
  },
  {
    question: "What is the date that we first met?",
    options: ["March 21", "March 22", "March 23", "March 24"],
    correct: 2
  },
  {
    question: "Where is this place? (Look at the photo)",
    image: footbridge,
    options: ["Botanical Garden", "Torrens River", "Hahndorf", "University Footbridge"],
    correct: 3
  },
  {
    question: "Which movie is the first one that we watched together?",
    options: ["The Devil wears Prada 2", "Hoppers", "Project Hail Mary", "Super Mario: Galaxy the Movie"],
    correct: 2
  },
  {
    question: "What is my absolute favorite dessert?",
    options: ["Cake", "Ice Cream", "Tiramisu", "Chocolate"],
    correct: 1
  }
];