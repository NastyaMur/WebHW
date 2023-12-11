const FormInput = ({
  name,
  value,
  onChange,
  type,
  placeholder,
  label,
  textarea,
}) => {
  return (
    <div className="form__control">
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea
          className="form__input"
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="form__input"
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormInput;
