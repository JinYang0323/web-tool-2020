import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { performGetExpenses, performAddExpenses } from "../services";
import { errorMessages } from "../errorMessages";
import CategoryTag from "../components/CategoryTag";
import { categories } from "../constants";

const ExpensePage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState({});
    const [addNewExpense, setAddNewExpense] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [date, setDate] = useState("");
    const [cost, setCost] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        setIsLoading(true);
        performGetExpenses()
            .then((response) => {
                setExpenses(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const onInput = (e, type) => {
        if (type === "date") {
            setDate(e.target.value);
        } else if (type === "cost") {
            setCost(e.target.value);
        } else if (type === "category") {
            setCategory(e.target.value);
        } else {
            setNotes(e.target.value);
        }
        setStatus("");
    };

    const onAddNewExpense = () => {
        if (!addNewExpense) setAddNewExpense(true);
        else if (!date || !cost || !category) {
            setStatus(errorMessages["field-required"]);
        } else {
            setIsPending(true);
            performAddExpenses({ date, cost, category, notes })
                .then((response) => {
                    setExpenses(response);
                    setAddNewExpense(false);
                    setDate("");
                    setCost("");
                    setCategory("");
                    setNotes("");
                    setStatus("");
                })
                .catch((err) => {
                    setStatus(err);
                })
                .finally(() => setIsPending(false));
        }
    };

    if (isLoading) return <Loader />;
    return (
        <div className="expense-page">
            <button onClick={onAddNewExpense}>+ add new expense</button>
            <div>
                <ul className="expense-list">
                    {Object.keys(expenses).map((expenseOnDate) => (
                        <li key={expenseOnDate}>
                            {expenseOnDate}
                            <ul>
                                {Object.keys(expenses[expenseOnDate]).map(
                                    (expenseId) => (
                                        <li
                                            className="expense-item"
                                            key={expenseId}
                                        >
                                            <div className="expense-item-group">
                                                <CategoryTag
                                                    text={
                                                        expenses[expenseOnDate][
                                                            expenseId
                                                        ].category
                                                    }
                                                />

                                                <span className="expense-item-note">
                                                    {
                                                        expenses[expenseOnDate][
                                                            expenseId
                                                        ].notes
                                                    }
                                                </span>
                                            </div>
                                            <div className="expense-item-cost">
                                                {
                                                    expenses[expenseOnDate][
                                                        expenseId
                                                    ].cost
                                                }
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            {addNewExpense ? (
                <div className="expense-add-item">
                    <div className="expense-item-prompt">
                        Note: fields with * is required
                    </div>
                    <div>
                        <span className="expense-item-label">*Date:</span>
                        <input
                            type="date"
                            disabled={isPending}
                            onChange={(e) => onInput(e, "date")}
                            value={date}
                        />
                    </div>
                    <div>
                        <span className="expense-item-label">*Cost:</span>
                        <input
                            type="number"
                            min="0"
                            disabled={isPending}
                            onChange={(e) => onInput(e, "cost")}
                            value={cost}
                        />
                    </div>
                    <div>
                        <span className="expense-item-label">*Category:</span>

                        <select
                            id="category"
                            name="category"
                            onChange={(e) => onInput(e, "category")}
                            value={category}
                            disabled={isPending}
                        >
                            <option>...</option>
                            {Object.keys(categories).map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span className="expense-item-label">Notes:</span>
                        <input
                            disabled={isPending}
                            onChange={(e) => onInput(e, "notes")}
                            value={notes}
                        />
                    </div>
                    {status && <div className="error-panel">{status}</div>}
                </div>
            ) : null}
        </div>
    );
};

export default ExpensePage;
