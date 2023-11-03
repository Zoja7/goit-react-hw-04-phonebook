import css from './ContactItem.module.css';
export default function ContactItem({ contact, handleDeleteContact }) {
  return (
    <li className={css.contactItem}>
      <span className={css.contactName}>{contact.name}:</span>
      <span className={css.contactNumber}> {contact.number}</span>

      <button
        className={css.deleteButton}
        type="button"
        onClick={() => {
          handleDeleteContact(contact.id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
