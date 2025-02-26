export function handleChange<T>(
  event: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = event.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
}
