import { Book } from './../types/book';

export const books: Book[] = [
    {
        id: 1,
        title: 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change',
        description: 'The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',
        link: 'https://www.amazon.fr/Habits-Highly-Effective-People-Powerful/dp/0743269519',
        localLink: './books/the_seven_habits_of_highly_effective_people.pdf',
        picture: 'https://m.media-amazon.com/images/I/51hV5vGr4AL._SY291_BO1,204,203,200_QL40_ML2_.jpg',
        author: 'Stephen R. Covey'
    },
    {
        id: 2,
        title: 'A Mind For Numbers: How to Excel at Math and Science (Even If You Flunked Algebra)',
        description: 'Whether you are a student struggling to fulfill a math or science requirement, or you are embarking on a career change that requires a higher level of math competency, A Mind for Numbers offers the tools you need to get a better grasp of that intimidating but inescapable field.',
        link: 'https://www.amazon.com/Mind-Numbers-Science-Flunked-Algebra-ebook/dp/B00G3L19ZU',
        localLink: './books/a_mind_for_numbers.pdf',
        picture: 'https://m.media-amazon.com/images/I/41jOvUQ+dhL.jpg',
        author: 'Barbara Oakley'
    }
];
