import { menu } from "../../data/menu";
import { useOutsideClick } from "../hooks/useOutsideClick";
import HeaderSearchInput from "./HeaderSearchInput";
import MenuItem from "./MenuItem";

interface Props {
  setShowMenu: (arg: boolean) => void;
}

function Menu({ setShowMenu }: Props) {
  const close = () => {
    setShowMenu(false);
  };

  const { ref } = useOutsideClick(close);

  return (
    <div
      ref={ref}
      className="absolute top-[50px] z-50 flex max-h-[90vh] flex-col gap-3 overflow-y-scroll rounded-lg bg-gray-100 p-3 shadow-md"
    >
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-3 overflow-y-scroll rounded-lg bg-white px-4 py-3 shadow-sm">
          <HeaderSearchInput placeholder="Search menu" full={true} />
          {menu.map(({ title, items }, i) => (
            <ul
              key={title}
              className={`flex w-80 flex-col pb-3 ${
                i === menu.length - 1 ? "" : "border-b-2"
              }`}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              {items.map((item) => (
                <MenuItem item={item} key={item.name} />
              ))}
            </ul>
          ))}
        </div>
        <div className="w-40 rounded-lg bg-white px-4 py-3 shadow-sm">
          <h2 className="text-xl font-bold">Create</h2>
          <div>Sidebar</div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
