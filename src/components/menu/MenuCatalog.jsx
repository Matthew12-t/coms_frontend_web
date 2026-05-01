const MenuCatalog = ({ menus }) => {
  if (!menus.length) {
    return <p className="text-xs text-slate-500">No menu available right now.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {menus.map((menu) => (
        <li
          key={menu.id}
          className="flex gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100"
        >
          {menu.image_url && (
            <img
              src={menu.image_url}
              alt={menu.name}
              className="h-16 w-16 rounded-xl object-cover"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">{menu.name}</p>
            <p className="text-xs text-slate-500">{menu.description}</p>
            <p className="mt-1 text-xs font-bold text-slate-900">
              Rp {Number(menu.price).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MenuCatalog;
