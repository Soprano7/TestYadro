import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItemById } from "./../../shared/api/itemsApi";
import { getStoredItem, saveItem } from "../../shared/lib/storage";
import { motion } from "framer-motion";

export const ItemEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const storedItem = getStoredItem(id);
            if (storedItem) {
                setTitle(storedItem.title);
                setBody(storedItem.body);
                setLoading(false);
            } else {
                fetchItemById(id).then((data) => {
                    setTitle(data.title);
                    setBody(data.body);
                    setLoading(false);
                });
            }
        }
    }, [id]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            alert("Все поля должны быть заполнены!");
            return;
        }
        saveItem(id!, { title, body });
        navigate(`/item/${id}`);
    };

    if (loading) return <p className="text-center text-xl">Загрузка...</p>;

    return (
        <motion.div
            className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-center mb-6">Редактирование элемента {id}</h1>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Название</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Описание</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Введите описание"
                        required
                        className="w-full p-3 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
                >
                    💾 Сохранить
                </button>
            </form>
            <button
                onClick={() => navigate(-1)}
                className="mt-4 w-full p-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
            >
                ❌ Отмена
            </button>
        </motion.div>
    );
};
