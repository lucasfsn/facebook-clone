import { menu, menuRight } from "../../data/menu";
import HeaderSearchInput from "./HeaderSearchInput";
import MenuItem from "./MenuItem";

function MenuModal() {
  return (
    <div className="absolute right-[15px] top-[50px] z-50 flex max-h-[90vh] flex-col gap-3 rounded-lg bg-gray-100 p-3 shadow-md">
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="flex flex-row gap-3 overflow-y-scroll">
        <div className="flex max-w-md flex-col gap-3 overflow-y-scroll rounded-lg bg-white px-4 py-3 shadow-sm">
          <HeaderSearchInput placeholder="Search menu" full={true} />
          {menu.map(({ title, items }, i) => (
            <ul
              key={title}
              className={`flex flex-col pb-3 ${
                i === menu.length - 1 ? "" : "border-b"
              }`}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              {items.map((item) => (
                <MenuItem item={item} key={item.name} />
              ))}
            </ul>
          ))}
        </div>
        <div className="overflow-y-scroll rounded-lg bg-white px-4 py-3 shadow-sm">
          <h2 className="text-xl font-bold">Create</h2>
          <div>
            {menuRight.map(({ id, items }, i) => (
              <ul
                key={id}
                className={`flex flex-col py-3 text-base ${
                  i === menuRight.length - 1 ? "" : "border-b-2 border-gray-300"
                }`}
              >
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-lg p-2 hover:bg-gray-50"
                  >
                    <div className="flex h-[35px] w-[35px] min-w-[35px] items-center justify-center rounded-full bg-gray-200 text-lg text-stone-600">
                      {item.icon}
                    </div>
                    {item.name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
