import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItemById } from "./../../shared/api/itemsApi.ts";
import {getStoredItem} from "../../shared/lib/storage.ts";
import { motion } from "framer-motion";

interface Item {
    id: number;
    title: string;
    body: string;
}

const getImageUrl = (id: number) => `https://picsum.photos/seed/${id}/600/400`;

export const ItemDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const storedItem = getStoredItem(id);
            if (storedItem) {
                setItem(storedItem);
                setLoading(false);
            } else {
                fetchItemById(id).then((data) => {
                    setItem(data);
                    setLoading(false);
                });
            }
        }
    }, [id]);

    if (loading) return <p className="text-center text-xl">Загрузка...</p>;
    if (!item) return <p className="text-center text-xl">Элемент не найден</p>;

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img src={getImageUrl(Number(id))} alt={item.title} className="w-full h-60 object-cover rounded-lg" />

            <h1 className="text-3xl font-bold mt-4">{item.title}</h1>
            <p className="text-gray-600 mt-2">{item.body}</p>

            <div className="mt-6 flex justify-between">
                <Link
                    to={`/edit/${id}`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                >
                    ✏️ Редактировать
                </Link>
                <Link
                    to="/"
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                >
                    🔙 Назад
                </Link>
            </div>
        </motion.div>
    );
};
