export default function ToppingCheckbox({ label, checked, onChange }) {
  return (
    <label className="topping-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
