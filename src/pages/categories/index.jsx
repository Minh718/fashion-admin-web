import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { menuItemsEnum } from "../../constants";

import CategoryTable from "./components/CategoryTable";
import ColorTable from "./components/ColorTable";
// import ColorTable from "./components/ColorTable";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Categories & Colors",
    url: "/categories",
  },
];
const Categories = () => {
  const { setActiveItem } = useOutletContext();

  useEffect(() => {
    setActiveItem(menuItemsEnum.CATEGORIES);
  }, []);

  return (
    <div>
      <Breadcrumbs links={links} />
      <div className="flex gap-7">
        <CategoryTable />
        <ColorTable />
      </div>
    </div>
  );
};

export default Categories;
