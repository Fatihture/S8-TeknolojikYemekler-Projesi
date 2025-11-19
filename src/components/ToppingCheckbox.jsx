export default function ToppingCheckbox({ label, checked, onChange, dataTestId }) {
  return (
    <label className="topping-box">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={dataTestId}
      />
      <span className="topping-visual">{checked && "✔"}</span>
      <span className="topping-label">{label}</span>
    </label>
  );
}