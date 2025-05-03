import React, { useEffect } from 'react';
import { notifyError, notifySuccess } from '../../../components/toastNotify';
import { addQuantityForProduct, getAllColorsOfProduct, updateQuantityForProduct } from "../../../services/ProductService";
import NewColorProduct from './NewColorProduct';
import RowTablePsc from './RowTablePsc';
import { FaSpinner } from 'react-icons/fa';
export default function BackdropProductSizeColor({ open, setOpen, size, price = 333 }) {
  const [newColor, setNewColor] = React.useState(false);
  const [pscs, setPscs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
    setNewColor(false);
  };
  
  const handleUpdateQuantity = async (id, quantity) => {
    try {
       const res =  await updateQuantityForProduct({pscId: id, quantity})
       notifySuccess(res.message)
    } catch (error) {
      notifyError("error occured")
    }
    setPscs(prevPscs =>
      prevPscs.map(psc =>
        psc.id === id ? { ...psc, totalQuantity: quantity } : psc
      )
    );

    notifySuccess('Quantity updated successfully');
  };
  
  const handleAddNewColor = async (color, quantity) => {
    console.log(size, color)
      try {
        console.log({idProductSize: size.id,idColor: color.id, quantity})
       await addQuantityForProduct({idProductSize: size.id,idColor: color.id, quantity})
     } catch (error) {
      console.log(error)
       notifyError("error occured")
     }

      const newPsc = {
        id: Date.now(), // Using a timestamp as a temporary unique ID
        name: color.name,
        color: color.code,
        totalQuantity: quantity,
        totalSales: 0
      };
  
      setPscs(prev => [...prev, newPsc]);
      notifySuccess('New color added successfully');
      setNewColor(false);
  };
  
  React.useEffect(() => {
    const fetchColors = async () => {
      if (!size?.id) return;
  
      setLoading(true);
      try {
        const res = await getAllColorsOfProduct(size.id);
        setPscs(res.result || []);
      } catch (error) {
        notifyError(error?.response?.data?.message || 'Failed to load colors');
      } finally {
        setLoading(false);
      }
    };
  
    fetchColors();
  }, [size?.id]);
    return (
        <>
        {open && (
            <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handleClose}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-5 rounded-md max-w-5xl w-full mx-4 shadow-lg"
              >
                {newColor ? (
                  <NewColorProduct
                    size={size}
                    handleAddnewColor={handleAddNewColor}
                    setNewColor={setNewColor}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4 text-black">
                      <h1 className="font-bold text-[22px]">
                        Colors of size {size?.name}
                      </h1>
                      <button
                        onClick={() => setNewColor(true)}
                        className="font-bold border-2 px-2 border-black hover:bg-black hover:text-white transition"
                      >
                        Add color
                      </button>
                    </div>
          
                    <div className="overflow-x-auto mb-3 rounded-md shadow-md border border-gray-200">
                      <table className="min-w-full text-sm text-center">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="px-2 py-2">Name</th>
                            <th className="px-2 py-2">Color</th>
                            <th className="px-2 py-2">Stock Left</th>
                            <th className="px-2 py-2">Total sales</th>
                            <th className="px-2 py-2">Total revenue</th>
                            <th className="px-2 py-2">Action</th>
                          </tr>
                        </thead>
          
                        {pscs ? (
                          pscs.length === 0 ? (
                            <tbody>
                              <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                  No colors for product
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {pscs.map((psc) => (
                                <RowTablePsc
                                  key={psc.id}
                                  psc={psc}
                                  price={price}
                                  handleUpdateQuantity={handleUpdateQuantity}
                                />
                              ))}
                            </tbody>
                          )
                        ) : (
                          <tbody>
                            <tr>
                              <td colSpan="6" className="h-[200px] text-center">
                                <span className="inline-block">
      <FaSpinner className="animate-spin h-20 w-20 mr-3" />

                                </span>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
            </>
    )
}
