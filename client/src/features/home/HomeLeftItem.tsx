interface Props {
  name: string;
  icon: string;
}

function HomeLeftItem({ item }: { item: Props }) {
  return (
    <div className="bg-tertiary-hover flex cursor-pointer flex-row items-center justify-start gap-2 rounded-lg p-2">
      <img
        src={`../../icons/${item.icon}.png`}
        alt="Profile picture"
        className="relative flex h-[30px] w-[30px] min-w-[30px] rounded-full"
      />
      <span className="text-base">{item.name}</span>
    </div>
  );
}

export default HomeLeftItem;
