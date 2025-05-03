import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import {
  addSize,
  addSubCategory,
  getDetailCategory,
} from "../../services/CategoryService";
import { useOutletContext, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { menuItemsEnum } from "../../constants";
import TableSize from "./components/TableSize";
import TableSubCategory from "./components/TableSubCategory";

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Categories",
    url: "/categories",
  },
  {
    name: "Detail Category",
    url: "/#",
  },
];

const CategoryDetail = () => {
  const { setActiveItem } = useOutletContext();

  const [category, setCategory] = useState(null);
  const [sizes, setSizes] = useState([
    { id: 1, name: "Small" },
    { id: 2, name: "Medium" },
  ]);

  const [subcategories, setSubcategories] = useState([
    {
      id: 1,
      name: "T-Shirts",
      thumb: "https://via.placeholder.com/100",
    },
  ]);

  const [newSize, setNewSize] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  const handleAddSize = async () => {
    try {
      const res = await addSize({
        idCategory: category.id,
        name: newSize,
      });
      notifySuccess(res.message);

      setSizes([...sizes, { id: res.result.id, name: newSize }]);
      setNewSize("");
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };
  const handleDeleteSize = (id) => {
    setSizes(sizes.filter((size) => size.id !== id));
  };
  const handleDeleteSubCategory = (id) => {
    setSubcategories(
      subcategories.filter((subCategory) => subCategory.id !== id)
    );
  };
  useEffect(() => {
    setActiveItem(menuItemsEnum.CATEGORIES);
  }, []);
  const handleAddSubcategory = async () => {
    try {
      const res = await addSubCategory({
        idCategory: category.id,
        name: newSubcategoryName,
      });
      notifySuccess(res.message);

      setSubcategories([
        ...subcategories,
        { id: res.result.id, name: newSubcategoryName },
      ]);
      setNewSubcategoryName("");
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };

  useEffect(() => {
    // Simulating API call to fetch vouchers
    setIsLoading(true);
    const fetchDetailCategory = async () => {
      try {
        const res = await getDetailCategory(id);
        setSizes(res.sizes);
        setSubcategories(res.subCategories);
        setIsLoading(false);
        setCategory({ id: res.id, name: res.name });
      } catch (error) {
        console.log(error);
        notifyError("Error occur");
      }
    };
    fetchDetailCategory();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <Breadcrumbs links={links} />
        <h1 className="text-3xl font-bold mb-6">
          Category Detail: "<span className="italic">{category.name}</span>"
        </h1>

        {/* Sizes Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sizes</h2>
          <TableSize
            sizes={sizes}
            handleDeleteSize={handleDeleteSize}
            setSizes={setSizes}
          />
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="New size name"
              className="border px-4 rounded w-full"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
            <button
              onClick={handleAddSize}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Size
            </button>
          </div>
        </div>

        {/* Subcategories Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2 ">Subcategories</h2>
          <TableSubCategory
            subCategories={subcategories}
            setSubCategorys={setSubcategories}
            handleDeleteSubCategory={handleDeleteSubCategory}
          />
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Subcategory name"
              className="border p-2 rounded"
              value={newSubcategoryName}
              onChange={(e) => setNewSubcategoryName(e.target.value)}
            />
            <button
              onClick={handleAddSubcategory}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Subcategory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
