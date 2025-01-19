const ButtonMenu = ({ children, icon }) => {
  const handClick = () => {};

  return (
    <li>
      <button onClick={handClick} className="button-menu">
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};

export default ButtonMenu;
