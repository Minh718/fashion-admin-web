import React, { useEffect, useState } from "react";
import { FaFilter, FaPlus, FaSort, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { menuItemsEnum } from "../../constants";
import {
  activeSlide,
  deleteSlide,
  getAllSlides,
  unactiveSlide,
} from "../../services/SlideService";
import { getUrlImage } from "../../utils/urlImage";
import AddSlide from "./components/AddSlide";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Slides",
    url: "/slides",
  },
];
const Slides = () => {
  const { setActiveItem } = useOutletContext();
  const [size, setSize] = useState(10);
  const [slides, setSlides] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectedSlideId, setSelectedSlideId] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const handleAddSlide = (slide) => {
    setSlides([slide, ...slides]);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleDeleteSlide = async (id) => {
    try {
      await deleteSlide(id);
      notifySuccess("Delete slide successfully");
      setSlides(slides.filter((slide) => slide.id !== id));
    } catch (err) {
      notifyError("error occur");
    }
  };
  const handleStatusSlide = async (slide) => {
    const action = slide.status ? unactiveSlide : activeSlide;
    try {
      const res = await action(slide.id);
      notifySuccess(res.message);
    } catch (error) {}

    setSlides((prev) =>
      prev.map((item) =>
        item.id === slide.id ? { ...item, status: !item.status } : item
      )
    );
  };
  useEffect(() => {
    // Simulating API call to fetch slides
    setIsLoading(true);
    const fetchSlides = async () => {
      let res;
      try {
        res = await getAllSlides({
          page: currentPage,
          size,
        });
        setSlides(res.result);
        setMetadata(res.metadata);
        setIsLoading(false);
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchSlides();
  }, [currentPage, size]);

  useEffect(() => {
    setActiveItem(menuItemsEnum.SLIDESHOW);
  }, []);
  if (isLoading) return <Loading />;

  return (
    <div>
      <Breadcrumbs links={links} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Slides Admin</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Slide
        </button>
      </div>
      {showForm && (
        <AddSlide
          handleCloseForm={handleCloseForm}
          handleAddSlide={handleAddSlide}
        />
      )}
      <div className="mb-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter slides..."
            className="border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <FaFilter className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="text-gray-600">
          <FaSort className="inline mr-2" />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left cursor-pointer">id</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left cursor-pointer">Image</th>
              <th className="py-3 px-6 text-left cursor-pointer">Status</th>
              <th className="py-3 px-6 text-left cursor-pointer">
                Description
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {slides.map((slide) => (
              <tr
                key={slide.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{slide.id}</div>
                </td>
                <td className="py-3 px-6 text-left">{slide.title}</td>
                <td className="py-3 px-6 text-left">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={getUrlImage(slide.image) || "/public/avatar.jpg"}
                    alt={slide.picture}
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={slide.status}
                      onChange={(e) => handleStatusSlide(slide)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-3 px-6 text-left">{slide.description}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    onClick={() => {
                      setIsDelete(true);
                      setSelectedSlideId(slide.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        onConfirm={() => {
          handleDeleteSlide(selectedSlideId);
          setIsDelete(false);
        }}
        itemName="slide"
      />
      <div className="flex justify-between">
        <div className="text-gray-600 mt-4">
          <span>Rows per page:</span>
          <select
            onChange={(e) => {
              setSize(+e.target.value);
              setCurrentPage(0);
            }}
            className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={size}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
        <Pagination
          pageCount={metadata?.totalPages ?? 6}
          handlePageClick={({ selected }) => setCurrentPage(selected)}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default Slides;
