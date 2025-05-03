import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ page = 0, pageCount, handlePageClick }) {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      forcePage={page}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount} // Ensure pageCount is defined
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick} // Ensure handlePageClick is defined
      containerClassName={"flex justify-center mt-8 space-x-2"}
      pageClassName={"rounded-md bg-white shadow-sm"} // Removed padding here
      pageLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding to the link
      activeClassName={"bg-blue-500"}
      activeLinkClassName={"text-blue-500 font-bold"} // Active state applies to link
      previousClassName={"rounded-md bg-white shadow-sm"}
      nextClassName={"rounded-md bg-white shadow-sm"}
      previousLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding here
      nextLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding here
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  );
}
