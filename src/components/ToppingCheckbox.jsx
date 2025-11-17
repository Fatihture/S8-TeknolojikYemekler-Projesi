export default function ToppingCheckbox({ label, checked, onChange }) {
  return (
    <label className="topping-box">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="topping-visual">{checked && "✔"}</span>
      <span className="topping-label">{label}</span>
    </label>
  );
}
