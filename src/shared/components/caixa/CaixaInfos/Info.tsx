interface InfoProps {
  label: string;
  value: string | undefined | number;
  Dinheiro?: boolean;
}

export default function Info({ Dinheiro = false, label, value }: InfoProps) {
  return (
    <div className="flex text-xs">
      <h1>
        <span className="font-bold">{label}:</span> {Dinheiro && 'R$'} {value}
      </h1>
    </div>
  );
}
