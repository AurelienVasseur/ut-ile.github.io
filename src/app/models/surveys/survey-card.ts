import { Category } from '../category';
import { Timestamp } from '@firebase/firestore-types'
import { Badge } from '../badge';
export class SurveyCard extends Category {
    author: string;
    created_on: Timestamp;
    expires_on: Timestamp;
    survey_form: string | Object;
    badges: Array<string | Badge>;
}