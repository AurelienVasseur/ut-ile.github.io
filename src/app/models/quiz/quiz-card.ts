import { Category } from '../category';
import { Timestamp } from '@firebase/firestore-types'
export class QuizCard extends Category {
    slug: string;
    name: string;
    description: string;
    author: string;
    badges: Array<string>;
    created_on: Timestamp;
    expires_on: Timestamp;
    image_path: string;
    quiz_form: Object;
}