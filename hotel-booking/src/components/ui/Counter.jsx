import useCountUp from '../../hooks/useCountUp';

export default function Counter({ value, suffix = '', decimals = 0, className = '' }) {
  const [ref, display] = useCountUp(value, { decimals });
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
