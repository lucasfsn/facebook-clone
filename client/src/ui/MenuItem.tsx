interface Props {
  name: string;
  description: string;
  icon: string;
}

function MenuItem({ item }: { item: Props }) {
  return (
    <li className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-2 hover:bg-gray-100">
      <img
        src={`../../icons-menu/${item.icon}.png`}
        alt={item.name}
        className="h-8 w-8"
      />
      <div className="self-start">
        <h3 className="text-base">{item.name}</h3>
        <p className="text-sm leading-4 text-gray-500">{item.description}</p>
      </div>
    </li>
  );
}

export default MenuItem;
