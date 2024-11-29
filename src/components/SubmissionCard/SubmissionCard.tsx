
import {Link} from 'react-router-dom';
import styles from './SubmissionCard.module.css'
interface SubmissionCardProp {
    name: string;
    date: string;
    id: string;
}

export default function SubmissionCard({name, date, id} : SubmissionCardProp) {
  return (
    <Link to={`/submission/${id}`} className={`${styles.cardLink}`}>
        <div className={`${styles.container}`}>
            <p>{name}</p>
            <p>{date}</p>
        </div>
    </Link>
  )
}
