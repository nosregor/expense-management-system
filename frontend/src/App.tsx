import { useEffect, useState } from "react";
import "./App.css";
import ConfirmationModal from "./components/ConfirmationModal";
import ExpenseList from "./components/ExpenseList";
import NotificationToast from "./components/NotificationToast";

import FormModal from "./components/FormModal";
import { IExpense, Toast, ToastType } from "./types";

import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "./services/expenseService";

const App = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [toast, setToast] = useState<Toast>({
    message: "",
    type: ToastType.SUCCESS,
    show: false,
  });

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const handleSubmit = async (formData: IExpense) => {
    try {
      if (selectedExpense) {
        // Update existing expense
        const updatedExpense = await updateExpense(
          selectedExpense._id,
          formData
        );
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === updatedExpense._id ? updatedExpense : expense
          )
        );
        setToast({
          message: "Expense updated successfully",
          type: ToastType.SUCCESS,
          show: true,
        });
      } else {
        // Add new expense
        const newExpense = await createExpense(formData);
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setToast({
          message: "Expense created successfully",
          type: ToastType.SUCCESS,
          show: true,
        });
      }

      setModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error handling form submission:", error);
      setToast({
        message: "Failed to save expense",
        type: ToastType.FAIL,
        show: true,
      });
    }
  };

  const handleDelete = async (expense: IExpense) => {
    try {
      await deleteExpense(expense._id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp._id !== expense._id)
      );
      setConfirmationModalOpen(false);
      setToast({
        message: "Expense deleted successfully",
        type: ToastType.SUCCESS,
        show: true,
      });
    } catch (error) {
      console.error("Error handling expense deletion:", error);
      setToast({
        message: "Failed to delete expense",
        type: ToastType.FAIL,
        show: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {expenses.length === 0 ? (
        <p>Fetching expenses...</p>
      ) : (
        <>
          <ExpenseList
            expenses={expenses}
            openModal={() => setModalOpen(true)}
            openConfirmationModal={() => setConfirmationModalOpen(true)}
            setSelectedExpense={setSelectedExpense}
          />

          {isModalOpen && (
            <FormModal
              isOpen={isModalOpen}
              onClose={() => {
                setModalOpen(false);
                setSelectedExpense(null); // Reset
              }}
              onSubmit={handleSubmit}
              initialData={selectedExpense}
            />
          )}

          {isConfirmationModalOpen && selectedExpense && (
            <ConfirmationModal
              isOpen={isConfirmationModalOpen}
              onClose={() => {
                setConfirmationModalOpen(false);
                setSelectedExpense(null); // Reset
              }}
              onConfirm={() => handleDelete(selectedExpense)}
              selectedExpense={selectedExpense}
            />
          )}

          {toast.show && (
            <NotificationToast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
          )}
        </>
      )}
    </>
  );
};

export default App;
